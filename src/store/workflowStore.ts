import { create } from 'zustand';
import type { WorkflowNode, WorkflowEdge, WorkflowState, WorkflowHistory, ExecutionLog } from '../types/workflow.types';
import { produce } from 'immer';

interface WorkflowStore extends WorkflowHistory {
  executing: boolean;
  executionLogs: ExecutionLog[];
  currentExecutingNode: string | null;
  
  // Actions
  addNode: (node: WorkflowNode) => void;
  deleteNode: (nodeId: string) => void;
  updateNode: (nodeId: string, updates: Partial<WorkflowNode>) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  addEdge: (edge: WorkflowEdge) => void;
  deleteEdge: (edgeId: string) => void;
  selectNode: (nodeId: string | null) => void;
  
  // History
  undo: () => void;
  redo: () => void;
  
  // Execution
  setExecuting: (executing: boolean) => void;
  addExecutionLog: (log: ExecutionLog) => void;
  clearExecutionLogs: () => void;
  setCurrentExecutingNode: (nodeId: string | null) => void;
  
  // Persistence
  loadWorkflow: (state: WorkflowState) => void;
  clearWorkflow: () => void;
}

const initialState: WorkflowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
};

const saveToHistory = (
  past: WorkflowState[],
  present: WorkflowState
): WorkflowState[] => {
  const newPast = [...past, present];
  return newPast.slice(-50); // Keep last 50 states
};

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  past: [],
  present: initialState,
  future: [],
  executing: false,
  executionLogs: [],
  currentExecutingNode: null,

  addNode: (node) => set(produce((state: WorkflowStore) => {
    state.past = saveToHistory(state.past, state.present);
    state.present.nodes.push(node);
    state.future = [];
  })),

  deleteNode: (nodeId) => set(produce((state: WorkflowStore) => {
    state.past = saveToHistory(state.past, state.present);
    state.present.nodes = state.present.nodes.filter(n => n.id !== nodeId);
    state.present.edges = state.present.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
    if (state.present.selectedNodeId === nodeId) {
      state.present.selectedNodeId = null;
    }
    state.future = [];
  })),

  updateNode: (nodeId, updates) => set(produce((state: WorkflowStore) => {
    state.past = saveToHistory(state.past, state.present);
    const node = state.present.nodes.find(n => n.id === nodeId);
    if (node) {
      Object.assign(node, updates);
    }
    state.future = [];
  })),

  updateNodePosition: (nodeId, position) => set(produce((state: WorkflowStore) => {
    const node = state.present.nodes.find(n => n.id === nodeId);
    if (node) {
      node.position = position;
    }
  })),

  addEdge: (edge) => set(produce((state: WorkflowStore) => {
    state.past = saveToHistory(state.past, state.present);
    state.present.edges.push(edge);
    state.future = [];
  })),

  deleteEdge: (edgeId) => set(produce((state: WorkflowStore) => {
    state.past = saveToHistory(state.past, state.present);
    state.present.edges = state.present.edges.filter(e => e.id !== edgeId);
    state.future = [];
  })),

  selectNode: (nodeId) => set(produce((state: WorkflowStore) => {
    state.present.selectedNodeId = nodeId;
  })),

  undo: () => set(produce((state: WorkflowStore) => {
    if (state.past.length === 0) return;
    const previous = state.past[state.past.length - 1];
    state.past = state.past.slice(0, -1);
    state.future = [state.present, ...state.future];
    state.present = previous;
  })),

  redo: () => set(produce((state: WorkflowStore) => {
    if (state.future.length === 0) return;
    const next = state.future[0];
    state.future = state.future.slice(1);
    state.past = [...state.past, state.present];
    state.present = next;
  })),

  setExecuting: (executing) => set({ executing }),

  addExecutionLog: (log) => set(produce((state: WorkflowStore) => {
    state.executionLogs.push(log);
  })),

  clearExecutionLogs: () => set({ executionLogs: [] }),

  setCurrentExecutingNode: (nodeId) => set({ currentExecutingNode: nodeId }),

  loadWorkflow: (workflowState) => set(produce((state: WorkflowStore) => {
    state.past = [];
    state.present = workflowState;
    state.future = [];
  })),

  clearWorkflow: () => set(produce((state: WorkflowStore) => {
    state.past = [];
    state.present = initialState;
    state.future = [];
    state.executionLogs = [];
    state.currentExecutingNode = null;
  })),
}));
