import React from 'react';
import { Handle, Position } from 'reactflow';
import { Ruler } from 'lucide-react';

interface SizeNodeProps {
  data: {
    label: string;
    dimensions: { width: number; height: number; count: number };
    onDimensionChange: (dimension: 'width' | 'height' | 'count', value: number) => void;
  };
}

export const SizeNode: React.FC<SizeNodeProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 rounded-lg shadow-lg p-3 min-w-[220px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex items-center gap-2 mb-3">
        <Ruler className="text-blue-600 dark:text-blue-400" size={20} />
        <h3 className="font-semibold text-blue-700 dark:text-blue-300">{data.label}</h3>
      </div>
      
      <div className="space-y-3">
        {(['width', 'height', 'count'] as const).map((dimension) => (
          <div key={dimension} className="space-y-1">
            <div className="flex justify-between text-sm">
              <label className="capitalize text-gray-700 dark:text-gray-300">
                {dimension === 'count' ? 'Number of Shapes' : dimension}:
              </label>
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {dimension === 'count' ? Math.round(data.dimensions[dimension]) : data.dimensions[dimension].toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={dimension === 'count' ? "1" : "0.1"}
              max={dimension === 'count' ? "50" : "5"}
              step={dimension === 'count' ? "1" : "0.1"}
              value={data.dimensions[dimension]}
              onChange={(e) => data.onDimensionChange(dimension, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        ))}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};