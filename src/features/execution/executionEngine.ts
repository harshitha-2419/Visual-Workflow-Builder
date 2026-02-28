import type { WorkflowNode, WorkflowEdge, ExecutionLog } from '../../types/workflow.types';
import { topologicalSort } from '../../utils/graphAlgorithms';

export class ExecutionEngine {
  private nodes: WorkflowNode[];
  private edges: WorkflowEdge[];
  private onLog: (log: ExecutionLog) => void;
  private onNodeExecute: (nodeId: string | null) => void;
  private shouldStop: boolean = false;

  constructor(
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
    onLog: (log: ExecutionLog) => void,
    onNodeExecute: (nodeId: string | null) => void
  ) {
    this.nodes = nodes;
    this.edges = edges;
    this.onLog = onLog;
    this.onNodeExecute = onNodeExecute;
  }

  async execute(): Promise<void> {
    this.shouldStop = false;
    const sortedNodeIds = topologicalSort(this.nodes, this.edges);

    if (!sortedNodeIds) {
      this.onLog({
        nodeId: '',
        status: 'error',
        message: 'Cannot execute: workflow contains cycles',
        timestamp: Date.now()
      });
      return;
    }

    for (const nodeId of sortedNodeIds) {
      if (this.shouldStop) break;

      const node = this.nodes.find(n => n.id === nodeId);
      if (!node) continue;

      await this.executeNode(node);
    }

    this.onNodeExecute(null);
  }

  private async executeNode(node: WorkflowNode): Promise<void> {
    this.onNodeExecute(node.id);
    
    this.onLog({
      nodeId: node.id,
      status: 'running',
      message: `Executing ${node.type}: ${node.data.label}`,
      timestamp: Date.now()
    });

    // Simulate async execution
    await this.delay(1000);

    // Simulate execution logic based on node type
    try {
      switch (node.type) {
        case 'trigger':
          this.onLog({
            nodeId: node.id,
            status: 'success',
            message: `Trigger "${node.data.label}" activated`,
            timestamp: Date.now()
          });
          break;

        case 'action':
          const actionType = node.data.config.actionType || 'unknown';
          this.onLog({
            nodeId: node.id,
            status: 'success',
            message: `Action "${node.data.label}" completed (${actionType})`,
            timestamp: Date.now()
          });
          break;

        case 'condition':
          const condition = node.data.config.condition || 'true';
          this.onLog({
            nodeId: node.id,
            status: 'success',
            message: `Condition "${node.data.label}" evaluated (${condition})`,
            timestamp: Date.now()
          });
          break;
      }
    } catch (error) {
      this.onLog({
        nodeId: node.id,
        status: 'error',
        message: `Error executing ${node.data.label}: ${error}`,
        timestamp: Date.now()
      });
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stop(): void {
    this.shouldStop = true;
  }
}
