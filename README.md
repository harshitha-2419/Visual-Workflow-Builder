# Visual Workflow Automation Builder

A powerful, frontend-only visual workflow automation builder built with React and TypeScript. Create, configure, validate, and simulate complex workflows entirely in your browser.

![Workflow Builder](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

### Core Functionality
- **Visual Workflow Designer**: Drag-and-drop interface for building workflows
- **Node Types**: Triggers, Actions, and Conditions
- **Real-time Validation**: Detect cycles, missing triggers, and configuration errors
- **Execution Simulation**: Step-by-step workflow execution with visual feedback
- **Undo/Redo**: Full history management with keyboard shortcuts
- **Auto-save**: Automatic persistence to localStorage
- **Import/Export**: Save and load workflows as JSON files

### Technical Highlights
- **Graph Algorithms**: Topological sorting and cycle detection
- **State Management**: Zustand with immutable updates
- **Type Safety**: Strict TypeScript mode
- **Performance**: Optimized for 50+ nodes
- **Dark Mode**: Full theme support
- **Responsive**: Works on desktop and tablet

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd workflow-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Preview production build
npm run preview
```

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── Sidebar/        # Node library panel
│   ├── Canvas/         # Workflow canvas (ReactFlow)
│   ├── ConfigPanel/    # Node configuration
│   └── common/         # Shared components
├── features/           # Business logic
│   ├── workflow/       # Workflow management
│   ├── validation/     # Validation engine
│   ├── execution/      # Execution simulator
│   └── persistence/    # Save/load logic
├── store/              # Zustand state management
├── types/              # TypeScript definitions
├── utils/              # Helper functions
└── hooks/              # Custom React hooks
```

### Key Technologies

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Zustand**: State management
- **ReactFlow**: Canvas and node rendering
- **Tailwind CSS**: Styling
- **Vitest**: Testing
- **Immer**: Immutable state updates

## 🎮 Usage

### Creating a Workflow

1. **Add Nodes**: Drag nodes from the sidebar to the canvas
2. **Connect Nodes**: Click and drag from one node's output to another's input
3. **Configure**: Click a node to edit its properties in the config panel
4. **Validate**: Click "Validate" to check for errors
5. **Execute**: Click "Execute" to simulate the workflow

### Node Types

#### Triggers (Start Points)
- Manual Trigger
- Schedule Trigger
- Webhook Trigger

#### Actions (Operations)
- HTTP Request
- Send Email
- Transform Data
- Delay

#### Conditions (Decision Points)
- If/Else
- Switch
- Filter

### Keyboard Shortcuts

- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y`: Redo
- `Ctrl/Cmd + Shift + Z`: Redo (alternative)

## 🧪 Testing

```bash
# Tests are configured but need setup
# The core algorithms have been manually tested
# Unit tests can be added using Vitest
```

### Manual Testing Checklist

- [x] Graph algorithms (topological sort, cycle detection)
- [x] Validation logic (trigger check, cycle detection, required fields)
- [x] State management (undo/redo, node operations)
- [x] Workflow operations (add, delete, update, connect)
- [x] Execution simulation
- [x] Import/Export functionality
- [x] Auto-save to localStorage
- [x] Dark mode toggle
- [x] Responsive layout

## 🎨 Customization

### Adding New Node Types

1. Add template to `src/features/workflow/nodeTemplates.ts`
2. Update validation logic in `src/utils/validators.ts`
3. Add execution logic in `src/features/execution/executionEngine.ts`

### Styling

The project uses Tailwind CSS. Customize colors and themes in `tailwind.config.js`.

## 📊 Performance

- Optimized for workflows with 50+ nodes
- Memoized components to prevent unnecessary re-renders
- Efficient graph algorithms (O(V + E) complexity)
- Debounced auto-save (500ms delay)

## 🔒 Data Privacy

All data is stored locally in your browser. No data is sent to external servers.

## 🐛 Known Limitations

- Maximum 50 undo/redo states
- localStorage has ~5-10MB limit
- No real API integrations (simulation only)

## 🚧 Future Enhancements

- [ ] Real backend integration
- [ ] Collaborative editing
- [ ] Version control
- [ ] Custom node creation
- [ ] Workflow templates
- [ ] Advanced debugging tools

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📧 Support

For issues and questions, please open an issue on GitHub.

## 🙏 Acknowledgments

- ReactFlow for the excellent canvas library
- Zustand for simple state management
- Tailwind CSS for rapid styling

---

Built with ❤️ using React and TypeScript
