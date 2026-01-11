import * as THREE from 'three'

export function createCar() {
  const carGroup = new THREE.Group()

  // 车身主体
  const bodyGeometry = new THREE.BoxGeometry(3, 1.2, 5)
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff4444 })
  const carBody = new THREE.Mesh(bodyGeometry, bodyMaterial)
  carBody.position.y = 1
  carBody.castShadow = true
  carGroup.add(carBody)

  // 车顶
  const roofGeometry = new THREE.BoxGeometry(2.5, 0.8, 3)
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xcc0000 })
  const carRoof = new THREE.Mesh(roofGeometry, roofMaterial)
  carRoof.position.y = 2
  carRoof.castShadow = true
  carGroup.add(carRoof)

  // 车窗材质
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0x4444ff,
    transparent: true,
    opacity: 0.6
  })

  // 前后车窗
  const windowGeometry = new THREE.PlaneGeometry(2, 0.6)
  const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial)
  frontWindow.position.set(0, 2, 1.51)
  carGroup.add(frontWindow)

  const backWindow = new THREE.Mesh(windowGeometry, windowMaterial)
  backWindow.position.set(0, 2, -1.51)
  backWindow.rotation.y = Math.PI
  carGroup.add(backWindow)

  // 轮子
  const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16)
  const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 })

  const wheels = []
  const wheelPositions = [
    { x: -1.5, y: 0.5, z: 1.8 },
    { x: 1.5, y: 0.5, z: 1.8 },
    { x: -1.5, y: 0.5, z: -1.8 },
    { x: 1.5, y: 0.5, z: -1.8 }
  ]

  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
    wheel.rotation.z = Math.PI / 2
    wheel.position.set(pos.x, pos.y, pos.z)
    wheel.castShadow = true
    carGroup.add(wheel)
    wheels.push(wheel)
  })

  carGroup.position.y = 0.5

  return { carGroup, wheels }
}
