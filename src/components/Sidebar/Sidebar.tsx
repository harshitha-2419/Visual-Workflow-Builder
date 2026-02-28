import React, { useState } from 'react';
import { nodeTemplates } from '../../features/workflow/nodeTemplates';
import type { NodeTemplate } from '../../types/workflow.types';
import * as Icons from 'lucide-react';

interface SidebarProps {
  onNodeDragStart: (template: NodeTemplate) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNodeDragStart }) => {
  const [search, setSearch] = useState('');

  const filteredTemplates = nodeTemplates.filter(template =>
    template.label.toLowerCase().includes(search.toLowerCase()) ||
    template.description.toLowerCase().includes(search.toLowerCase())
  );

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.Box;
    return <Icon size={20} />;
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700';
      case 'action': return 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700';
      case 'condition': return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700';
      default: return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Node Library</h2>
        <input
          type="text"
          placeholder="Search nodes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredTemplates.map((template, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => onNodeDragStart(template)}
            className={`p-3 rounded-lg border-2 cursor-move hover:shadow-md transition-shadow ${getNodeColor(template.type)}`}
          >
            <div className="flex items-center gap-2 mb-1">
              {getIcon(template.icon)}
              <span className="font-medium text-sm text-gray-800 dark:text-gray-100">{template.label}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
