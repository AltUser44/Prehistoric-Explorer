"use client"

import { RigidBody } from "@react-three/rapier"
import type * as THREE from "three"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Terrain() {
  // Create a procedural terrain without external textures
  const terrainRef = useRef<THREE.Mesh>(null)

  // Use a noise function to create terrain height variations
  useFrame(() => {
    if (terrainRef.current) {
      // We could animate terrain here if needed
    }
  })

  return (
    <RigidBody type="fixed" colliders="trimesh">
      {/* Main ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow ref={terrainRef}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial color="#5d8a68" roughness={0.8} metalness={0.1} flatShading={false} />
      </mesh>

      {/* Add trees */}
      <Tree position={[-10, 0, -15]} scale={[1, 1, 1]} />
      <Tree position={[-15, 0, -8]} scale={[0.8, 1.2, 0.8]} />
      <Tree position={[12, 0, -18]} scale={[1.2, 1, 1.2]} />
      <Tree position={[18, 0, -5]} scale={[0.9, 1.1, 0.9]} />
      <Tree position={[-5, 0, 15]} scale={[1.1, 0.9, 1.1]} />

      {/* Add some rocks */}
      <Rock position={[5, 0, 10]} scale={[1, 1, 1]} />
      <Rock position={[-8, 0, 8]} scale={[0.8, 0.7, 0.8]} />
      <Rock position={[15, 0, -12]} scale={[1.2, 1, 1.2]} />
      <Rock position={[-12, 0, -10]} scale={[0.7, 0.6, 0.7]} />

      {/* Add some hills */}
      <Hill position={[-20, 0, -20]} scale={[1, 1, 1]} />
      <Hill position={[15, 0, -15]} scale={[0.8, 0.6, 0.8]} />
      <Hill position={[-15, 0, 15]} scale={[1.2, 0.8, 1.2]} />
    </RigidBody>
  )
}

interface PositionedObjectProps {
  position: [number, number, number]
  scale: [number, number, number]
}

function Tree({ position, scale }: PositionedObjectProps) {
  return (
    <group position={position} scale={scale}>
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

function Rock({ position, scale }: PositionedObjectProps) {
  return (
    <group position={position} scale={scale}>
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

function Hill({ position, scale }: PositionedObjectProps) {
  return (
    <group position={position} scale={scale}>
      {/* Main hill using sphereGeometry with partial segments */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#4a6d53" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Add some variation to the hill */}
      <mesh position={[2, 0.5, 1]} castShadow receiveShadow>
        <sphereGeometry args={[2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#5d8a68" roughness={0.9} metalness={0.1} />
      </mesh>

      <mesh position={[-1, 0.2, -2]} castShadow receiveShadow>
        <sphereGeometry args={[1.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#4a6d53" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  )
}
