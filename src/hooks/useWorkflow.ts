import { useEffect } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { autoSaveWorkflow, loadWorkflow } from '../features/persistence/persistence';

export const useAutoSave = () => {
  const { present } = useWorkflowStore();

  useEffect(() => {
    autoSaveWorkflow(present);
  }, [present]);
};

export const useLoadWorkflow = () => {
  const { loadWorkflow: loadToStore } = useWorkflowStore();

  useEffect(() => {
    const savedWorkflow = loadWorkflow();
    if (savedWorkflow) {
      loadToStore(savedWorkflow);
    }
  }, [loadToStore]);
};

export const useKeyboardShortcuts = () => {
  const { undo, redo } = useWorkflowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);
};
