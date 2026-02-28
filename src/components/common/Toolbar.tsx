import React, { useState, useRef } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { validateWorkflow } from '../../utils/validators';
import { ExecutionEngine } from '../../features/execution/executionEngine';
import { autoSaveWorkflow, exportWorkflow, importWorkflow } from '../../features/persistence/persistence';
import { Play, Square, Undo, Redo, Download, Upload, Moon, Sun, AlertCircle, CheckCircle } from 'lucide-react';

interface ToolbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const {
    present,
    undo,
    redo,
    past,
    future,
    executing,
    setExecuting,
    addExecutionLog,
    clearExecutionLogs,
    setCurrentExecutingNode,
    loadWorkflow,
  } = useWorkflowStore();

  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const executionEngineRef = useRef<ExecutionEngine | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleValidate = () => {
    const errors = validateWorkflow(present.nodes, present.edges);
    setValidationErrors(errors);
    setShowErrors(true);
    return errors.length === 0;
  };

  const handleExecute = async () => {
    if (!handleValidate()) return;

    setExecuting(true);
    clearExecutionLogs();

    const engine = new ExecutionEngine(
      present.nodes,
      present.edges,
      addExecutionLog,
      setCurrentExecutingNode
    );

    executionEngineRef.current = engine;
    await engine.execute();
    setExecuting(false);
    executionEngineRef.current = null;
  };

  const handleStop = () => {
    if (executionEngineRef.current) {
      executionEngineRef.current.stop();
      setExecuting(false);
      setCurrentExecutingNode(null);
    }
  };

  const handleExport = () => {
    exportWorkflow(present);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const workflow = await importWorkflow(file);
      loadWorkflow(workflow);
      autoSaveWorkflow(workflow);
    } catch (error) {
      alert('Failed to import workflow: ' + error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={executing ? handleStop : handleExecute}
            disabled={present.nodes.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white transition-colors ${
              executing
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
            }`}
          >
            {executing ? <Square size={16} /> : <Play size={16} />}
            {executing ? 'Stop' : 'Execute'}
          </button>

          <button
            onClick={handleValidate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            <AlertCircle size={16} />
            Validate
          </button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

          <button
            onClick={undo}
            disabled={past.length === 0}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
            title="Undo (Ctrl+Z)"
          >
            <Undo size={20} />
          </button>

          <button
            onClick={redo}
            disabled={future.length === 0}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
            title="Redo (Ctrl+Y)"
          >
            <Redo size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            disabled={present.nodes.length === 0}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            Export
          </button>

          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300"
          >
            <Upload size={16} />
            Import
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {showErrors && validationErrors.length > 0 && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-red-800 dark:text-red-200 mb-1">Validation Errors:</p>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error.message}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setShowErrors(false)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {showErrors && validationErrors.length === 0 && (
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <p className="text-green-800 dark:text-green-200">Workflow is valid!</p>
            <button
              onClick={() => setShowErrors(false)}
              className="ml-auto text-green-500 hover:text-green-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
