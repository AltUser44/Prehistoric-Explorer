"use client"

import { RigidBody } from "@react-three/rapier"
import * as THREE from "three"
import { useRef } from "react"

export default function RealisticTerrain() {
  const terrainRef = useRef<THREE.Mesh>(null)

  // Create a procedural terrain material
  const terrainMaterial = new THREE.MeshStandardMaterial({
    color: "#5d8a68",
    roughness: 0.9,
    metalness: 0.1,
    flatShading: false,
    vertexColors: true,
  })

  // Create a procedural terrain with vertex coloring
  const generateTerrainGeometry = () => {
    const geometry = new THREE.PlaneGeometry(100, 100, 128, 128)
    const position = geometry.attributes.position
    const colors = []

    // Add some height variation
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i)
      const y = position.getY(i)

      // Simple noise function for height
      const freq = 0.02
      const height = Math.sin(x * freq) * Math.cos(y * freq) * 1.5
      position.setZ(i, height)

      // Add color variation based on height
      const color = new THREE.Color()
      if (height > 0.8) {
        // Rocky areas
        color.setRGB(0.5, 0.5, 0.5)
      } else if (height > 0.2) {
        // Grass
        color.setRGB(0.36, 0.54, 0.4)
      } else if (height > -0.2) {
        // Dirt
        color.setRGB(0.6, 0.47, 0.33)
      } else {
        // Lower areas
        color.setRGB(0.33, 0.45, 0.27)
      }

      colors.push(color.r, color.g, color.b)
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
    geometry.computeVertexNormals()
    return geometry
  }

  return (
    <RigidBody type="fixed" colliders="trimesh">
      {/* Main terrain */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        position={[0, -0.1, 0]}
        ref={terrainRef}
        geometry={generateTerrainGeometry()}
        material={terrainMaterial}
      />

      {/* Add trees using primitive shapes */}
      <TreeGroup position={[-15, 0, -15]} count={5} spread={10} />
      <TreeGroup position={[15, 0, -20]} count={7} spread={12} />
      <TreeGroup position={[-20, 0, 10]} count={4} spread={8} />

      {/* Add rocks using primitive shapes */}
      <RockGroup position={[5, 0, 10]} count={8} spread={5} />
      <RockGroup position={[-10, 0, -5]} count={6} spread={4} />
      <RockGroup position={[20, 0, 5]} count={10} spread={7} />
    </RigidBody>
  )
}

interface PositionedGroupProps {
  position: [number, number, number]
  count: number
  spread: number
}

function TreeGroup({ position, count, spread }: PositionedGroupProps) {
  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const x = (Math.random() - 0.5) * spread
        const z = (Math.random() - 0.5) * spread
        const scale = 0.8 + Math.random() * 0.4
        const rotation = Math.random() * Math.PI * 2

        return <Tree key={`tree-${i}`} position={[x, 0, z]} scale={[scale, scale, scale]} rotation={[0, rotation, 0]} />
      })}
    </group>
  )
}

function Tree({
  position,
  scale,
  rotation,
}: {
  position: [number, number, number]
  scale: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Tree trunk */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.8, 4, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* Tree foliage */}
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <coneGeometry args={[2, 6, 8]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.8} />
      </mesh>

      {/* Additional foliage layers */}
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <coneGeometry args={[2.5, 4, 8]} />
        <meshStandardMaterial color="#3CB371" roughness={0.8} />
      </mesh>

      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <coneGeometry args={[3, 3, 8]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.8} />
      </mesh>
    </group>
  )
}

function RockGroup({ position, count, spread }: PositionedGroupProps) {
  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const x = (Math.random() - 0.5) * spread
        const z = (Math.random() - 0.5) * spread
        const scale = 0.5 + Math.random() * 0.5
        const rotation = Math.random() * Math.PI * 2

        return <Rock key={`rock-${i}`} position={[x, 0, z]} scale={[scale, scale, scale]} rotation={[0, rotation, 0]} />
      })}
    </group>
  )
}

function Rock({
  position,
  scale,
  rotation,
}: {
  position: [number, number, number]
  scale: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow rotation={[0.2, 0.5, 0.1]}>
        <dodecahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#777777" roughness={0.8} />
      </mesh>

      {/* Smaller rocks around the main one */}
      <mesh position={[1, 0.4, 0.5]} castShadow receiveShadow rotation={[0.1, 0.3, 0.2]}>
        <dodecahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial color="#888888" roughness={0.9} />
      </mesh>

      <mesh position={[-0.8, 0.3, -0.6]} castShadow receiveShadow rotation={[0.3, 0.2, 0.1]}>
        <dodecahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#666666" roughness={0.9} />
      </mesh>
    </group>
  )
}
