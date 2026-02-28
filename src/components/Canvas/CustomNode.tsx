import React from 'react';
import { Handle, Position } from 'reactflow';
import * as Icons from 'lucide-react';

interface CustomNodeProps {
  data: {
    label: string;
    nodeType: string;
    isExecuting?: boolean;
    isSelected?: boolean;
  };
}

export const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const getNodeColor = () => {
    switch (data.nodeType) {
      case 'trigger': return 'bg-green-500 border-green-600';
      case 'action': return 'bg-blue-500 border-blue-600';
      case 'condition': return 'bg-yellow-500 border-yellow-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getIcon = () => {
    switch (data.nodeType) {
      case 'trigger': return <Icons.Play size={16} />;
      case 'action': return <Icons.Zap size={16} />;
      case 'condition': return <Icons.GitBranch size={16} />;
      default: return <Icons.Box size={16} />;
    }
  };

  return (
    <div
      className={`px-4 py-2 rounded-lg border-2 shadow-md min-w-[150px] ${
        data.isExecuting ? 'ring-4 ring-blue-400 animate-pulse' : ''
      } ${data.isSelected ? 'ring-2 ring-purple-500' : ''}`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className={`flex items-center gap-2 text-white ${getNodeColor()} px-2 py-1 rounded`}>
        {getIcon()}
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};
