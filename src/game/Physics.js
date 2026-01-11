import * as THREE from 'three'

export class PhysicsObject {
  constructor(mesh) {
    this.mesh = mesh
    this.velocity = new THREE.Vector3(0, 0, 0)
    this.acceleration = new THREE.Vector3(0, 0, 0)
    this.mass = 1
    this.friction = 0.95
    this.angularVelocity = 0
  }

  applyForce(force) {
    const f = force.clone().divideScalar(this.mass)
    this.acceleration.add(f)
  }

  update(deltaTime) {
    this.velocity.add(this.acceleration.clone().multiplyScalar(deltaTime))
    this.velocity.multiplyScalar(this.friction)

    this.mesh.position.add(this.velocity.clone().multiplyScalar(deltaTime))

    this.mesh.rotation.y += this.angularVelocity * deltaTime
    this.angularVelocity *= 0.85

    this.acceleration.set(0, 0, 0)
  }

  checkCollision(object, minDistance) {
    const distance = this.mesh.position.distanceTo(object.position)
    if (distance < minDistance) {
      const direction = new THREE.Vector3()
        .subVectors(this.mesh.position, object.position)
        .normalize()

      this.mesh.position.copy(
        object.position.clone().add(direction.multiplyScalar(minDistance))
      )

      this.velocity.multiplyScalar(-0.3)
      return true
    }
    return false
  }

  getSpeed() {
    return this.velocity.length()
  }
}
