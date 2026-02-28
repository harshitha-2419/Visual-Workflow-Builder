# Architecture Documentation

## System Overview

The Visual Workflow Automation Builder is a frontend-only application that allows users to create, validate, and simulate workflow automations using a visual drag-and-drop interface.

## Architecture Principles

### 1. Separation of Concerns

The application is divided into distinct layers:

- **Presentation Layer**: React components for UI
- **State Management Layer**: Zustand store for application state
- **Business Logic Layer**: Features (validation, execution, persistence)
- **Utility Layer**: Pure functions for algorithms and helpers

### 2. Unidirectional Data Flow

```
User Action → Store Action → State Update → Component Re-render
```

### 3. Immutability

All state updates use Immer to ensure immutable data structures, preventing bugs and enabling time-travel debugging.

## Core Components

### State Management (Zustand)

**Store Structure:**
```typescript
{
  past: WorkflowState[]      // Undo history
  present: WorkflowState     // Current state
  future: WorkflowState[]    // Redo history
  executing: boolean         // Execution status
  executionLogs: Log[]       // Execution history
  currentExecutingNode: string | null
}
```

**Key Actions:**
- `addNode()`: Add new node to workflow
- `deleteNode()`: Remove node and connected edges
- `updateNode()`: Modify node properties
- `addEdge()`: Create connection between nodes
- `undo()`: Revert to previous state
- `redo()`: Move forward in history

### Graph Algorithms

#### Cycle Detection (DFS)
```
Time Complexity: O(V + E)
Space Complexity: O(V)

Algorithm:
1. Maintain visited and recursion stack sets
2. Perform DFS from each unvisited node
3. If we encounter a node in recursion stack, cycle exists
```

#### Topological Sort (Kahn's Algorithm)
```
Time Complexity: O(V + E)
Space Complexity: O(V)

Algorithm:
1. Calculate in-degree for each node
2. Add nodes with in-degree 0 to queue
3. Process queue, reducing in-degrees
4. If all nodes processed, return sorted order
5. Otherwise, cycle exists (return null)
```

### Validation Engine

**Validation Rules:**
1. At least one trigger node must exist
2. No circular dependencies in workflow
3. All required fields must be filled
4. Nodes should be connected (warning for orphans)

**Validation Flow:**
```
validateWorkflow()
  ├─> Check trigger nodes
  ├─> Detect cycles (DFS)
  ├─> Validate node configs
  └─> Check connections
```

### Execution Engine

**Execution Flow:**
```
1. Validate workflow
2. Topological sort to get execution order
3. For each node in order:
   a. Mark as executing
   b. Simulate async operation (1s delay)
   c. Log result
   d. Move to next node
4. Complete execution
```

**Execution States:**
- `pending`: Not yet executed
- `running`: Currently executing
- `success`: Completed successfully
- `error`: Failed during execution

### Persistence Layer

**Storage Strategy:**
- Primary: localStorage (simple, fast)
- Auto-save: Debounced 500ms after changes
- Format: JSON with metadata (version, timestamp)

**Data Structure:**
```json
{
  "nodes": [...],
  "edges": [...],
  "version": "1.0.0",
  "timestamp": 1234567890
}
```

## Component Hierarchy

```
App
├── Toolbar
│   ├── Execute/Stop Button
│   ├── Validate Button
│   ├── Undo/Redo Buttons
│   ├── Import/Export Buttons
│   └── Theme Toggle
├── Main Layout
│   ├── Sidebar (Node Library)
│   │   ├── Search Input
│   │   └── Node Templates
│   ├── Canvas (ReactFlow)
│   │   ├── Custom Nodes
│   │   ├── Edges
│   │   ├── Controls
│   │   └── MiniMap
│   └── ConfigPanel
│       ├── Node Properties
│       ├── Configuration Fields
│       └── Delete Button
└── ExecutionPanel
    └── Execution Logs
```

## Data Flow Examples

### Adding a Node

```
1. User drags node from Sidebar
2. onDrop event fires in Canvas
3. Canvas calls store.addNode()
4. Store updates state immutably:
   - Save current state to past[]
   - Add node to present.nodes
   - Clear future[]
5. Components re-render with new state
6. Auto-save triggers after 500ms
```

### Executing Workflow

```
1. User clicks Execute button
2. Toolbar validates workflow
3. If valid, creates ExecutionEngine
4. Engine performs topological sort
5. For each node:
   - Update currentExecutingNode
   - Add log entry
   - Simulate async work
   - Update log with result
6. Clear currentExecutingNode
7. Set executing = false
```

### Undo/Redo

```
Undo:
1. Pop last state from past[]
2. Push current state to future[]
3. Set popped state as present

Redo:
1. Pop first state from future[]
2. Push current state to past[]
3. Set popped state as present
```

## Performance Optimizations

### 1. Memoization
- React.memo for components that don't need frequent updates
- useMemo for expensive calculations
- useCallback for event handlers

### 2. Efficient Updates
- Only update node position on drag end (not during drag)
- Batch state updates when possible
- Debounce auto-save

### 3. Graph Algorithm Efficiency
- O(V + E) complexity for all graph operations
- Early termination in cycle detection
- Adjacency list representation for fast lookups

### 4. History Management
- Limit undo history to 50 states
- Store only necessary data in history
- Use structural sharing via Immer

## Security Considerations

### 1. Input Validation
- Sanitize user inputs
- Validate JSON imports
- Check file types on import

### 2. XSS Prevention
- React's built-in XSS protection
- No dangerouslySetInnerHTML usage
- Sanitize any dynamic content

### 3. Data Privacy
- All data stored locally
- No external API calls
- No telemetry or tracking

## Testing Strategy

### Unit Tests
- Graph algorithms (cycle detection, topological sort)
- Validation functions
- State management actions
- Utility functions

### Integration Tests
- Workflow creation flow
- Execution simulation
- Import/export functionality

### Manual Testing
- UI interactions
- Drag and drop
- Theme switching
- Responsive behavior

## Scalability

### Current Limits
- 50+ nodes: Tested and optimized
- 100+ nodes: Should work but may slow down
- 500+ nodes: Not recommended (browser limitations)

### Scaling Strategies
- Virtualization for large node lists
- Web Workers for heavy computations
- IndexedDB for larger workflows
- Canvas optimization (viewport culling)

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Architecture Improvements

1. **Plugin System**: Allow custom node types
2. **Backend Integration**: Optional server sync
3. **Real-time Collaboration**: WebSocket support
4. **Advanced Debugging**: Breakpoints, step-through
5. **Performance Monitoring**: Built-in profiling

## Conclusion

This architecture provides a solid foundation for a scalable, maintainable workflow automation builder. The clear separation of concerns, efficient algorithms, and robust state management ensure the application can handle complex workflows while remaining performant and user-friendly.
