"use client"

import { X } from "lucide-react"
import type { DinosaurData } from "@/lib/realistic-dinosaur-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DinosaurInfoPanelProps {
  dinosaur: DinosaurData
  onClose: () => void
}

export default function DinosaurInfoPanel({ dinosaur, onClose }: DinosaurInfoPanelProps) {
  return (
    <div className="absolute top-4 right-4 w-80 z-10">
      <Card className="border-2 border-amber-600 shadow-xl bg-black/80 backdrop-blur-md">
        <CardHeader className="bg-amber-800 text-white pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">{dinosaur.name}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-white hover:bg-amber-700">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4 text-white">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-amber-400">Origin</h3>
              <p>{dinosaur.origin}</p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400">Kingdom</h3>
              <p>{dinosaur.kingdom}</p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400">Species</h3>
              <p>{dinosaur.species}</p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400">Diet</h3>
              <p>{dinosaur.diet}</p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400">Prey</h3>
              <p>{dinosaur.prey.join(", ")}</p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400">Length</h3>
              <p>{dinosaur.length}</p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400">Weight</h3>
              <p>{dinosaur.weight}</p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400">Fun Fact</h3>
              <p>{dinosaur.funFact}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
