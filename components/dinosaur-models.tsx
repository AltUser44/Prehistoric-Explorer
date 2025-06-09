"use client"

import { useFrame } from "@react-three/fiber"
import { RigidBody, CuboidCollider } from "@react-three/rapier"
import { useRef, useState } from "react"
import type * as THREE from "three"
import { dinosaurData, type DinosaurData } from "@/lib/dinosaur-data"

interface DinosaurModelsProps {
  onDinosaurClick: (dinosaur: DinosaurData) => void
}

export default function DinosaurModels({ onDinosaurClick }: DinosaurModelsProps) {
  return (
    <>
      {dinosaurData.map((dino) => (
        <DinosaurModel
          key={dino.id}
          dinosaur={dino}
          position={dino.position}
          scale={dino.scale}
          rotation={dino.rotation || [0, 0, 0]}
          onClick={() => onDinosaurClick(dino)}
        />
      ))}
    </>
  )
}

interface DinosaurModelProps {
  dinosaur: DinosaurData
  position: [number, number, number]
  scale: [number, number, number]
  rotation?: [number, number, number]
  onClick: () => void
}

function DinosaurModel({ dinosaur, position, scale, rotation = [0, 0, 0], onClick }: DinosaurModelProps) {
  const [hovered, setHovered] = useState(false)
  const rigidBodyRef = useRef(null)
  const groupRef = useRef<THREE.Group>(null)

  // Simple animation for some dinosaurs
  useFrame((state) => {
    if (dinosaur.animate && rigidBodyRef.current) {
      const time = state.clock.getElapsedTime()
      const offset = Math.sin(time * 0.5) * 0.05
      rigidBodyRef.current.setTranslation({ x: position[0], y: position[1] + offset, z: position[2] }, true)
    }

    // Subtle breathing animation for all dinosaurs
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      const breathingScale = 1 + Math.sin(time * 1.5) * 0.01
      groupRef.current.scale.y = scale[1] * breathingScale
    }
  })

  return (
    <RigidBody ref={rigidBodyRef} type="fixed" position={position} colliders={false}>
      <group
        ref={groupRef}
        rotation={[rotation[0], rotation[1], rotation[2]]}
        scale={scale}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Create more realistic dinosaur models using complex combinations of primitives */}
        {dinosaur.id === "trex" && <EnhancedTRexModel />}
        {dinosaur.id === "triceratops" && <EnhancedTriceratopsModel />}
        {dinosaur.id === "velociraptor" && <EnhancedVelociraptorModel />}
        {dinosaur.id === "brachiosaurus" && <EnhancedBrachiosaurusModel />}
        {dinosaur.id === "stegosaurus" && <EnhancedStegosaurusModel />}

        {/* Hover indicator */}
        {hovered && (
          <mesh position={[0, dinosaur.labelHeight || 2, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        )}
      </group>
      <CuboidCollider
        args={[dinosaur.colliderSize[0], dinosaur.colliderSize[1], dinosaur.colliderSize[2]]}
        position={[0, dinosaur.colliderSize[1], 0]}
      />
    </RigidBody>
  )
}

// Enhanced dinosaur models with more detail and realism

function EnhancedTRexModel() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 2, 0]} castShadow>
        <capsuleGeometry args={[1, 2.5, 8, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2.8, 1]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <capsuleGeometry args={[0.7, 1, 8, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 3.5, 1.8]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.9, 1, 1.8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Lower Jaw */}
      <mesh position={[0, 3.1, 2.2]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.4, 1.5]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Teeth - Upper */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`upper-tooth-${i}`} position={[-0.3 + i * 0.12, 3.3, 2.5]} castShadow>
          <coneGeometry args={[0.04, 0.15, 8]} />
          <meshStandardMaterial color="#F8F8FF" roughness={0.2} />
        </mesh>
      ))}

      {/* Teeth - Lower */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`lower-tooth-${i}`} position={[-0.3 + i * 0.12, 3.1, 2.5]} rotation={[Math.PI, 0, 0]} castShadow>
          <coneGeometry args={[0.04, 0.15, 8]} />
          <meshStandardMaterial color="#F8F8FF" roughness={0.2} />
        </mesh>
      ))}

      {/* Eyes */}
      <mesh position={[0.35, 3.7, 2.3]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[-0.35, 3.7, 2.3]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      {/* Eye ridges */}
      <mesh position={[0.35, 3.85, 2.2]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[-0.35, 3.85, 2.2]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[0.6, 1.2, 0.2]} castShadow>
        <capsuleGeometry args={[0.4, 2, 8, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[-0.6, 1.2, 0.2]} castShadow>
        <capsuleGeometry args={[0.4, 2, 8, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Feet */}
      <mesh position={[0.6, 0.3, 0.3]} castShadow>
        <boxGeometry args={[0.6, 0.3, 1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[-0.6, 0.3, 0.3]} castShadow>
        <boxGeometry args={[0.6, 0.3, 1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Claws */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`right-claw-${i}`} position={[0.6 + (i - 1) * 0.2, 0.2, 0.8]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[0.08, 0.25, 4]} />
          <meshStandardMaterial color="#111" roughness={0.5} />
        </mesh>
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`left-claw-${i}`} position={[-0.6 + (i - 1) * 0.2, 0.2, 0.8]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[0.08, 0.25, 4]} />
          <meshStandardMaterial color="#111" roughness={0.5} />
        </mesh>
      ))}

      {/* Arms */}
      <mesh position={[0.8, 2.3, 0.5]} rotation={[0.3, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[-0.8, 2.3, 0.5]} rotation={[0.3, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Hands */}
      <mesh position={[1, 2.1, 0.7]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.2, 0.25, 0.3]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[-1, 2.1, 0.7]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.25, 0.3]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Hand Claws */}
      <mesh position={[1.1, 2.1, 0.8]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.05, 0.2, 4]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[-1.1, 2.1, 0.8]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.05, 0.2, 4]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 2, -1.5]} rotation={[-0.1, 0, 0]} castShadow>
        <capsuleGeometry args={[0.6, 3, 8, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.9, -3]} rotation={[-0.15, 0, 0]} castShadow>
        <capsuleGeometry args={[0.3, 2, 8, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Skin texture details - back ridges */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`back-ridge-${i}`} position={[0, 2.5, -1 + i * 0.4]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#6B3E11" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function EnhancedTriceratopsModel() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <capsuleGeometry args={[1.2, 2.5, 8, 16]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.7, 1.2]} rotation={[Math.PI / 8, 0, 0]} castShadow>
        <capsuleGeometry args={[0.9, 0.8, 8, 16]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2, 2]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 1.2, 1.5]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>

      {/* Frill */}
      <mesh position={[0, 2.3, 1.2]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <cylinderGeometry args={[2, 1.8, 0.2, 16]} />
        <meshStandardMaterial color="#A0522D" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.4, 1.1]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <cylinderGeometry args={[1.9, 1.7, 0.2, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Frill details */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI + Math.PI / 2
        return (
          <mesh
            key={`frill-detail-${i}`}
            position={[Math.cos(angle) * 1.9, 2.3 + Math.sin(angle) * 0.2, 1.2 + Math.sin(angle) * 0.2]}
            rotation={[Math.PI / 6, 0, 0]}
            castShadow
          >
            <boxGeometry args={[0.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#A0522D" roughness={0.8} />
          </mesh>
        )
      })}

      {/* Main horn */}
      <mesh position={[0, 2.5, 2.8]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <coneGeometry args={[0.2, 1.2, 8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.5} />
      </mesh>

      {/* Side horns */}
      <mesh position={[0.9, 2.5, 2.3]} rotation={[Math.PI / 6, Math.PI / 8, 0]} castShadow>
        <coneGeometry args={[0.15, 1, 8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.5} />
      </mesh>
      <mesh position={[-0.9, 2.5, 2.3]} rotation={[Math.PI / 6, -Math.PI / 8, 0]} castShadow>
        <coneGeometry args={[0.15, 1, 8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.5} />
      </mesh>

      {/* Beak */}
      <mesh position={[0, 1.9, 2.8]} castShadow>
        <coneGeometry args={[0.5, 0.8, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.8, 2.2, 2.5]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[-0.8, 2.2, 2.5]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      {/* Legs */}
      <mesh position={[0.8, 0.9, 0.8]} castShadow>
        <capsuleGeometry args={[0.4, 1.5, 8, 16]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>
      <mesh position={[-0.8, 0.9, 0.8]} castShadow>
        <capsuleGeometry args={[0.4, 1.5, 8, 16]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>
      <mesh position={[0.8, 0.9, -0.8]} castShadow>
        <capsuleGeometry args={[0.4, 1.5, 8, 16]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>
      <mesh position={[-0.8, 0.9, -0.8]} castShadow>
        <capsuleGeometry args={[0.4, 1.5, 8, 16]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>

      {/* Feet */}
      <mesh position={[0.8, 0.3, 0.9]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 0.4, 5]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>
      <mesh position={[-0.8, 0.3, 0.9]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 0.4, 5]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>
      <mesh position={[0.8, 0.3, -0.9]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 0.4, 5]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>
      <mesh position={[-0.8, 0.3, -0.9]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 0.4, 5]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 1.5, -1.5]} rotation={[-0.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.5, 2, 8, 16]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>

      {/* Skin texture details */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`skin-detail-${i}`}
          position={[(Math.random() - 0.5) * 2, 1.5 + (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 2]}
          castShadow
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#A0522D" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function EnhancedVelociraptorModel() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 1, 0]} rotation={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.4, 1.2, 8, 16]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.2, 0.6]} rotation={[Math.PI / 4, 0, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.6, 8, 16]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.5, 1]} rotation={[0.2, 0, 0]} castShadow>
        <coneGeometry args={[0.2, 0.8, 8]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>

      {/* Jaw */}
      <mesh position={[0, 1.4, 1.2]} rotation={[0.1, 0, 0]} castShadow>
        <coneGeometry args={[0.15, 0.6, 8]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.12, 1.55, 1.1]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[-0.12, 1.55, 1.1]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      {/* Teeth */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`tooth-${i}`} position={[-0.1 + i * 0.04, 1.45, 1.35]} castShadow>
          <coneGeometry args={[0.02, 0.08, 8]} />
          <meshStandardMaterial color="#F8F8FF" roughness={0.2} />
        </mesh>
      ))}

      {/* Legs */}
      <mesh position={[0.3, 0.7, 0]} rotation={[0.3, 0, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 0.7, 0]} rotation={[0.3, 0, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>

      {/* Feet with claws */}
      <mesh position={[0.3, 0.3, 0.2]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 0.3, 0.2]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>

      {/* Foot claws */}
      <mesh position={[0.3, 0.25, 0.35]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.05, 0.2, 4]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[-0.3, 0.25, 0.35]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.05, 0.2, 4]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      {/* Arms */}
      <mesh position={[0.3, 1.1, 0.3]} rotation={[0.5, 0, -0.5]} castShadow>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 1.1, 0.3]} rotation={[0.5, 0, 0.5]} castShadow>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>

      {/* Hands with claws */}
      <mesh position={[0.4, 0.9, 0.5]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.2]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>
      <mesh position={[-0.4, 0.9, 0.5]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.2]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>

      {/* Hand claws */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`right-claw-${i}`} position={[0.4 + (i - 1) * 0.05, 0.9, 0.6]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[0.02, 0.15, 4]} />
          <meshStandardMaterial color="#111" roughness={0.5} />
        </mesh>
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`left-claw-${i}`} position={[-0.4 + (i - 1) * 0.05, 0.9, 0.6]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[0.02, 0.15, 4]} />
          <meshStandardMaterial color="#111" roughness={0.5} />
        </mesh>
      ))}

      {/* Tail */}
      <mesh position={[0, 1, -0.8]} rotation={[-0.1, 0, 0]} castShadow>
        <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.9, -1.8]} rotation={[-0.05, 0, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.8, 8, 16]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>

      {/* Feathers on head */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={`head-feather-${i}`}
          position={[0, 1.6 + i * 0.05, 0.9 - i * 0.05]}
          rotation={[0.5 + i * 0.1, 0, 0]}
          castShadow
        >
          <boxGeometry args={[0.1, 0.02, 0.15]} />
          <meshStandardMaterial color="#6B8E23" roughness={0.8} />
        </mesh>
      ))}

      {/* Feathers on arms */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`right-arm-feather-${i}`}
          position={[0.35, 1.1 - i * 0.05, 0.3 + i * 0.05]}
          rotation={[0.5, 0, -0.5]}
          castShadow
        >
          <boxGeometry args={[0.15, 0.02, 0.2]} />
          <meshStandardMaterial color="#6B8E23" roughness={0.8} />
        </mesh>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`left-arm-feather-${i}`}
          position={[-0.35, 1.1 - i * 0.05, 0.3 + i * 0.05]}
          rotation={[0.5, 0, 0.5]}
          castShadow
        >
          <boxGeometry args={[0.15, 0.02, 0.2]} />
          <meshStandardMaterial color="#6B8E23" roughness={0.8} />
        </mesh>
      ))}

      {/* Feathers on tail */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`tail-feather-${i}`} position={[0, 1 - i * 0.05, -0.8 - i * 0.1]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.02, 0.15]} />
          <meshStandardMaterial color="#6B8E23" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function EnhancedBrachiosaurusModel() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 3, 0]} castShadow>
        <capsuleGeometry args={[1.8, 3.5, 8, 16]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 5, 1]} rotation={[Math.PI / 3.5, 0, 0]} castShadow>
        <capsuleGeometry args={[0.7, 6, 8, 16]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 8.5, 4]} rotation={[Math.PI / 2.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.6, 1.2, 8, 16]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 8.7, 4.7]} rotation={[Math.PI / 2.5, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.5, 1]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>

      {/* Nostrils */}
      <mesh position={[0.25, 8.9, 4.9]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#4A777A" roughness={0.8} />
      </mesh>
      <mesh position={[-0.25, 8.9, 4.9]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#4A777A" roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.4, 8.8, 4.3]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[-0.4, 8.8, 4.3]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      {/* Front legs */}
      <mesh position={[1.2, 2, 1.2]} castShadow>
        <capsuleGeometry args={[0.7, 3.5, 8, 16]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>
      <mesh position={[-1.2, 2, 1.2]} castShadow>
        <capsuleGeometry args={[0.7, 3.5, 8, 16]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>

      {/* Front feet */}
      <mesh position={[1.2, 0.4, 1.2]} castShadow>
        <cylinderGeometry args={[0.9, 1.1, 0.6, 5]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>
      <mesh position={[-1.2, 0.4, 1.2]} castShadow>
        <cylinderGeometry args={[0.9, 1.1, 0.6, 5]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>

      {/* Rear legs */}
      <mesh position={[1.2, 1.8, -1.5]} castShadow>
        <capsuleGeometry args={[0.6, 3, 8, 16]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>
      <mesh position={[-1.2, 1.8, -1.5]} castShadow>
        <capsuleGeometry args={[0.6, 3, 8, 16]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>

      {/* Rear feet */}
      <mesh position={[1.2, 0.4, -1.5]} castShadow>
        <cylinderGeometry args={[0.8, 1, 0.6, 5]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>
      <mesh position={[-1.2, 0.4, -1.5]} castShadow>
        <cylinderGeometry args={[0.8, 1, 0.6, 5]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 3, -2.5]} rotation={[-0.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.8, 3, 8, 16]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.8, -4.5]} rotation={[-0.1, 0, 0]} castShadow>
        <capsuleGeometry args={[0.4, 2, 8, 16]} />
        <meshStandardMaterial color="#5F9EA0" roughness={0.8} />
      </mesh>

      {/* Back details */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`back-detail-${i}`} position={[0, 3.5, -1 + i * 0.4]} castShadow>
          <boxGeometry args={[1.5, 0.1, 0.2]} />
          <meshStandardMaterial color="#4A777A" roughness={0.8} />
        </mesh>
      ))}

      {/* Skin texture */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={`skin-detail-${i}`}
          position={[(Math.random() - 0.5) * 3, 3 + (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 4]}
          castShadow
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#4A777A" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function EnhancedStegosaurusModel() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <capsuleGeometry args={[1.2, 2.8, 8, 16]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.6, 1.3]} rotation={[Math.PI / 8, 0, 0]} castShadow>
        <capsuleGeometry args={[0.5, 0.8, 8, 16]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.7, 2]} rotation={[0.1, 0, 0]} castShadow>
        <capsuleGeometry args={[0.4, 0.9, 8, 16]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 1.6, 2.4]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.3, 0.6, 8]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.25, 1.8, 2.2]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[-0.25, 1.8, 2.2]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      {/* Legs */}
      <mesh position={[0.8, 0.9, 0.8]} castShadow>
        <capsuleGeometry args={[0.3, 1.6, 8, 16]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>
      <mesh position={[-0.8, 0.9, 0.8]} castShadow>
        <capsuleGeometry args={[0.3, 1.6, 8, 16]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>
      <mesh position={[0.8, 0.9, -0.8]} castShadow>
        <capsuleGeometry args={[0.3, 1.6, 8, 16]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>
      <mesh position={[-0.8, 0.9, -0.8]} castShadow>
        <capsuleGeometry args={[0.3, 1.6, 8, 16]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>

      {/* Feet */}
      <mesh position={[0.8, 0.3, 0.8]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.4, 5]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>
      <mesh position={[-0.8, 0.3, 0.8]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.4, 5]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>
      <mesh position={[0.8, 0.3, -0.8]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.4, 5]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>
      <mesh position={[-0.8, 0.3, -0.8]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.4, 5]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 1.5, -1.5]} rotation={[-0.1, 0, 0]} castShadow>
        <capsuleGeometry args={[0.5, 2, 8, 16]} />
        <meshStandardMaterial color="#8B8878" roughness={0.8} />
      </mesh>

      {/* Tail spikes */}
      <mesh position={[0.4, 1.5, -2.5]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <coneGeometry args={[0.2, 1, 4]} />
        <meshStandardMaterial color="#A9A9A9" roughness={0.5} />
      </mesh>
      <mesh position={[-0.4, 1.5, -2.5]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <coneGeometry args={[0.2, 1, 4]} />
        <meshStandardMaterial color="#A9A9A9" roughness={0.5} />
      </mesh>

      {/* Back plates - more detailed and varied */}
      {Array.from({ length: 9 }).map((_, i) => {
        const height = 0.8 + Math.sin((i / 8) * Math.PI) * 0.6
        return (
          <group key={`plate-${i}`}>
            <mesh position={[0, 2.2 + height / 2, -1.2 + i * 0.4]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <coneGeometry args={[height, 1.2, 3]} />
              <meshStandardMaterial color="#A9A9A9" roughness={0.8} />
            </mesh>
            {/* Plate details */}
            {Array.from({ length: 5 }).map((_, j) => (
              <mesh
                key={`plate-detail-${i}-${j}`}
                position={[0, 2.2 + (height * (j + 1)) / 6, -1.2 + i * 0.4]}
                rotation={[0, 0, Math.PI / 2]}
                castShadow
              >
                <boxGeometry args={[0.05, 0.8 * (1 - j / 5), 0.05]} />
                <meshStandardMaterial color="#8B8878" roughness={0.8} />
              </mesh>
            ))}
          </group>
        )
      })}

      {/* Skin texture */}
      {Array.from({ length: 25 }).map((_, i) => (
        <mesh
          key={`skin-detail-${i}`}
          position={[(Math.random() - 0.5) * 2, 1.5 + (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 2.5]}
          castShadow
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#A9A9A9" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}
