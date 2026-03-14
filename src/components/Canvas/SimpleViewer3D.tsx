import React from 'react';
import { ShapeType } from '../../types/workflow.types';

interface SimpleViewer3DProps {
  selectedShape?: ShapeType;
  dimensions: { width: number; height: number; depth: number };
  zoomLevel: number;
}

export const SimpleViewer3D: React.FC<SimpleViewer3DProps> = ({ 
  selectedShape, 
  dimensions, 
  zoomLevel 
}) => {
  const getShapeDisplay = () => {
    if (!selectedShape) return null;

    const baseSize = 60; // Reduced base size
    const maxSize = 150; // Maximum size to prevent overflow
    const width = Math.min(dimensions.width * baseSize * zoomLevel, maxSize);
    const height = Math.min(dimensions.height * baseSize * zoomLevel, maxSize);

    const shapeStyles = {
      width: `${width}px`,
      height: `${height}px`,
      margin: '20px auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '12px',
      transition: 'all 0.3s ease',
    };

    switch (selectedShape) {
      case 'cube':
        return (
          <div 
            style={{
              ...shapeStyles,
              backgroundColor: '#8b5cf6',
              border: '2px solid #7c3aed',
            }}
          >
            CUBE
          </div>
        );
      case 'sphere':
        return (
          <div 
            style={{
              ...shapeStyles,
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              border: '2px solid #2563eb',
            }}
          >
            SPHERE
          </div>
        );
      case 'cylinder':
        return (
          <div 
            style={{
              ...shapeStyles,
              backgroundColor: '#10b981',
              borderRadius: '20px',
              border: '2px solid #059669',
            }}
          >
            CYLINDER
          </div>
        );
      case 'cone':
        return (
          <div 
            style={{
              ...shapeStyles,
              backgroundColor: '#f59e0b',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              border: '2px solid #d97706',
            }}
          >
            CONE
          </div>
        );
      case 'torus':
        return (
          <div 
            style={{
              ...shapeStyles,
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '20px solid #dc2626',
              borderStyle: 'solid',
            }}
          >
            TORUS
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex flex-col overflow-hidden">
      <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-t-lg">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Shape Preview</h3>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        {selectedShape ? (
          <div className="max-w-full max-h-full flex items-center justify-center">
            {getShapeDisplay()}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">🎯</div>
            <div>Select a shape to preview</div>
          </div>
        )}
      </div>
    </div>
  );
};