# Complete Manual Testing Guide - Your Mentor Guide 🎓

## 🚀 Step 0: Start the Application

```bash
cd workflow-builder
npm run dev
```

Open: **http://localhost:5173**

You should see:
- ✅ Left sidebar with 10 node types
- ✅ Center canvas (gray background with dots)
- ✅ Right panel says "Select a node to configure"
- ✅ Top toolbar with buttons

---

## 📝 Test 1: TRIGGER NODES (3 types)

### 1.1 Manual Trigger

**Steps:**
1. Find "Manual Trigger" in left sidebar (green box)
2. **Drag it** to the center of canvas
3. **Drop it** - you should see a green node appear
4. **Click on the node**
5. Right panel opens showing:
   - Node Type: trigger
   - Label: Manual Trigger
   - Delete Node button

**What to check:**
- ✅ Node appears on canvas
- ✅ Node is green colored
- ✅ Has a play icon
- ✅ Can be moved by dragging
- ✅ Config panel opens when clicked

---

### 1.2 Schedule Trigger

**Steps:**
1. Drag "Schedule Trigger" to canvas
2. Click on it
3. In config panel, you'll see:
   - Label: Schedule Trigger
   - Type: trigger

**What to check:**
- ✅ Another green node appears
- ✅ Has clock icon
- ✅ Different from Manual Trigger

---

### 1.3 Webhook Trigger

**Steps:**
1. Drag "Webhook Trigger" to canvas
2. Click on it
3. Config panel shows webhook details

**What to check:**
- ✅ Green node with webhook icon
- ✅ Can configure independently

---

## 🔧 Test 2: ACTION NODES (4 types)

### 2.1 HTTP Request

**Steps:**
1. Drag "HTTP Request" from sidebar
2. Drop it below Manual Trigger
3. **Connect them:**
   - Click the **bottom circle** of Manual Trigger
   - Drag to the **top circle** of HTTP Request
   - Release - you'll see a **purple line** connecting them
4. Click HTTP Request node
5. In config panel:
   - Change label to: `Fetch User Data`
   - Action Type dropdown: Select "HTTP Request"
   - URL field appears: Enter `https://api.example.com/users`

**What to check:**
- ✅ Blue colored node
- ✅ Purple connection line visible (3px thick)
- ✅ Arrow at the end of line
- ✅ Config panel shows action-specific fields
- ✅ Label updates on canvas

---

### 2.2 Send Email

**Steps:**
1. Drag "Send Email" below HTTP Request
2. Connect: HTTP Request → Send Email
3. Click Send Email node
4. Configure:
   - Label: `Notify Admin`
   - Action Type: "Send Email"

**What to check:**
- ✅ Blue node with mail icon
- ✅ Two purple lines now (trigger→http, http→email)
- ✅ All connections visible

---

### 2.3 Transform Data

**Steps:**
1. Drag "Transform Data" to canvas
2. Connect: Send Email → Transform Data
3. Configure:
   - Label: `Format Response`
   - Action Type: "Transform Data"

**What to check:**
- ✅ Blue node with shuffle icon
- ✅ Chain of 4 nodes connected

---

### 2.4 Delay

**Steps:**
1. Drag "Delay" to canvas
2. Connect: Transform Data → Delay
3. Configure:
   - Label: `Wait 2 Seconds`
   - Action Type: "Delay"

**What to check:**
- ✅ Blue node with timer icon
- ✅ Complete chain: Trigger → HTTP → Email → Transform → Delay

---

## ⚡ Test 3: CONDITION NODES (3 types)

### 3.1 If/Else

**Steps:**
1. Drag "If/Else" to canvas
2. Place it between HTTP Request and Send Email
3. **Reconnect:**
   - Delete the HTTP→Email connection (click line, press Delete)
   - Connect: HTTP Request → If/Else
   - Connect: If/Else → Send Email
4. Click If/Else node
5. Configure:
   - Label: `Check Status`
   - Condition: `status == 200`

**What to check:**
- ✅ Yellow colored node
- ✅ Branch icon
- ✅ Condition field appears
- ✅ Can insert in middle of workflow

---

### 3.2 Switch

**Steps:**
1. Drag "Switch" to canvas (separate from main workflow)
2. Click it
3. Configure:
   - Label: `Route by Type`
   - Condition: `userType`

**What to check:**
- ✅ Yellow node with split icon
- ✅ Independent node (not connected yet)

---

### 3.3 Filter

**Steps:**
1. Drag "Filter" to canvas
2. Configure:
   - Label: `Active Users Only`
   - Condition: `isActive == true`

**What to check:**
- ✅ Yellow node with filter icon
- ✅ All 10 node types now on canvas

---

## ✅ Test 4: VALIDATION

### 4.1 Valid Workflow

**Current workflow:**
```
Manual Trigger → HTTP Request → If/Else → Send Email → Transform Data → Delay
```

**Steps:**
1. Click **"Validate"** button (top toolbar)
2. Green banner appears: "Workflow is valid!"

**What to check:**
- ✅ Green success message
- ✅ No errors shown
- ✅ Can dismiss message

---

### 4.2 Missing Trigger Error

**Steps:**
1. Click Manual Trigger node
2. Click **"Delete Node"** in config panel
3. Click **"Validate"**
4. Red error banner: "Workflow must have at least one trigger node"

**What to check:**
- ✅ Red error banner
- ✅ Clear error message
- ✅ Validation fails

**Fix it:**
- Drag a new Manual Trigger
- Connect it to HTTP Request
- Validate again → Should pass

---

### 4.3 Circular Dependency Error

**Steps:**
1. Create a cycle:
   - Connect: Delay → HTTP Request (creates a loop)
2. Click **"Validate"**
3. Error: "Workflow contains circular dependencies"

**What to check:**
- ✅ Detects cycles
- ✅ Shows error
- ✅ Prevents execution

**Fix it:**
- Delete the Delay → HTTP Request connection
- Validate → Should pass

---

### 4.4 Empty Label Error

**Steps:**
1. Click any node
2. Clear the label field (make it empty)
3. Click **"Validate"**
4. Error: "Node is missing a label"

**What to check:**
- ✅ Validates required fields
- ✅ Shows specific error

**Fix it:**
- Add label back
- Validate → Should pass

---

### 4.5 Missing Action Type Error

**Steps:**
1. Click HTTP Request node
2. Change Action Type to empty/blank
3. Click **"Validate"**
4. Error: "Action node is missing action type"

**What to check:**
- ✅ Validates node-specific fields
- ✅ Clear error message

**Fix it:**
- Select "HTTP Request" in Action Type
- Validate → Should pass

---

## 🎬 Test 5: EXECUTION

### 5.1 Execute Valid Workflow

**Make sure you have:**
```
Manual Trigger → HTTP Request → Send Email → Delay
```

**Steps:**
1. Click **"Execute"** button
2. Watch the magic! 🎉

**What happens:**
- ⏱️ Second 1: Manual Trigger lights up (blue pulse)
  - Log: "Executing trigger: Manual Trigger"
  - Log: "Trigger 'Manual Trigger' activated" ✅
  
- ⏱️ Second 2: HTTP Request lights up
  - Log: "Executing action: HTTP Request"
  - Log: "Action 'HTTP Request' completed (http)" ✅
  
- ⏱️ Second 3: Send Email lights up
  - Log: "Executing action: Send Email"
  - Log: "Action 'Send Email' completed (email)" ✅
  
- ⏱️ Second 4: Delay lights up
  - Log: "Executing action: Delay"
  - Log: "Action 'Delay' completed (delay)" ✅

**What to check:**
- ✅ Each node pulses blue when executing
- ✅ Execution logs appear at bottom
- ✅ Green checkmarks in logs
- ✅ Timestamps shown
- ✅ Takes ~1 second per node
- ✅ Executes in correct order

---

### 5.2 Stop Execution

**Steps:**
1. Create a workflow with 5+ nodes
2. Click **"Execute"**
3. While running, click **"Stop"** button
4. Execution halts immediately

**What to check:**
- ✅ Stops mid-execution
- ✅ Partial logs shown
- ✅ No errors

---

## 🔄 Test 6: UNDO/REDO

### 6.1 Undo

**Steps:**
1. Add a new node to canvas
2. Press **Ctrl+Z** (Windows) or **Cmd+Z** (Mac)
3. Node disappears

**What to check:**
- ✅ Last action reversed
- ✅ Node removed from canvas

---

### 6.2 Redo

**Steps:**
1. After undo, press **Ctrl+Y** or **Cmd+Shift+Z**
2. Node reappears

**What to check:**
- ✅ Action restored
- ✅ Node back on canvas

---

### 6.3 Multiple Undo

**Steps:**
1. Add 3 nodes
2. Press Ctrl+Z three times
3. All 3 nodes disappear

**What to check:**
- ✅ Can undo multiple times
- ✅ History works correctly

---

## 💾 Test 7: SAVE/LOAD

### 7.1 Auto-Save

**Steps:**
1. Create a workflow
2. **Close the browser tab** (don't export)
3. **Reopen** http://localhost:5173
4. Your workflow is still there!

**What to check:**
- ✅ Workflow persists
- ✅ All nodes restored
- ✅ All connections restored
- ✅ No data loss

---

### 7.2 Export

**Steps:**
1. Create a workflow with 4-5 nodes
2. Click **"Export"** button
3. File downloads: `workflow.json`
4. Open file in text editor

**What to check:**
- ✅ JSON file downloads
- ✅ Contains "nodes" array
- ✅ Contains "edges" array
- ✅ Has version and timestamp

---

### 7.3 Import

**Steps:**
1. Delete all nodes from canvas
2. Click **"Import"** button
3. Select the `workflow.json` file
4. Workflow loads

**What to check:**
- ✅ All nodes appear
- ✅ Correct positions
- ✅ All connections restored
- ✅ Configurations preserved

---

## 🎨 Test 8: DARK MODE

**Steps:**
1. Click **moon icon** (top right)
2. Interface turns dark
3. Click **sun icon**
4. Back to light mode

**What to check:**
- ✅ Dark background
- ✅ Text readable
- ✅ Nodes visible
- ✅ Edges visible
- ✅ Preference saved (refresh page, still dark)

---

## 🔍 Test 9: SEARCH

**Steps:**
1. In sidebar search box, type: `email`
2. Only "Send Email" shows
3. Type: `trigger`
4. All 3 trigger nodes show
5. Clear search
6. All 10 nodes show

**What to check:**
- ✅ Real-time filtering
- ✅ Searches name and description
- ✅ Case-insensitive

---

## 🎯 Test 10: CANVAS CONTROLS

### 10.1 Zoom

**Steps:**
1. Click **+** button (bottom left)
2. Canvas zooms in
3. Click **-** button
4. Canvas zooms out
5. Click **fit view** button
6. Workflow centers

**What to check:**
- ✅ Smooth zoom
- ✅ Nodes scale properly
- ✅ Fit view works

---

### 10.2 MiniMap

**Steps:**
1. Look at bottom right corner
2. See minimap with colored dots:
   - Green = Triggers
   - Blue = Actions
   - Yellow = Conditions
3. Click and drag in minimap
4. Canvas moves

**What to check:**
- ✅ Minimap shows all nodes
- ✅ Colors match node types
- ✅ Can navigate with minimap

---

## 🏆 FINAL TEST: Complete Workflow

### Build This Workflow:

```
1. Manual Trigger
   ↓
2. HTTP Request (Fetch user data)
   ↓
3. If/Else (Check if data exists)
   ↓
4. Transform Data (Format response)
   ↓
5. Send Email (Notify success)
   ↓
6. Delay (Wait 2 seconds)
   ↓
7. HTTP Request (Log completion)
```

---

## 📖 UNDERSTANDING THE FLOW

### What Each Node Does:

**Node 1: Manual Trigger**
- **Purpose:** Starting point of the workflow
- **Real-world:** Like pressing a "Start" button
- **Example:** Admin clicks "Process Users" button

**Node 2: HTTP Request (Fetch user data)**
- **Purpose:** Get data from an API
- **Real-world:** Calls `https://api.example.com/users` to get user list
- **Example:** Like asking a server "Give me all users"
- **Simulates:** `fetch('https://api.example.com/users')`

**Node 3: If/Else (Check if data exists)**
- **Purpose:** Make a decision based on condition
- **Real-world:** Checks if we got any data back
- **Condition:** `data.length > 0` (Did we get users?)
- **Example:** If YES → continue, If NO → stop or handle error

**Node 4: Transform Data (Format response)**
- **Purpose:** Clean and format the data
- **Real-world:** Convert raw JSON to readable format
- **Example:** Turn `{id:1, name:"John"}` into "User: John (ID: 1)"

**Node 5: Send Email (Notify success)**
- **Purpose:** Send notification
- **Real-world:** Email admin saying "We got 10 users!"
- **Example:** Like Gmail sending a message

**Node 6: Delay (Wait 2 seconds)**
- **Purpose:** Pause before continuing
- **Real-world:** Wait for external process or rate limiting
- **Example:** Like `setTimeout(2000)` in JavaScript

**Node 7: HTTP Request (Log completion)**
- **Purpose:** Record that workflow finished
- **Real-world:** Calls `https://api.example.com/log` to save event
- **Example:** Like writing to a database "Workflow completed at 5:30 PM"

---

### Execution Timeline (What You'll See):

**Second 1:**
- 🔵 Manual Trigger glows blue (pulsing animation)
- Purple line animates
- Log: "Executing trigger: Manual Trigger"
- Log: "Trigger 'Manual Trigger' activated" ✅

**Second 2:**
- 🔵 HTTP Request (Fetch) glows blue
- Purple line animates from Trigger → HTTP
- Log: "Executing action: Fetch user data"
- Log: "Action 'Fetch user data' completed (http)" ✅
- **Simulates:** Getting user data from API

**Second 3:**
- 🔵 If/Else glows blue
- Purple line animates from HTTP → If/Else
- Log: "Executing condition: Check if data exists"
- Log: "Condition evaluated (data.length > 0)" ✅
- **Simulates:** Checking if data is valid

**Second 4:**
- 🔵 Transform Data glows blue
- Purple line animates from If/Else → Transform
- Log: "Executing action: Format response"
- Log: "Action 'Format response' completed (transform)" ✅
- **Simulates:** Formatting the data

**Second 5:**
- 🔵 Send Email glows blue
- Purple line animates from Transform → Email
- Log: "Executing action: Notify success"
- Log: "Action 'Notify success' completed (email)" ✅
- **Simulates:** Sending email notification

**Second 6:**
- 🔵 Delay glows blue
- Purple line animates from Email → Delay
- Log: "Executing action: Wait 2 seconds"
- Log: "Action 'Wait 2 seconds' completed (delay)" ✅
- **Simulates:** Waiting/pausing

**Second 7:**
- 🔵 HTTP Request (Log) glows blue
- Purple line animates from Delay → HTTP
- Log: "Executing action: Log completion"
- Log: "Action 'Log completion' completed (http)" ✅
- **Simulates:** Logging to database

**Second 8:**
- All nodes return to normal
- Execution complete! 🎉
- 7 green checkmarks in logs ✅✅✅✅✅✅✅

---

### Real-World Example: E-commerce Order

**Same workflow, different context:**

```
1. Webhook Trigger (Customer places order)
   ↓
2. HTTP Request (Get order details from Shopify)
   ↓
3. If/Else (Check if payment successful)
   ↓
4. Transform Data (Generate invoice PDF)
   ↓
5. Send Email (Invoice to customer)
   ↓
6. Delay (Wait 5 minutes for payment to process)
   ↓
7. HTTP Request (Update inventory in database)
```

**Result:** Fully automated order processing! No human needed! 🚀

---

### Why This Order?

1. **Trigger First** → Every workflow needs a start
2. **Fetch Data Early** → Get what you need upfront
3. **Validate** → Check if data is good
4. **Transform** → Clean and format
5. **Take Action** → Do something useful (email)
6. **Control Timing** → Wait if needed
7. **Log** → Track what happened

---

### Key Concepts:

**Sequential Execution:**
- Nodes execute ONE AT A TIME
- Each waits for previous to finish
- Order matters!

**Data Flow:**
- Data passes from node to node
- Like a relay race with a baton
- Each node can use data from previous nodes

**Visual Feedback:**
- Blue pulse = Currently executing
- Purple animated line = Data flowing
- Green checkmark = Success

---

**Steps:**
1. Add all 7 nodes
2. Connect them in order
3. Configure each:
   - Node 2: actionType = "http", url = "https://api.example.com/users"
   - Node 3: condition = "data.length > 0"
   - Node 4: actionType = "transform"
   - Node 5: actionType = "email"
   - Node 6: actionType = "delay"
   - Node 7: actionType = "http", url = "https://api.example.com/log"
4. **Validate** → Should pass ✅
5. **Execute** → Watch all 7 nodes execute
6. **Export** → Save as `my-workflow.json`
7. **Delete all** nodes
8. **Import** → Load `my-workflow.json`
9. **Execute again** → Should work perfectly

**What to check:**
- ✅ All 7 nodes execute in order
- ✅ Takes ~7 seconds total
- ✅ All logs show success
- ✅ Export/Import works
- ✅ No errors

---

## ✅ CHECKLIST - Mark as you test:

- [ ] All 10 node types work
- [ ] Drag and drop works
- [ ] Connections work (purple lines visible)
- [ ] Node configuration works
- [ ] Validation catches all errors
- [ ] Execution works with visual feedback
- [ ] Execution logs appear
- [ ] Undo/Redo works (Ctrl+Z, Ctrl+Y)
- [ ] Auto-save works (refresh test)
- [ ] Export downloads JSON
- [ ] Import loads workflow
- [ ] Dark mode works
- [ ] Search filters nodes
- [ ] Zoom controls work
- [ ] MiniMap shows colored nodes
- [ ] No console errors (press F12)

---

## 🎉 SUCCESS!

If all tests pass, your workflow builder is **100% functional**!

**You now have:**
- ✅ 10 working node types
- ✅ Visual workflow builder
- ✅ Validation engine
- ✅ Execution simulator
- ✅ Undo/Redo
- ✅ Auto-save
- ✅ Import/Export
- ✅ Dark mode
- ✅ Professional UI

**Congratulations! 🚀**

---

## 🐛 Common Issues & Solutions

### Issue 1: Nodes snap back when dragging
**Solution:** Already fixed! Nodes should stay where you drop them.

### Issue 2: Can't see connection lines
**Solution:** Already fixed! Lines are now purple and 3px thick.

### Issue 3: Validation fails
**Solution:** Check error message, fix the issue, validate again.

### Issue 4: Execution doesn't start
**Solution:** Validate first, fix errors, then execute.

### Issue 5: MiniMap is gray
**Solution:** Already fixed! Now shows green/blue/yellow colored nodes.

---

## 📞 Need Help?

If something doesn't work:
1. Check browser console (F12) for errors
2. Refresh the page
3. Clear browser cache
4. Restart dev server (`npm run dev`)

**Happy Testing! 🎓**
