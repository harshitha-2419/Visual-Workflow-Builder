import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { CheckCircle, XCircle, Clock, Loader } from 'lucide-react';

export const ExecutionPanel: React.FC = () => {
  const { executionLogs, executing } = useWorkflowStore();

  if (executionLogs.length === 0 && !executing) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'error':
        return <XCircle size={16} className="text-red-500" />;
      case 'running':
        return <Loader size={16} className="text-blue-500 animate-spin" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 h-48 overflow-hidden flex flex-col">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Execution Logs</h3>
        {executing && (
          <span className="text-sm text-blue-500 flex items-center gap-2">
            <Loader size={14} className="animate-spin" />
            Running...
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
        {executionLogs.map((log, index) => (
          <div key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
            {getStatusIcon(log.status)}
            <span className="text-gray-500 dark:text-gray-500 text-xs">{formatTime(log.timestamp)}</span>
            <span className="flex-1">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
