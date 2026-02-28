import { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
  type EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { WorkflowNode as WNode, WorkflowEdge as WEdge, NodeTemplate } from '../../types/workflow.types';
import { useWorkflowStore } from '../../store/workflowStore';
import { CustomNode } from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface CanvasProps {
  draggedTemplate: NodeTemplate | null;
}

export const Canvas: React.FC<CanvasProps> = ({ draggedTemplate }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { present, addNode, updateNodePosition, addEdge, deleteEdge, selectNode, currentExecutingNode } = useWorkflowStore();

  const nodes: Node[] = present.nodes.map(node => ({
    id: node.id,
    type: 'custom',
    position: node.position,
    data: {
      ...node.data,
      nodeType: node.type,
      isExecuting: currentExecutingNode === node.id,
      isSelected: present.selectedNodeId === node.id,
    },
  }));

  const edges: Edge[] = present.edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: currentExecutingNode === edge.source,
    style: { stroke: currentExecutingNode === edge.source ? '#3b82f6' : '#94a3b8' },
  }));

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    changes.forEach(change => {
      if (change.type === 'position' && change.position && !change.dragging) {
        updateNodePosition(change.id, change.position);
      }
    });
  }, [updateNodePosition]);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    changes.forEach(change => {
      if (change.type === 'remove') {
        deleteEdge(change.id);
      }
    });
  }, [deleteEdge]);

  const onConnect = useCallback((connection: Connection) => {
    if (connection.source && connection.target) {
      const newEdge: WEdge = {
        id: `e${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
      };
      addEdge(newEdge);
    }
  }, [addEdge]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    selectNode(node.id);
  }, [selectNode]);

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    if (!draggedTemplate || !reactFlowWrapper.current) return;

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left - 75,
      y: event.clientY - reactFlowBounds.top - 25,
    };

    const newNode: WNode = {
      id: `node-${Date.now()}`,
      type: draggedTemplate.type,
      position,
      data: {
        label: draggedTemplate.label,
        type: draggedTemplate.type,
        config: { ...draggedTemplate.defaultConfig },
        description: draggedTemplate.description,
      },
    };

    addNode(newNode);
  }, [draggedTemplate, addNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="flex-1 bg-gray-50 dark:bg-gray-800" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
