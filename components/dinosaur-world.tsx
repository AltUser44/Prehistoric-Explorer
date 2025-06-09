"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Sky, Stats } from "@react-three/drei"
import { Physics } from "@react-three/rapier"
import Terrain from "./terrain"
import DinosaurModels from "./dinosaur-models"
import LoadingScreen from "./loading-screen"
import DinosaurInfoPanel from "./dinosaur-info-panel"
import type { DinosaurData } from "@/lib/dinosaur-data"
import { ErrorBoundary } from "react-error-boundary"

function FallbackComponent({ error }: { error: Error }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-red-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong:</h2>
      <pre className="bg-red-950 p-4 rounded-md overflow-auto max-w-full">{error.message}</pre>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-white text-red-900 font-bold rounded-md hover:bg-red-100"
      >
        Try again
      </button>
    </div>
  )
}

export default function DinosaurWorld() {
  const [selectedDinosaur, setSelectedDinosaur] = useState<DinosaurData | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  const handleDinosaurClick = (dinosaur: DinosaurData) => {
    setSelectedDinosaur(dinosaur)
    setShowInfo(true)
  }

  const handleCloseInfo = () => {
    setShowInfo(false)
  }

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={<LoadingScreen />}>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
            <color attach="background" args={["#87ceeb"]} />
            <fog attach="fog" args={["#87ceeb", 30, 100]} />
            <Sky sunPosition={[100, 20, 100]} />
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <Physics>
              <Terrain />
              <DinosaurModels onDinosaurClick={handleDinosaurClick} />
            </Physics>
            <Environment preset="forest" />
            <OrbitControls minDistance={5} maxDistance={50} maxPolarAngle={Math.PI / 2 - 0.1} minPolarAngle={0.2} />
            <Stats />
          </Canvas>
        </ErrorBoundary>
      </Suspense>

      {showInfo && selectedDinosaur && <DinosaurInfoPanel dinosaur={selectedDinosaur} onClose={handleCloseInfo} />}

      <div className="absolute bottom-4 left-4 text-white bg-black/50 p-2 rounded-md">
        <p>Click on a dinosaur to learn more about it</p>
        <p>Use mouse to orbit, zoom and pan</p>
      </div>
    </div>
  )
}
