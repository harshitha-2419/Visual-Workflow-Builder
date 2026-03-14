import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Canvas } from './components/Canvas/Canvas';
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel';
import { Toolbar } from './components/common/Toolbar';
import { ExecutionPanel } from './components/common/ExecutionPanel';
import { Shape3DWorkflow } from './components/Canvas/Shape3DWorkflow';
import type { NodeTemplate } from './types/workflow.types';
import { useAutoSave, useLoadWorkflow, useKeyboardShortcuts } from './hooks/useWorkflow';

function App() {
  const [draggedTemplate, setDraggedTemplate] = useState<NodeTemplate | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [viewMode, setViewMode] = useState<'workflow' | '3d'>('workflow');

  useAutoSave();
  useLoadWorkflow();
  useKeyboardShortcuts();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleNodeDragStart = (template: NodeTemplate) => {
    setDraggedTemplate(template);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <Toolbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('workflow')}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'workflow' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Workflow
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === '3d' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            3D Shapes
          </button>
        </div>
      </div>
      
      {viewMode === 'workflow' ? (
        <>
          <div className="flex-1 flex overflow-hidden">
            <Sidebar onNodeDragStart={handleNodeDragStart} />
            <Canvas draggedTemplate={draggedTemplate} />
            <ConfigPanel />
          </div>
          <ExecutionPanel />
        </>
      ) : (
        <Shape3DWorkflow />
      )}
    </div>
  );
}

export default App;
