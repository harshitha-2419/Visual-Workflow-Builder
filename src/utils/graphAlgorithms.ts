import type { WorkflowNode, WorkflowEdge } from '../types/workflow.types';

export const buildAdjacencyList = (nodes: WorkflowNode[], edges: WorkflowEdge[]): Map<string, string[]> => {
  const adjList = new Map<string, string[]>();
  nodes.forEach(node => adjList.set(node.id, []));
  edges.forEach(edge => {
    const neighbors = adjList.get(edge.source) || [];
    neighbors.push(edge.target);
    adjList.set(edge.source, neighbors);
  });
  return adjList;
};

export const detectCycle = (nodes: WorkflowNode[], edges: WorkflowEdge[]): boolean => {
  const adjList = buildAdjacencyList(nodes, edges);
  const visited = new Set<string>();
  const recStack = new Set<string>();

  const dfs = (nodeId: string): boolean => {
    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = adjList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) return true;
    }
  }

  return false;
};

export const topologicalSort = (nodes: WorkflowNode[], edges: WorkflowEdge[]): string[] | null => {
  if (detectCycle(nodes, edges)) return null;

  const adjList = buildAdjacencyList(nodes, edges);
  const inDegree = new Map<string, number>();
  
  nodes.forEach(node => inDegree.set(node.id, 0));
  edges.forEach(edge => {
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  });

  const queue: string[] = [];
  inDegree.forEach((degree, nodeId) => {
    if (degree === 0) queue.push(nodeId);
  });

  const result: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    const neighbors = adjList.get(current) || [];
    neighbors.forEach(neighbor => {
      const newDegree = (inDegree.get(neighbor) || 0) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(neighbor);
    });
  }

  return result.length === nodes.length ? result : null;
};
