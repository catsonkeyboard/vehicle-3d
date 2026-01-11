import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore } from '@/stores/gameStore'
import { createScene, createCamera, createRenderer, createLights, createGround } from '@/game/Scene'
import { createCar } from '@/game/Car'
import { createTree, TREE_POSITIONS } from '@/game/Tree'
import { PhysicsObject } from '@/game/Physics'

export function Game() {
  const containerRef = useRef(null)
  const gameRef = useRef(null)

  const setSpeed = useGameStore((state) => state.setSpeed)
  const setKey = useGameStore((state) => state.setKey)
  const controls = useGameStore((state) => state.controls)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    // 初始化场景
    const scene = createScene()
    const camera = createCamera()
    const renderer = createRenderer(containerRef.current)

    createLights(scene)
    createGround(scene)

    // 创建小车
    const { carGroup, wheels } = createCar()
    scene.add(carGroup)

    // 创建树木
    const trees = TREE_POSITIONS.map(([x, z]) => {
      const tree = createTree(x, z)
      scene.add(tree)
      return tree
    })

    // 物理系统
    const carPhysics = new PhysicsObject(carGroup)
    carPhysics.mass = 5
    carPhysics.friction = 0.96

    // 键盘状态
    const keys = {}

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      keys[key] = true
      setKey(key, true)
    }

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase()
      keys[key] = false
      setKey(key, false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // 窗口调整
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // 游戏循环
    const clock = new THREE.Clock()
    let animationId = null

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const deltaTime = clock.getDelta()

      // 车辆控制
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(carGroup.quaternion)

      if (keys['w']) {
        const force = forward.clone().multiplyScalar(controls.acceleration)
        carPhysics.applyForce(force)
      }

      if (keys['s']) {
        const force = forward.clone().multiplyScalar(-controls.acceleration * 0.7)
        carPhysics.applyForce(force)
      }

      if (keys['a']) {
        carPhysics.angularVelocity += controls.turnSpeed * deltaTime
      }

      if (keys['d']) {
        carPhysics.angularVelocity -= controls.turnSpeed * deltaTime
      }

      if (keys[' ']) {
        carPhysics.velocity.multiplyScalar(controls.brakeForce)
      }

      // 限制最大速度
      const speed = carPhysics.getSpeed()
      if (speed > controls.maxSpeed) {
        carPhysics.velocity.normalize().multiplyScalar(controls.maxSpeed)
      }

      // 更新速度显示
      setSpeed(speed)

      // 更新物理
      carPhysics.update(deltaTime)

      // 碰撞检测
      trees.forEach(tree => {
        carPhysics.checkCollision(tree, 3)
      })

      // 边界检测
      const boundary = 95
      if (Math.abs(carGroup.position.x) > boundary) {
        carGroup.position.x = Math.sign(carGroup.position.x) * boundary
        carPhysics.velocity.x *= -0.3
      }
      if (Math.abs(carGroup.position.z) > boundary) {
        carGroup.position.z = Math.sign(carGroup.position.z) * boundary
        carPhysics.velocity.z *= -0.3
      }

      // 车轮旋转
      const wheelRotationSpeed = speed * 0.1
      wheels.forEach(wheel => {
        wheel.rotation.x += wheelRotationSpeed * deltaTime
      })

      // 相机跟随
      const idealOffset = new THREE.Vector3(0, 10, 18)
      idealOffset.applyQuaternion(carGroup.quaternion)
      const idealPosition = carGroup.position.clone().add(idealOffset)
      camera.position.lerp(idealPosition, 0.15)

      const lookAtPosition = carGroup.position.clone()
      lookAtPosition.y += 2
      camera.lookAt(lookAtPosition)

      renderer.render(scene, camera)
    }

    animate()

    gameRef.current = {
      scene,
      camera,
      renderer,
      cleanup: () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keyup', handleKeyUp)
        window.removeEventListener('resize', handleResize)
        renderer.dispose()
        containerRef.current?.removeChild(renderer.domElement)
      }
    }

    return () => {
      gameRef.current?.cleanup()
      gameRef.current = null
    }
  }, [setSpeed, setKey, controls])

  return <div ref={containerRef} className="w-full h-full" />
}
