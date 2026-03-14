export type NodeType = 'trigger' | 'action' | 'condition' | 'shape' | 'size' | 'zoom';

export type ShapeType = 'cube' | 'sphere' | 'cylinder' | 'cone' | 'torus';

export interface NodeData {
  label: string;
  type: NodeType;
  config: Record<string, any>;
  description?: string;
  selectedShape?: ShapeType;
  dimensions?: { width: number; height: number; count: number };
  zoomLevel?: number;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: NodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
}

export interface ValidationError {
  nodeId?: string;
  message: string;
  type: 'error' | 'warning';
}

export interface ExecutionLog {
  nodeId: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message: string;
  timestamp: number;
}

export interface WorkflowHistory {
  past: WorkflowState[];
  present: WorkflowState;
  future: WorkflowState[];
}

export interface NodeTemplate {
  type: NodeType;
  label: string;
  description: string;
  icon: string;
  defaultConfig: Record<string, any>;
}
