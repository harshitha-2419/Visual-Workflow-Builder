import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  addEdge, 
  Connection, 
  useNodesState, 
  useEdgesState,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './CustomNode';
import { Viewer3D } from './Viewer3D';
import { ShapeType } from '../../types/workflow.types';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Shape Selector', 
      nodeType: 'shape',
      selectedShape: undefined,
      onShapeSelect: () => {}
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 350, y: 100 },
    data: { 
      label: 'Size Control', 
      nodeType: 'size',
      dimensions: { width: 1, height: 1, count: 1 },
      onDimensionChange: () => {}
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
];

export const Shape3DWorkflow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [selectedShape, setSelectedShape] = useState<ShapeType | undefined>();
  const [dimensions, setDimensions] = useState({ width: 1, height: 1, count: 1 });

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleShapeSelect = useCallback((shape: ShapeType) => {
    setSelectedShape(shape);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === '1'
          ? { ...node, data: { ...node.data, selectedShape: shape } }
          : node
      )
    );
  }, [setNodes]);

  const handleDimensionChange = useCallback((dimension: 'width' | 'height' | 'count', value: number) => {
    setDimensions((prev) => ({ ...prev, [dimension]: value }));
    setNodes((nds) =>
      nds.map((node) =>
        node.id === '2'
          ? { ...node, data: { ...node.data, dimensions: { ...dimensions, [dimension]: value } } }
          : node
      )
    );
  }, [setNodes, dimensions]);

  // Update node callbacks
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          return { ...node, data: { ...node.data, onShapeSelect: handleShapeSelect } };
        }
        if (node.id === '2') {
          return { ...node, data: { ...node.data, onDimensionChange: handleDimensionChange } };
        }
        return node;
      })
    );
  }, [setNodes, handleShapeSelect, handleDimensionChange]);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50 dark:bg-gray-900"
        >
          <Controls className="dark:bg-gray-800 dark:border-gray-600" />
          <Background className="dark:opacity-20" />
        </ReactFlow>
      </div>
      
      <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-600 p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">3D Preview</h2>
        <Viewer3D 
          selectedShape={selectedShape}
          dimensions={dimensions}
          zoomLevel={1}
        />
        
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Current Settings:</h3>
          <div className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            <div>Shape: <span className="font-medium">{selectedShape || 'None selected'}</span></div>
            <div>Width: <span className="font-medium">{dimensions.width.toFixed(1)}</span></div>
            <div>Height: <span className="font-medium">{dimensions.height.toFixed(1)}</span></div>
            <div>Count: <span className="font-medium">{Math.round(dimensions.count)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};