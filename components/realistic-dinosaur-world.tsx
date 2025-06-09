"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Sky, Stats, Loader } from "@react-three/drei"
import { Physics } from "@react-three/rapier"
import RealisticTerrain from "./realistic-terrain"
import RealisticDinosaurModels from "./realistic-dinosaur-models"
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

export default function RealisticDinosaurWorld() {
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
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Canvas shadows camera={{ position: [0, 5, 15], fov: 45 }}>
          <color attach="background" args={["#87ceeb"]} />
          <fog attach="fog" args={["#87ceeb", 30, 100]} />

          {/* Realistic lighting setup */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />

          <Physics>
            <Suspense fallback={null}>
              <RealisticTerrain />
              <RealisticDinosaurModels onDinosaurClick={handleDinosaurClick} />
              <Environment preset="forest" background={false} />
              <Sky sunPosition={[100, 20, 100]} />
            </Suspense>
          </Physics>

          <OrbitControls minDistance={5} maxDistance={50} maxPolarAngle={Math.PI / 2 - 0.1} minPolarAngle={0.2} />
          <Stats />
        </Canvas>

        <Loader
          containerStyles={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(5px)",
          }}
          innerStyles={{
            backgroundColor: "#8B4513",
            width: "10rem",
          }}
          barStyles={{
            backgroundColor: "#f59e0b",
          }}
          dataStyles={{
            color: "white",
            fontSize: "1rem",
            fontFamily: "monospace",
          }}
          dataInterpolation={(p) => `Loading prehistoric world... ${p.toFixed(0)}%`}
        />
      </ErrorBoundary>

      {showInfo && selectedDinosaur && <DinosaurInfoPanel dinosaur={selectedDinosaur} onClose={handleCloseInfo} />}

      <div className="absolute bottom-4 left-4 text-white bg-black/50 p-2 rounded-md">
        <p>Click on a dinosaur to learn more about it</p>
        <p>Use mouse to orbit, zoom and pan</p>
      </div>
    </div>
  )
}
