# Demo Guide - Visual Workflow Automation Builder

## Quick Start

1. **Start the Application**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

2. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## Demo Walkthrough

### Step 1: Create Your First Workflow

1. **Add a Trigger Node**
   - Drag "Manual Trigger" from the sidebar to the canvas
   - This will be the starting point of your workflow

2. **Add Action Nodes**
   - Drag "HTTP Request" to the canvas
   - Drag "Send Email" below it
   - Drag "Delay" at the end

3. **Connect the Nodes**
   - Click and drag from the bottom circle of "Manual Trigger" to the top circle of "HTTP Request"
   - Connect "HTTP Request" to "Send Email"
   - Connect "Send Email" to "Delay"

### Step 2: Configure Nodes

1. **Click on the HTTP Request node**
   - The configuration panel opens on the right
   - Change the label to "Fetch User Data"
   - Select action type: "HTTP Request"
   - Add URL: "https://api.example.com/users"

2. **Click on the Send Email node**
   - Change label to "Notify Admin"
   - Select action type: "Send Email"

3. **Click on the Delay node**
   - Change label to "Wait 5 seconds"
   - Select action type: "Delay"

### Step 3: Validate the Workflow

1. Click the **"Validate"** button in the toolbar
2. If there are errors, they'll appear in a red banner
3. Fix any issues (missing required fields, cycles, etc.)
4. Validate again until you see "Workflow is valid!"

### Step 4: Execute the Workflow

1. Click the **"Execute"** button
2. Watch as each node lights up during execution
3. See the execution logs appear at the bottom
4. Each node will show:
   - Running status (blue, animated)
   - Success status (green checkmark in logs)
   - Timestamp of execution

### Step 5: Try Advanced Features

#### Undo/Redo
- Make changes to your workflow
- Press `Ctrl+Z` (or `Cmd+Z` on Mac) to undo
- Press `Ctrl+Y` (or `Cmd+Shift+Z` on Mac) to redo

#### Export Workflow
- Click "Export" button
- Save the JSON file to your computer
- Share it with team members

#### Import Workflow
- Click "Import" button
- Select a previously exported JSON file
- The workflow loads instantly

#### Dark Mode
- Click the moon/sun icon in the toolbar
- Toggle between light and dark themes
- Preference is saved automatically

### Step 6: Create a Complex Workflow

Try building this workflow:

```
Manual Trigger
    â
HTTP Request (Fetch Data)
    â
Condition (If/Else - Check if data exists)
    â                    â
Transform Data      Send Error Email
    â
Send Success Email
```

1. Add all nodes
2. Connect them as shown
3. Configure the condition node with: `data.length > 0`
4. Execute and watch the flow

## Common Scenarios

### Scenario 1: Data Processing Pipeline
```
Schedule Trigger (Every hour)
â HTTP Request (Fetch from API)
â Transform Data (Clean and format)
â HTTP Request (Send to database)
â Send Email (Success notification)
```

### Scenario 2: Conditional Workflow
```
Webhook Trigger
â Condition (Check user type)
  â Premium: Send Premium Email
  â Free: Send Free Email
```

### Scenario 3: Multi-Step Automation
```
Manual Trigger
â HTTP Request (Get user list)
â Filter (Active users only)
â Transform Data (Format for email)
â Send Email (Bulk notification)
â Delay (Wait 1 minute)
â HTTP Request (Log completion)
```

## Tips & Tricks

1. **Organize Your Canvas**
   - Drag nodes to arrange them neatly
   - Use the minimap (bottom right) to navigate large workflows
   - Zoom in/out using mouse wheel or controls

2. **Validation Best Practices**
   - Always start with a Trigger node
   - Avoid circular connections
   - Fill all required fields before executing

3. **Performance**
   - The app can handle 50+ nodes smoothly
   - Auto-save happens every 500ms
   - Workflows persist in browser localStorage

4. **Keyboard Shortcuts**
   - `Ctrl/Cmd + Z`: Undo
   - `Ctrl/Cmd + Y`: Redo
   - `Ctrl/Cmd + Shift + Z`: Redo (alternative)
   - Click canvas background to deselect nodes

## Troubleshooting

### Workflow Won't Execute
- Check validation errors
- Ensure at least one Trigger node exists
- Verify no circular dependencies

### Node Won't Connect
- Make sure you're dragging from output (bottom) to input (top)
- Check that the connection doesn't create a cycle

### Changes Not Saving
- Auto-save is enabled by default
- Check browser console for errors
- Try exporting manually as backup

## Video Demo Script (5-7 minutes)

**Minute 1: Introduction**
- Show the three-panel layout
- Explain Sidebar, Canvas, Config Panel

**Minute 2: Building a Workflow**
- Drag and drop nodes
- Connect them
- Show the visual feedback

**Minute 3: Configuration**
- Click nodes to configure
- Show different node types
- Explain required fields

**Minute 4: Validation & Execution**
- Validate the workflow
- Execute and show logs
- Highlight visual feedback

**Minute 5: Advanced Features**
- Undo/Redo demonstration
- Import/Export
- Dark mode toggle

**Minute 6: Complex Example**
- Build a conditional workflow
- Show branching logic
- Execute and explain flow

**Minute 7: Wrap-up**
- Mention auto-save
- Show performance with many nodes
- Highlight enterprise features

## Next Steps

- Explore all 10 node types
- Build your own automation workflows
- Export and share with your team
- Customize the code for your needs

---

**Enjoy building workflows!** 🚀
