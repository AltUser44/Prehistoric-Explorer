export interface DinosaurData {
  id: string
  name: string
  species: string
  origin: string
  kingdom: string
  diet: string
  prey: string[]
  length: string
  weight: string
  funFact: string
  modelPath: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale: [number, number, number]
  colliderSize: [number, number, number]
  labelHeight?: number
  animate?: boolean
}

export const dinosaurData: DinosaurData[] = [
  {
    id: "trex",
    name: "Tyrannosaurus Rex",
    species: "Tyrannosaurus rex",
    origin: "Late Cretaceous Period",
    kingdom: "Animalia",
    diet: "Carnivore",
    prey: ["Triceratops", "Edmontosaurus", "Ankylosaurus"],
    length: "40 feet (12 meters)",
    weight: "Up to 9 tons",
    funFact:
      "T-Rex had the strongest bite force of any land animal that ever lived, capable of exerting up to 12,800 pounds of force.",
    modelPath: "/models/trex.glb",
    position: [0, 0, 0],
    rotation: [0, Math.PI / 4, 0],
    scale: [1, 1, 1],
    colliderSize: [2, 2, 4],
    labelHeight: 5,
    animate: false,
  },
  {
    id: "triceratops",
    name: "Triceratops",
    species: "Triceratops horridus",
    origin: "Late Cretaceous Period",
    kingdom: "Animalia",
    diet: "Herbivore",
    prey: ["Plants", "Shrubs", "Cycads"],
    length: "30 feet (9 meters)",
    weight: "Up to 12 tons",
    funFact: "Triceratops had one of the largest skulls of any land animal, measuring up to 8 feet long.",
    modelPath: "/models/triceratops.glb",
    position: [8, 0, 5],
    rotation: [0, -Math.PI / 3, 0],
    scale: [1, 1, 1],
    colliderSize: [2, 1.5, 3],
    labelHeight: 3,
    animate: true,
  },
  {
    id: "velociraptor",
    name: "Velociraptor",
    species: "Velociraptor mongoliensis",
    origin: "Late Cretaceous Period",
    kingdom: "Animalia",
    diet: "Carnivore",
    prey: ["Small dinosaurs", "Mammals", "Lizards"],
    length: "6.8 feet (2 meters)",
    weight: "About 33 pounds (15 kg)",
    funFact: "Unlike in movies, real velociraptors were about the size of a turkey and covered in feathers.",
    modelPath: "/models/velociraptor.glb",
    position: [-5, 0, -7],
    rotation: [0, Math.PI / 6, 0],
    scale: [1, 1, 1],
    colliderSize: [0.7, 0.7, 1.4],
    labelHeight: 1.5,
    animate: true,
  },
  {
    id: "brachiosaurus",
    name: "Brachiosaurus",
    species: "Brachiosaurus altithorax",
    origin: "Late Jurassic Period",
    kingdom: "Animalia",
    diet: "Herbivore",
    prey: ["High tree foliage", "Conifers", "Ginkgoes"],
    length: "85 feet (26 meters)",
    weight: "Up to 50 tons",
    funFact:
      "Brachiosaurus could reach heights of 40-50 feet, allowing it to feed on treetops that other dinosaurs couldn't reach.",
    modelPath: "/models/brachiosaurus.glb",
    position: [-15, 0, -15],
    scale: [1, 1, 1],
    colliderSize: [3, 6, 5],
    labelHeight: 12,
    animate: false,
  },
  {
    id: "stegosaurus",
    name: "Stegosaurus",
    species: "Stegosaurus stenops",
    origin: "Late Jurassic Period",
    kingdom: "Animalia",
    diet: "Herbivore",
    prey: ["Low-growing plants", "Ferns", "Mosses"],
    length: "30 feet (9 meters)",
    weight: "Up to 5 tons",
    funFact: "Stegosaurus had a brain the size of a walnut - one of the smallest brain-to-body ratios of any dinosaur.",
    modelPath: "/models/stegosaurus.glb",
    position: [12, 0, -10],
    rotation: [0, -Math.PI / 5, 0],
    scale: [1, 1, 1],
    colliderSize: [2, 1.5, 3],
    labelHeight: 3,
    animate: true,
  },
]
