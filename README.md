# Interactive Dinosaur Explorer

A realistic 3D interactive dinosaur experience built with React, Three.js, and Next.js. Explore a prehistoric world with scientifically accurate dinosaur models and learn fascinating facts about these ancient creatures.

![3dgame](https://github.com/user-attachments/assets/e0160d3b-9584-4e8e-9b9a-18cd24986758)

## 🦕 Features

### Interactive 3D Environment

- **Realistic Dinosaur Models**: Five scientifically accurate dinosaur species with detailed anatomical features
- **Immersive Terrain**: Procedurally generated landscape with trees, rocks, and varied topography
- **Dynamic Lighting**: Professional lighting setup with shadows and atmospheric effects
- **Physics Integration**: Realistic collision detection and physics simulation


### Educational Content

- **Detailed Information Panels**: Click on any dinosaur to learn about:

- Scientific classification (Kingdom, Species)
- Physical characteristics (Length, Weight)
- Dietary habits and prey
- Fascinating facts and historical context



- **Scientifically Accurate Data**: All information based on current paleontological research


### User Experience

- **Intuitive Controls**: Mouse-based camera controls for exploration
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Professional loading screens with progress indicators
- **Error Handling**: Robust error boundaries and fallback systems


## 🦖 Featured Dinosaurs

| Dinosaur | Period | Diet | Length | Special Features
|-----|-----|-----|-----|-----
| **Tyrannosaurus Rex** | Late Cretaceous | Carnivore | 40 feet | Strongest bite force ever recorded
| **Triceratops** | Late Cretaceous | Herbivore | 30 feet | Massive skull with three horns
| **Velociraptor** | Late Cretaceous | Carnivore | 6.8 feet | Feathered and highly intelligent
| **Brachiosaurus** | Late Jurassic | Herbivore | 85 feet | Could reach 40-50 feet in height
| **Stegosaurus** | Late Jurassic | Herbivore | 30 feet | Distinctive back plates and tail spikes


## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager


### Installation

1. **Clone the repository**

```shellscript
git clone https://github.com/your-username/dinosaur-explorer.git
cd dinosaur-explorer
```


2. **Install dependencies**

```shellscript
npm install
# or
yarn install
# or
pnpm install
```


3. **Run the development server**

```shellscript
npm run dev
# or
yarn dev
# or
pnpm dev
```


4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to start exploring!


## 🛠️ Technology Stack

### Core Technologies

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with modern features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Three.js](https://threejs.org/)** - 3D graphics library


### 3D and Animation

- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[@react-three/drei](https://docs.pmnd.rs/drei)** - Useful helpers for R3F
- **[@react-three/rapier](https://docs.pmnd.rs/react-three-rapier)** - Physics engine integration


### UI and Styling

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons


## 🎮 Controls

### Mouse Controls

- **Left Click + Drag**: Rotate camera around the scene
- **Right Click + Drag**: Pan the camera
- **Scroll Wheel**: Zoom in/out
- **Click on Dinosaur**: Display information panel


### Keyboard Shortcuts

- **ESC**: Close information panel
- **R**: Reset camera position (if implemented)


## 🎨 Customization

### Adding New Dinosaurs

1. **Add dinosaur data** in `lib/realistic-dinosaur-data.ts`:

```typescript
{
  id: "new-dinosaur",
  name: "New Dinosaur",
  species: "Dinosaurus newus",
  // ... other properties
}
```


2. **Create the 3D model** in `components/realistic-dinosaur-models.tsx`:

```typescript
function NewDinosaurModel() {
  return (
    <group>
      {/* Your 3D model components */}
    </group>
  )
}
```


3. **Add to the render function**:

```typescript
case "new-dinosaur":
  return <NewDinosaurModel />
```




### Modifying the Environment

Edit `components/realistic-terrain.tsx` to:

- Adjust terrain generation parameters
- Add new environmental features
- Modify tree and rock placement
- Change material properties


### Customizing UI

Modify `components/dinosaur-info-panel.tsx` to:

- Change information display format
- Add new data fields
- Customize styling and animations


## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific settings:

```plaintext
# Optional: Analytics or tracking IDs
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: API endpoints for additional data
NEXT_PUBLIC_API_URL=https://your-api.com
```

### Performance Optimization

The application includes several performance optimizations:

- **Model Preloading**: 3D models are preloaded to prevent loading delays
- **Efficient Rendering**: Uses React Three Fiber's efficient rendering pipeline
- **Texture Optimization**: Procedural textures reduce file size and loading times
- **Physics Optimization**: Simplified collision shapes for better performance


## 🐛 Troubleshooting

### Common Issues

1. **Models not loading**

1. Ensure all model files are in the `public/models/` directory
2. Check browser console for loading errors
3. Verify file paths in the dinosaur data



2. **Performance issues**

1. Reduce the number of dinosaurs or environmental objects
2. Lower the geometry detail in model components
3. Disable shadows if needed: remove `shadows` prop from `<Canvas>`



3. **Controls not working**

1. Ensure OrbitControls is properly imported and configured
2. Check for JavaScript errors in browser console
3. Verify Three.js and React Three Fiber versions are compatible





### Browser Compatibility

- **Recommended**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **WebGL Support**: Required for 3D rendering
- **Hardware Acceleration**: Recommended for optimal performance


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**


### Development Guidelines

- Follow TypeScript best practices
- Use meaningful component and variable names
- Add comments for complex 3D calculations
- Test on multiple browsers and devices
- Ensure accessibility standards are met


## 📄 License

This project is licensed under the MIT License
Created by kesternkese@gmail.com

## 🙏 Acknowledgments

- **Paleontological Data**: Based on current scientific research
- **Three.js Community**: For excellent 3D web development tools
- **React Three Fiber**: For making 3D React development accessible
- **Educational Resources**: Various paleontology museums and institutions
