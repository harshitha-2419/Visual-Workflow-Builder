import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ShapeType } from '../../types/workflow.types';

interface Shape3DProps {
  shapeType: ShapeType;
  dimensions: { width: number; height: number; count: number };
  zoomLevel: number;
}

const Shape3D: React.FC<Shape3DProps> = ({ shapeType, dimensions, zoomLevel }) => {
  const { width, height, count } = dimensions;
  const scale = zoomLevel;

  const renderSingleShape = (position: [number, number, number], key: number) => {
    const shapeScale = [width * 1.5, height * 1.5, width * 1.5]; // Removed scale (zoom) from here
    
    switch (shapeType) {
      case 'cube':
        return (
          <mesh key={key} position={position} scale={shapeScale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#8b5cf6" />
          </mesh>
        );
      case 'sphere':
        return (
          <mesh key={key} position={position} scale={shapeScale}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        );
      case 'cylinder':
        return (
          <mesh key={key} position={position} scale={shapeScale}>
            <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        );
      case 'cone':
        return (
          <mesh key={key} position={position} scale={shapeScale}>
            <coneGeometry args={[0.5, 1, 32]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        );
      case 'torus':
        return (
          <mesh key={key} position={position} scale={shapeScale}>
            <torusGeometry args={[0.5, 0.2, 16, 100]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        );
      default:
        return null;
    }
  };

  const renderMultipleShapes = () => {
    const shapes = [];
    const spacing = 3.0;
    const gridSize = Math.ceil(Math.sqrt(count));
    
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const x = (col - (gridSize - 1) / 2) * spacing;
      const z = (row - (gridSize - 1) / 2) * spacing;
      const y = 0;
      
      shapes.push(renderSingleShape([x, y, z], i));
    }
    
    return shapes;
  };

  return <group>{renderMultipleShapes()}</group>;
};

interface Viewer3DProps {
  selectedShape?: ShapeType;
  dimensions: { width: number; height: number; count: number };
  zoomLevel: number;
}

export const Viewer3D: React.FC<Viewer3DProps> = ({ selectedShape, dimensions, zoomLevel }) => {
  const { count } = dimensions;
  const gridSize = Math.ceil(Math.sqrt(count));
  const baseDistance = Math.max(10, gridSize * 3);
  const dynamicDistance = baseDistance / zoomLevel; // Apply zoom to camera distance
  const gridHelperSize = Math.max(10, gridSize * 3);
  
  return (
    <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600">
      {selectedShape ? (
        <Canvas camera={{ position: [dynamicDistance, dynamicDistance, dynamicDistance], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -5]} intensity={0.3} />
            <Shape3D 
              shapeType={selectedShape} 
              dimensions={dimensions} 
              zoomLevel={zoomLevel} 
            />
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={1}
            />
            <gridHelper args={[gridHelperSize, gridHelperSize]} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div>Select a shape to view in 3D</div>
          </div>
        </div>
      )}
    </div>
  );
};