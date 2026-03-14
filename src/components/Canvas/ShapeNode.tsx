import React from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Circle, Cylinder, Triangle, Donut } from 'lucide-react';
import { ShapeType } from '../../types/workflow.types';

interface ShapeNodeProps {
  data: {
    label: string;
    selectedShape?: ShapeType;
    onShapeSelect: (shape: ShapeType) => void;
  };
}

const shapes: { type: ShapeType; icon: React.ReactNode; label: string }[] = [
  { type: 'cube', icon: <Box size={20} />, label: 'Cube' },
  { type: 'sphere', icon: <Circle size={20} />, label: 'Sphere' },
  { type: 'cylinder', icon: <Cylinder size={20} />, label: 'Cylinder' },
  { type: 'cone', icon: <Triangle size={20} />, label: 'Cone' },
  { type: 'torus', icon: <Donut size={20} />, label: 'Torus' },
];

export const ShapeNode: React.FC<ShapeNodeProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-purple-500 dark:border-purple-400 rounded-lg shadow-lg p-3 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="text-center mb-2">
        <h3 className="font-semibold text-purple-700 dark:text-purple-300">{data.label}</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {shapes.map((shape) => (
          <button
            key={shape.type}
            onClick={() => data.onShapeSelect(shape.type)}
            className={`p-2 rounded border-2 transition-all hover:scale-105 ${
              data.selectedShape === shape.type
                ? 'border-purple-500 bg-purple-100 dark:border-purple-400 dark:bg-purple-900'
                : 'border-gray-300 hover:border-purple-300 dark:border-gray-600 dark:hover:border-purple-400 dark:bg-gray-700'
            }`}
            title={shape.label}
          >
            <div className="text-gray-700 dark:text-gray-300">{shape.icon}</div>
          </button>
        ))}
      </div>
      
      {data.selectedShape && (
        <div className="mt-2 text-center text-sm text-purple-600 dark:text-purple-400">
          Selected: {shapes.find(s => s.type === data.selectedShape)?.label}
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};