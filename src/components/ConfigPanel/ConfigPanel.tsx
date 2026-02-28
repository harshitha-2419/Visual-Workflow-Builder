import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { Trash2, X } from 'lucide-react';

export const ConfigPanel: React.FC = () => {
  const { present, updateNode, deleteNode, selectNode } = useWorkflowStore();
  const selectedNode = present.nodes.find(n => n.id === present.selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 p-4">
        <p className="text-gray-500 dark:text-gray-400 text-center mt-8">
          Select a node to configure
        </p>
      </div>
    );
  }

  const handleLabelChange = (label: string) => {
    updateNode(selectedNode.id, {
      data: { ...selectedNode.data, label }
    });
  };

  const handleConfigChange = (key: string, value: any) => {
    updateNode(selectedNode.id, {
      data: {
        ...selectedNode.data,
        config: { ...selectedNode.data.config, [key]: value }
      }
    });
  };

  const handleDelete = () => {
    deleteNode(selectedNode.id);
  };

  const handleClose = () => {
    selectNode(null);
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Node Configuration</h2>
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Node Type
          </label>
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200 capitalize">
            {selectedNode.type}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Label *
          </label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={(e) => handleLabelChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {selectedNode.type === 'action' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Action Type *
            </label>
            <select
              value={selectedNode.data.config.actionType || ''}
              onChange={(e) => handleConfigChange('actionType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select action type</option>
              <option value="http">HTTP Request</option>
              <option value="email">Send Email</option>
              <option value="transform">Transform Data</option>
              <option value="delay">Delay</option>
            </select>
          </div>
        )}

        {selectedNode.type === 'condition' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Condition *
            </label>
            <input
              type="text"
              value={selectedNode.data.config.condition || ''}
              onChange={(e) => handleConfigChange('condition', e.target.value)}
              placeholder="e.g., value > 10"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {selectedNode.data.config.url !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL
            </label>
            <input
              type="text"
              value={selectedNode.data.config.url || ''}
              onChange={(e) => handleConfigChange('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {selectedNode.data.description && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedNode.data.description}</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleDelete}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
        >
          <Trash2 size={16} />
          Delete Node
        </button>
      </div>
    </div>
  );
};
