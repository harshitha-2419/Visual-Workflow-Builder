import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Canvas } from './components/Canvas/Canvas';
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel';
import { Toolbar } from './components/common/Toolbar';
import { ExecutionPanel } from './components/common/ExecutionPanel';
import type { NodeTemplate } from './types/workflow.types';
import { useAutoSave, useLoadWorkflow, useKeyboardShortcuts } from './hooks/useWorkflow';

function App() {
  const [draggedTemplate, setDraggedTemplate] = useState<NodeTemplate | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

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
      <Toolbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar onNodeDragStart={handleNodeDragStart} />
        <Canvas draggedTemplate={draggedTemplate} />
        <ConfigPanel />
      </div>

      <ExecutionPanel />
    </div>
  );
}

export default App;
