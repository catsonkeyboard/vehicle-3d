import * as THREE from 'three'

export function createTree(x, z) {
  const treeGroup = new THREE.Group()

  // 树干
  const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 4, 8)
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
  trunk.position.y = 2
  trunk.castShadow = true
  treeGroup.add(trunk)

  // 树冠材质
  const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 })

  // 第一层树冠
  const foliage1 = new THREE.Mesh(
    new THREE.ConeGeometry(2, 3, 8),
    foliageMaterial
  )
  foliage1.position.y = 5
  foliage1.castShadow = true
  treeGroup.add(foliage1)

  // 第二层树冠
  const foliage2 = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 2.5, 8),
    foliageMaterial
  )
  foliage2.position.y = 6.5
  foliage2.castShadow = true
  treeGroup.add(foliage2)

  treeGroup.position.set(x, 0, z)

  return treeGroup
}

export const TREE_POSITIONS = [
  [-20, -20], [20, -20], [-20, 20], [25, 25],
  [-30, 0], [30, 0], [0, -30], [0, 30],
  [-15, 15], [15, -15], [-25, -10], [28, 12],
  [-10, -25], [12, 28], [-35, 20], [35, -20]
]
