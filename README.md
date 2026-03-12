# Visual Workflow Automation Builder

A powerful, frontend-only visual workflow automation builder built with React and TypeScript. Create, configure, validate, and simulate complex workflows entirely in your browser.

![Workflow Builder](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## 📸 Application Screenshots

### Workflow Execution View
![Workflow Execution](./screenshots/workflow-execution.png)
*Complete workflow with execution logs showing real-time processing. Features visible: Node Library (left), Canvas with connected nodes (center), MiniMap (bottom right), and Execution Logs panel (bottom) displaying timestamped execution steps.*

**Workflow Flow:**
```
Manual Trigger → HTTP Request → If/Else → Send Email → Transform Data → Delay → Filter
                                    ↓
                                 Switch
```

### Node Configuration Panel
![Node Configuration](./screenshots/node-configuration.png)
*Node Configuration panel showing condition node setup with validation success banner. Configure node properties including Label, Condition logic (isActive == true), and Description. Features Delete Node button for easy removal.*

**Visible Workflow:**
```
Manual Trigger → Fetch User Data → Check Status → Notify Admin → Format Response → Wait 2 Seconds → Active Users Only
                                       ↓
                                  Delay by Type
```

---

## 🚀 Features

### Core Functionality
- ✅ **Visual Workflow Designer**: Drag-and-drop interface for building workflows
- ✅ **10 Node Types**: Triggers, Actions, and Conditions
- ✅ **Real-time Validation**: Detect cycles, missing triggers, and configuration errors
- ✅ **Execution Simulation**: Step-by-step workflow execution with visual feedback
- ✅ **Undo/Redo**: Full history management (50 states) with keyboard shortcuts
- ✅ **Auto-save**: Automatic persistence to localStorage every 500ms
- ✅ **Import/Export**: Save and load workflows as JSON files
- ✅ **Dark Mode**: Professional theme switching
- ✅ **Execution Logs**: Real-time logs with timestamps and status

### Technical Highlights
- 🧠 **Graph Algorithms**: Topological sorting and cycle detection (DFS)
- 🔄 **State Management**: Zustand with immutable updates via Immer
- 🛡️ **Type Safety**: Strict TypeScript mode enabled
- ⚡ **Performance**: Optimized for 50+ nodes
- 🎨 **Modern UI**: Tailwind CSS with responsive design
- 📦 **No Backend**: Runs entirely in the browser

---

## 📋 Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js) or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 🛠️ Installation & Setup

### Step 1: Clone or Download
```bash
# Navigate to project directory
cd workflow-builder
```

### Step 2: Install Dependencies
```bash
npm install
```

**Core Dependencies Installed:**
- `react` (^19.2.0) - UI framework
- `react-dom` (^19.2.0) - React DOM rendering
- `reactflow` (^11.11.4) - Visual workflow canvas
- `zustand` (^5.0.11) - State management
- `immer` (^11.1.4) - Immutable state updates
- `lucide-react` (^0.575.0) - Icon library
- `tailwindcss` (^3.4.1) - CSS framework

### Step 3: Start Development Server
```bash
npm run dev
```

**Open in browser:** http://localhost:5173

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

**Build output:** `dist/` folder (~970KB)

---

## 🎮 Quick Start Guide

### 1. Create Your First Workflow

**Step 1:** Drag "Manual Trigger" from sidebar to canvas
![Step 1](./screenshots/step1-add-trigger.png)

**Step 2:** Drag "HTTP Request" below it
![Step 2](./screenshots/step2-add-action.png)

**Step 3:** Connect them (drag from bottom circle to top circle)
![Step 3](./screenshots/step3-connect.png)

**Step 4:** Click node to configure
![Step 4](./screenshots/step4-configure.png)

**Step 5:** Click "Validate" to check for errors
![Step 5](./screenshots/step5-validate.png)

**Step 6:** Click "Execute" to run!
![Step 6](./screenshots/step6-execute.png)

---

## 📦 Node Types (10 Total)

### 🟢 Triggers (3 types)
Start points for your workflow

| Node | Description | Icon |
|------|-------------|------|
| **Manual Trigger** | Start workflow manually | ▶️ |
| **Schedule Trigger** | Time-based execution | ⏰ |
| **Webhook Trigger** | HTTP endpoint trigger | 🔗 |

![Trigger Nodes](./screenshots/trigger-nodes.png)

### 🔵 Actions (4 types)
Operations that do work

| Node | Description | Icon |
|------|-------------|------|
| **HTTP Request** | Make API calls | 🌐 |
| **Send Email** | Email notifications | 📧 |
| **Transform Data** | Data manipulation | 🔄 |
| **Delay** | Wait/pause execution | ⏱️ |

![Action Nodes](./screenshots/action-nodes.png)

### 🟡 Conditions (3 types)
Decision points in your workflow

| Node | Description | Icon |
|------|-------------|------|
| **If/Else** | Binary decision | 🔀 |
| **Switch** | Multiple conditions | 🔱 |
| **Filter** | Data filtering | 🔍 |

![Condition Nodes](./screenshots/condition-nodes.png)

---

## 🎯 Example Workflows

### Example 1: Simple Data Processing
```
Manual Trigger → HTTP Request → Send Email
```
![Example 1](./screenshots/example1-simple.png)

### Example 2: Conditional Flow
```
Manual Trigger → HTTP Request → If/Else → Transform Data → Send Email
```
![Example 2](./screenshots/example2-conditional.png)

### Example 3: Complete Automation
```
Webhook Trigger → HTTP Request → If/Else → Transform → Email → Delay → HTTP Request
```
![Example 3](./screenshots/example3-complete.png)

---

## ✅ Validation Features

### What Gets Validated:

1. ✅ **At least one Trigger node** must exist
2. ✅ **No circular dependencies** (cycle detection)
3. ✅ **All required fields** must be filled
4. ✅ **Valid connections** between nodes
5. ⚠️ **Orphaned nodes** warning (not connected)

### Validation Examples:

**✅ Valid Workflow:**
![Valid Workflow](./screenshots/validation-success.png)

**❌ Missing Trigger:**
![Missing Trigger](./screenshots/validation-error-trigger.png)

**❌ Circular Dependency:**
![Circular Dependency](./screenshots/validation-error-cycle.png)

**❌ Empty Fields:**
![Empty Fields](./screenshots/validation-error-fields.png)

---

## 🎬 Execution Features

### Visual Feedback:
- 🔵 **Blue pulse animation** on currently executing node
- 🟣 **Purple animated lines** showing data flow
- ✅ **Green checkmarks** in logs for success
- ❌ **Red X marks** for errors
- ⏱️ **Timestamps** for each step

### Execution Timeline:
![Execution Timeline](./screenshots/execution-timeline.png)

### Execution Logs:
![Execution Logs](./screenshots/execution-logs.png)

**Features:**
- Real-time log updates
- Timestamps for each action
- Status icons (running/success/error)
- Scrollable log panel
- Close button to clear logs

---

## 🔄 Undo/Redo

### Keyboard Shortcuts:
- `Ctrl+Z` (Windows) / `Cmd+Z` (Mac): **Undo**
- `Ctrl+Y` (Windows) / `Cmd+Shift+Z` (Mac): **Redo**

### Features:
- ✅ Stores last 50 actions
- ✅ Works for all operations (add, delete, move, configure)
- ✅ Visual feedback in toolbar (buttons enable/disable)

![Undo Redo](./screenshots/undo-redo.png)

---

## 💾 Save & Load

### Auto-Save:
- ✅ Saves automatically every 500ms
- ✅ Persists to browser localStorage
- ✅ No data loss on refresh
- ✅ Works offline

### Export:
![Export](./screenshots/export.png)
- Downloads workflow as JSON file
- Includes version and timestamp
- Shareable with team

### Import:
![Import](./screenshots/import.png)
- Load previously exported workflows
- Validates JSON structure
- Restores all nodes and connections

---

## 🎨 Dark Mode

Toggle between light and dark themes with one click!

### Light Mode:
![Light Mode](./screenshots/light-mode.png)

### Dark Mode:
![Dark Mode](./screenshots/dark-mode-full.png)

**Features:**
- ✅ Smooth transitions
- ✅ Preference saved automatically
- ✅ All components themed
- ✅ Readable in both modes

---

## 🔍 Search & Filter

Search for nodes in the sidebar:

![Search](./screenshots/search.png)

**Features:**
- Real-time filtering
- Searches name and description
- Case-insensitive
- Clear button

---

## 🗺️ Canvas Controls

### Zoom & Pan:
![Canvas Controls](./screenshots/canvas-controls.png)

**Controls:**
- ➕ Zoom In
- ➖ Zoom Out
- 🎯 Fit View
- 🗺️ MiniMap (bottom right)

### MiniMap:
![MiniMap](./screenshots/minimap.png)

**Features:**
- 🟢 Green dots = Triggers
- 🔵 Blue dots = Actions
- 🟡 Yellow dots = Conditions
- Click and drag to navigate

---

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── Sidebar/        # Node library panel
│   ├── Canvas/         # Workflow canvas (ReactFlow)
│   ├── ConfigPanel/    # Node configuration
│   └── common/         # Toolbar, ExecutionPanel
├── features/           # Business logic
│   ├── workflow/       # Node templates
│   ├── validation/     # Validation engine
│   ├── execution/      # Execution simulator
│   └── persistence/    # Save/load logic
├── store/              # Zustand state management
├── types/              # TypeScript definitions
├── utils/              # Graph algorithms, validators
└── hooks/              # Custom React hooks
```

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Zustand** | State management |
| **ReactFlow** | Canvas & nodes |
| **Tailwind CSS** | Styling |
| **Immer** | Immutable updates |
| **Vite** | Build tool |

---

## 📊 Performance

- ✅ Optimized for **50+ nodes**
- ✅ Memoized components (React.memo)
- ✅ Efficient algorithms (O(V + E))
- ✅ Debounced auto-save
- ✅ Smooth animations (60fps)

---

## 🧪 Testing

### Manual Testing:
See `COMPLETE_TESTING_GUIDE.md` for detailed testing instructions.

**Tested Features:**
- ✅ All 10 node types
- ✅ Drag and drop
- ✅ Node connections
- ✅ Validation (5 scenarios)
- ✅ Execution simulation
- ✅ Undo/Redo
- ✅ Auto-save
- ✅ Import/Export
- ✅ Dark mode
- ✅ Search
- ✅ Canvas controls

---

## 🔒 Data Privacy

- ✅ **100% client-side** - No backend required
- ✅ **Local storage only** - Data never leaves your browser
- ✅ **No tracking** - No analytics or telemetry
- ✅ **Offline capable** - Works without internet

---

## 🐛 Known Limitations

- Maximum 50 undo/redo states
- localStorage limit (~5-10MB)
- Simulation only (no real API calls)
- Optimized for desktop (tablet works, mobile limited)

---

## 🚧 Future Enhancements

- [ ] Real backend integration
- [ ] Collaborative editing (WebSockets)
- [ ] Custom node creation UI
- [ ] Workflow templates library
- [ ] Advanced debugging tools
- [ ] Performance monitoring
- [ ] Version control system
- [ ] Plugin architecture

---

## 📝 License

MIT License - Free to use for learning or commercial purposes.

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

## 🙏 Acknowledgments

- **ReactFlow** - Excellent canvas library
- **Zustand** - Simple state management
- **Tailwind CSS** - Rapid styling
- **Lucide React** - Beautiful icons

---

## 📚 Documentation

- `README.md` - This file
- `COMPLETE_TESTING_GUIDE.md` - Detailed testing instructions with examples

---

**Built with ❤️ using React and TypeScript**

---

## 🎓 How to Take Screenshots

To add screenshots to this README:

1. **Create a `screenshots` folder** in the project root
2. **Take screenshots** of your application:
   - Main interface
   - Workflow creation
   - Node configuration
   - Validation examples
   - Execution with logs
   - Dark mode
   - All node types
3. **Save images** with descriptive names (e.g., `main-interface.png`)
4. **Images will automatically appear** in the README

### Recommended Screenshots:

```
screenshots/
├── main-interface.png          (Full app view)
├── workflow-creation.png       (Nodes connected)
├── node-configuration.png      (Config panel open)
├── validation-success.png      (Green banner)
├── validation-error-trigger.png (Red error)
├── validation-error-cycle.png  (Cycle error)
├── execution.png               (Node glowing blue)
├── execution-logs.png          (Logs panel)
├── dark-mode.png               (Dark theme)
├── light-mode.png              (Light theme)
├── trigger-nodes.png           (All 3 triggers)
├── action-nodes.png            (All 4 actions)
├── condition-nodes.png         (All 3 conditions)
├── minimap.png                 (Colored minimap)
├── search.png                  (Search in action)
└── canvas-controls.png         (Zoom controls)
```

### How to Take Screenshots:
1. Run `npm run dev`
2. Open http://localhost:5173
3. Use **Windows Snipping Tool** or **Mac Screenshot** (Cmd+Shift+4)
4. Save to `screenshots/` folder
5. Commit and push!
