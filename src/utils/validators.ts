import type { WorkflowNode, WorkflowEdge, ValidationError } from '../types/workflow.types';
import { detectCycle } from './graphAlgorithms';

export const validateWorkflow = (nodes: WorkflowNode[], edges: WorkflowEdge[]): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Check for at least one trigger node
  const triggerNodes = nodes.filter(node => node.type === 'trigger');
  if (triggerNodes.length === 0) {
    errors.push({
      message: 'Workflow must have at least one trigger node',
      type: 'error'
    });
  }

  // Check for cycles
  if (detectCycle(nodes, edges)) {
    errors.push({
      message: 'Workflow contains circular dependencies',
      type: 'error'
    });
  }

  // Validate required fields for each node
  nodes.forEach(node => {
    if (!node.data.label || node.data.label.trim() === '') {
      errors.push({
        nodeId: node.id,
        message: `Node "${node.id}" is missing a label`,
        type: 'error'
      });
    }

    // Check if config has required fields based on node type
    const config = node.data.config;
    if (node.type === 'action' && !config.actionType) {
      errors.push({
        nodeId: node.id,
        message: `Action node "${node.data.label}" is missing action type`,
        type: 'error'
      });
    }

    if (node.type === 'condition' && !config.condition) {
      errors.push({
        nodeId: node.id,
        message: `Condition node "${node.data.label}" is missing condition`,
        type: 'error'
      });
    }
  });

  // Check for orphaned nodes (nodes with no connections)
  if (nodes.length > 1) {
    const connectedNodes = new Set<string>();
    edges.forEach(edge => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });

    nodes.forEach(node => {
      if (!connectedNodes.has(node.id) && node.type !== 'trigger') {
        errors.push({
          nodeId: node.id,
          message: `Node "${node.data.label}" is not connected`,
          type: 'warning'
        });
      }
    });
  }

  return errors;
};
