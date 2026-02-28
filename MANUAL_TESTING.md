# Manual Testing Guide - Step by Step

## 🚀 Getting Started

### Start the Application
```bash
cd workflow-builder
npm run dev
```
Open: http://localhost:5173

---

## ✅ Test 1: Basic Workflow Creation

### Steps:
1. **Drag "Manual Trigger"** from left sidebar to canvas
2. **Drag "HTTP Request"** below it
3. **Connect them**: Click bottom circle of trigger → drag to top circle of HTTP Request
4. You should see a line connecting them

### Expected Result:
✅ Nodes appear on canvas
✅ Connection line is visible
✅ Nodes can be moved by dragging

---

## ✅ Test 2: Node Configuration

### Steps:
1. **Click on "HTTP Request" node**
2. Right panel opens with configuration
3. Change label to: `Fetch User Data`
4. Select Action Type: `HTTP Request`
5. Enter URL: `https://api.example.com/users`
6. Click on canvas background to deselect

### Expected Result:
✅ Config panel shows on right
✅ Changes are saved automatically
✅ Node label updates on canvas

---

## ✅ Test 3: Validation - Missing Trigger

### Steps:
1. **Delete the trigger node**: Click trigger → click "Delete Node" in config panel
2. **Click "Validate" button** in toolbar
3. Red error banner appears

### Expected Result:
✅ Error: "Workflow must have at least one trigger node"
✅ Red banner shows at top

---

## ✅ Test 4: Validation - Circular Dependency

### Steps:
1. Add back a trigger node
2. Add two action nodes: "Action 1" and "Action 2"
3. Connect: Trigger → Action 1 → Action 2
4. **Now connect Action 2 back to Action 1** (creates a cycle)
5. Click "Validate"

### Expected Result:
✅ Error: "Workflow contains circular dependencies"
✅ Validation fails

---

## ✅ Test 5: Valid Workflow Execution

### Steps:
1. **Create this workflow:**
   ```
   Manual Trigger
        ↓
   HTTP Request (label: "Fetch Data")
        ↓
   Send Email (label: "Notify Admin")
        ↓
   Delay (label: "Wait 1 second")
   ```

2. **Configure each node:**
   - HTTP Request: actionType = "http"
   - Send Email: actionType = "email"
   - Delay: actionType = "delay"

3. **Click "Validate"** → Should show "Workflow is valid!"

4. **Click "Execute"** button

### Expected Result:
✅ Each node lights up with blue pulse animation (one by one)
✅ Execution logs appear at bottom showing:
   - "Executing trigger: Manual Trigger"
   - "Trigger 'Manual Trigger' activated"
   - "Executing action: Fetch Data"
   - "Action 'Fetch Data' completed (http)"
   - etc.
✅ Each step takes ~1 second
✅ All logs show green checkmarks

---

## ✅ Test 6: Undo/Redo

### Steps:
1. Add a new node to canvas
2. **Press Ctrl+Z** (or Cmd+Z on Mac)
3. Node disappears
4. **Press Ctrl+Y** (or Cmd+Shift+Z)
5. Node reappears

### Expected Result:
✅ Undo removes the node
✅ Redo brings it back
✅ Can undo multiple times (up to 50 actions)

---

## ✅ Test 7: Export Workflow

### Steps:
1. Create a workflow with 3-4 nodes
2. **Click "Export" button** in toolbar
3. Save the JSON file (e.g., `my-workflow.json`)
4. Open the file in a text editor

### Expected Result:
✅ JSON file downloads
✅ Contains nodes array with all your nodes
✅ Contains edges array with connections
✅ Has version and timestamp metadata

---

## ✅ Test 8: Import Workflow

### Steps:
1. **Click "Import" button**
2. Select the JSON file you exported
3. Workflow loads on canvas

### Expected Result:
✅ All nodes appear in correct positions
✅ All connections are restored
✅ Node configurations are preserved

---

## ✅ Test 9: Auto-Save

### Steps:
1. Create a workflow
2. **Close the browser tab** (don't export)
3. **Reopen** http://localhost:5173
4. Your workflow is still there!

### Expected Result:
✅ Workflow persists automatically
✅ No data loss on refresh
✅ Saves every 500ms after changes

---

## ✅ Test 10: Dark Mode

### Steps:
1. **Click the moon icon** in toolbar (top right)
2. Interface switches to dark theme
3. **Click sun icon** to switch back

### Expected Result:
✅ Dark background appears
✅ Text remains readable
✅ Preference is saved (persists on refresh)

---

## ✅ Test 11: Complex Workflow with Conditions

### Steps:
1. **Create this workflow:**
   ```
   Manual Trigger
        ↓
   HTTP Request
        ↓
   If/Else Condition
        ↓
   Send Email
   ```

2. **Configure the condition node:**
   - Click on "If/Else" node
   - Set condition: `status == 200`

3. **Validate and Execute**

### Expected Result:
✅ Condition node executes
✅ Logs show: "Condition 'If/Else' evaluated"
✅ Workflow completes successfully

---

## ✅ Test 12: Multiple Node Types

### Steps:
Test each node type from sidebar:

**Triggers:**
- Manual Trigger ✓
- Schedule Trigger ✓
- Webhook Trigger ✓

**Actions:**
- HTTP Request ✓
- Send Email ✓
- Transform Data ✓
- Delay ✓

**Conditions:**
- If/Else ✓
- Switch ✓
- Filter ✓

### Expected Result:
✅ All 10 node types can be added
✅ Each has unique icon and color
✅ All can be configured

---

## ✅ Test 13: Search Functionality

### Steps:
1. In the sidebar, type "email" in search box
2. Only "Send Email" node shows
3. Clear search
4. All nodes appear again

### Expected Result:
✅ Search filters nodes in real-time
✅ Matches both name and description
✅ Case-insensitive search

---

## ✅ Test 14: Canvas Controls

### Steps:
1. **Zoom In**: Click + button (bottom left)
2. **Zoom Out**: Click - button
3. **Fit View**: Click fit button
4. **Use Minimap**: Click and drag in minimap (bottom right)

### Expected Result:
✅ Canvas zooms smoothly
✅ Minimap shows overview
✅ Can navigate large workflows

---

## ✅ Test 15: Delete Connections

### Steps:
1. Create two connected nodes
2. **Click on the connection line** (edge)
3. **Press Delete key** or click the × button
4. Connection disappears

### Expected Result:
✅ Edge can be selected
✅ Edge can be deleted
✅ Nodes remain intact

---

## ✅ Test 16: Validation - Empty Label

### Steps:
1. Add a node
2. Click on it
3. **Clear the label field** (make it empty)
4. Click "Validate"

### Expected Result:
✅ Error: "Node is missing a label"
✅ Validation fails

---

## ✅ Test 17: Validation - Missing Config

### Steps:
1. Add an "HTTP Request" action node
2. **Don't set the Action Type** (leave it empty)
3. Click "Validate"

### Expected Result:
✅ Error: "Action node is missing action type"
✅ Validation fails

---

## ✅ Test 18: Stop Execution

### Steps:
1. Create a workflow with 5+ nodes
2. Click "Execute"
3. **While it's running**, click "Stop" button
4. Execution halts

### Expected Result:
✅ Execution stops immediately
✅ Logs show partial completion
✅ No errors thrown

---

## ✅ Test 19: Large Workflow Performance

### Steps:
1. Add 20+ nodes to canvas
2. Connect them in a chain
3. Move nodes around
4. Execute the workflow

### Expected Result:
✅ Canvas remains responsive
✅ No lag when dragging
✅ Execution completes successfully
✅ All animations smooth

---

## ✅ Test 20: Keyboard Shortcuts

### Test all shortcuts:
- `Ctrl+Z` → Undo ✓
- `Ctrl+Y` → Redo ✓
- `Ctrl+Shift+Z` → Redo (alternative) ✓
- Click canvas background → Deselect node ✓

### Expected Result:
✅ All shortcuts work
✅ No conflicts with browser shortcuts

---

## 🎯 Complete Test Scenario

### Build a Real Workflow:

```
1. Manual Trigger
   ↓
2. HTTP Request (Fetch user data)
   ↓
3. If/Else Condition (Check if data exists)
   ↓
4. Transform Data (Format response)
   ↓
5. Send Email (Notify success)
   ↓
6. Delay (Wait 2 seconds)
   ↓
7. HTTP Request (Log completion)
```

**Steps:**
1. Add all 7 nodes
2. Connect them in order
3. Configure each node properly
4. Validate (should pass)
5. Execute and watch
6. Export the workflow
7. Clear canvas (delete all)
8. Import the workflow back
9. Execute again

### Expected Result:
✅ Complete workflow works end-to-end
✅ All features demonstrated
✅ No errors or crashes

---

## 🐛 Common Issues to Test

### Issue 1: Can't connect nodes
**Cause:** Trying to create a cycle
**Solution:** Remove existing connection first

### Issue 2: Validation fails
**Cause:** Missing trigger or empty fields
**Solution:** Add trigger and fill required fields

### Issue 3: Execution doesn't start
**Cause:** Validation errors
**Solution:** Click "Validate" to see errors

---

## ✅ Final Checklist

- [ ] All 10 node types work
- [ ] Drag and drop works
- [ ] Connections work
- [ ] Validation works (all rules)
- [ ] Execution works with visual feedback
- [ ] Undo/Redo works
- [ ] Auto-save works
- [ ] Import/Export works
- [ ] Dark mode works
- [ ] Search works
- [ ] Canvas controls work
- [ ] Keyboard shortcuts work
- [ ] No console errors
- [ ] Responsive on different screen sizes

---

## 🎉 Success Criteria

If all tests pass:
✅ Application is fully functional
✅ All requirements met
✅ Ready for production use

**Congratulations! Your workflow builder is working perfectly!** 🚀
