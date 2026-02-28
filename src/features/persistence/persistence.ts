import type { WorkflowState } from '../../types/workflow.types';

const STORAGE_KEY = 'workflow-builder-state';
const AUTO_SAVE_DELAY = 500;

let autoSaveTimeout: ReturnType<typeof setTimeout> | null = null;

export const saveWorkflow = (state: WorkflowState): void => {
  try {
    const serialized = JSON.stringify({
      ...state,
      timestamp: Date.now(),
      version: '1.0.0'
    });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save workflow:', error);
  }
};

export const loadWorkflow = (): WorkflowState | null => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return null;
    
    const data = JSON.parse(serialized);
    return {
      nodes: data.nodes || [],
      edges: data.edges || [],
      selectedNodeId: null
    };
  } catch (error) {
    console.error('Failed to load workflow:', error);
    return null;
  }
};

export const autoSaveWorkflow = (state: WorkflowState): void => {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout);
  }
  
  autoSaveTimeout = setTimeout(() => {
    saveWorkflow(state);
  }, AUTO_SAVE_DELAY);
};

export const exportWorkflow = (state: WorkflowState, filename: string = 'workflow.json'): void => {
  const data = {
    ...state,
    version: '1.0.0',
    exportedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const importWorkflow = (file: File): Promise<WorkflowState> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        const workflow: WorkflowState = {
          nodes: data.nodes || [],
          edges: data.edges || [],
          selectedNodeId: null
        };
        resolve(workflow);
      } catch (error) {
        reject(new Error('Invalid workflow file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const clearStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
