# React Model Philosophy
- UI is a function of state. UI = f(state)
- Traditional webdev seperates the technologies (html,css,js) but encapsulates them per component — all logic, UI, and style for one unit of UI are bundled together.
    - reusability: One component can be reused across your app.
    - isolation: Each component has its own scope, state, and styles.
    - declarative nature: You describe what UI should look like for a given state, React figures out how to update the DOM efficiently.

# ReactDOM and the Virtual DOM

1. Browser DOM
    - The browser parses HTML → builds an Actual DOM tree → paints it visually.
    - But direct manipulation of DOM (via JS) is slow — repainting or reflowing the entire DOM on small changes causes performance issues.

1. Virtual DOM
    - React builds an in-memory copy of the DOM called the Virtual DOM (VDOM).
    - This is a lightweight JavaScript object tree that mirrors the structure of your UI.
    - When the UI changes (because of state updates), React:
        - Creates a new VDOM tree.
        - Compares (diffs) it with the previous one.
        - Calculates the minimal set of changes.
        - Efficiently updates only those parts in the real DOM.

# createRoot

React works by linking its virtual DOM tree to an element in the actual browser DOM.

```js
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
createRoot(document.getElementById('root')).render(<App />)
```

1. document.getElementById('root')
    - Selects the target DOM element in the HTML page.

1. createRoot()
    - Creates a virtual DOM root linked to that DOM node.

1. .render(<App />)
    - Converts JSX → virtual DOM tree (using React.createElement() under the hood)
    - Stores that tree in memory
    - React DOM reconciler later syncs it with the actual DOM.

createRoot() = sets up an empty container in React’s internal memory.  
render(<App />) = fills that container with a virtual DOM tree and mounts it into the browser DOM.

# JSX

Converts whatever html you write in the JS to be returned, into a JS object.  
So JSX is just syntactic sugar for React.createElement().
```jsx
function F() {
  return (
    <a href="https://wikipedia.com">Visit Wikipedia</a>
  ) 
}

// is converted to:
const F = React.createElement(
  'a',
  { href: 'https://wikipedia.com' },
  'Visit Wikipedia'
)

// which returns a plain JS object, which is part of React’s Virtual DOM tree.
{
  type: 'a',
  props: { href: 'https://wikipedia.com', children: 'Visit Wikipedia' }
}
```

# Rendering Cycle: How React Updates the UI

1. Initial Render

    - React builds a virtual DOM tree from JSX.
    - ReactDOM renders it onto the browser DOM (first mount).

1. On State Change

    - You update state (e.g., setCount(count + 1)).
    - React creates a new virtual DOM tree.
    - React diffs (compares) it with the previous tree.
    - React determines exactly what changed.
    - React updates the real DOM efficiently (only minimal updates).
    - Browser re-paints the changed parts.

This process — diffing and updating — is called Reconciliation.

# State and Hooks

- You can only use JS to control component's state (variable that holds data about the current situation of component). Not reflect that change in the UI.
- React handles UI rendering based on that state change, using hooks (specialized functions that let React know when state changes and what to re-render).
- React handles UI control because, one state change might affect many components, and manual DOM updates would be error-prone and inefficient/laborious.

```js
const [count, setCount] = useState(0);
```
  - count → current state value
  - setCount() → function to update it
  - Updating state triggers React’s internal render pipeline (Virtual DOM diff + reconciliation)

# Props

- Passing data between components. properties are passed from parent to child component.
    - Props flow downward (parent → child).
    - Props are read-only inside the child.
    - To change data, a component must manage its own state or ask parent to do so via callbacks.

```js
function App() {
  return <Card username="Vikas" age={23} />;
}

function Card({ username, age = 18 }) {
  return <p>Name: {username}, Age: {age}</p>;
}
```

# Reconciliation (reconciler)

- Builds new virtual DOM trees.
- Diffs them with old ones.
- Determine the minimal changes needed to be made on real DOM.
- Schedules commits to the real DOM.

This whole process was synchronous. Further updates were blocked untill this update's reconciliation finishes.

## Modern reconciliation
- Old one (above steps) are reimplemented by fiber algorithm.
- Now react, along with old steps, can also pause/resume/abort rendering between frames if the current update is expensive and schedule updates based on priority.

Read the section below:

# The Fiber Architecture

- React Fiber is the reimplementation of the reconciler (the part that compares and updates virtual DOM trees).
- React has two phases:
    - Render Phase (Reconciliation now reimplemented by fiber): figure out what needs to change.
    - Commit Phase: apply those changes to the actual DOM.

1. Why Fiber Was Created
    - Older React did all diffing synchronously — big updates froze the UI.
    - If your component tree was huge, React would block the main thread until reconciliation finished — causing jank or UI freezes. (updates were synchronous)

1. Fiber’s Improvements
    - React Fiber introduces a cooperative, interruptible work loop which are broken into small units/batches.

1. Key Capabilities:
    - Incremental rendering – Break work into small chunks/batches spread across multiple frames.
    - Prioritization – Urgent updates (like animations) can pause or preempt less urgent ones.
    - Interruptible – Can cancel or reuse partially computed updates.

1. So when state changes:
    - React creates a new fiber tree (the new VDOM).
    - It diffs the new and old fiber trees.
    - Schedules updates based on priority.
    - Commits the minimal changes to the real DOM.
    - This process ensures smooth UI updates even under heavy workload.

So React can now “decide” when and how much to render, instead of blocking until done.

# React Architecture

1. Devloper API Layer (component, hook, props, context)
    - Everything you, the developer, use (tools) to talk to React.
    - Component are the "what", Props and Context are "how data flows b/w components", Hooks are "Enqueuing updates" which go into reconciler.
    - Trigger the reconciler.

1. Scheduler (prioritization engine)
    - Decides when the work should be done.
    - Based on priority of updates.
    - Cooperation b/w changes based on priority, prevents blokcing renders. (when should reconciler run)

1. Reconciler (powered by fiber)
    - Figures out what needs to change.
    - Uses fiber to create a new VDOM, diff it with previous one and decide minimal changes
    - Begins the 'render phase'.

1. Renderer (react-dom (createRoot().render()), react-native)
    - Handles how React interacts with the host environment. 
    - Converts React’s abstract tree (the "virtual DOM" or equivalent) into real platform instructions (DOM, native views, canvas, etc).
    - Mount changes to host in 'commit phase'.

what to render  
when to render  
how to compute diff  
how to apply diff

## HLD of react web lifecycle

1. ReactDOM.createRoot() — create a root fiber connected to real DOM.
1. render(<App />) — builds virtual DOM tree from JSX.
1. Fiber reconciler diffs it with previous tree.
1. Scheduler assigns priority, time-slices the work.
1. Commit phase updates actual DOM nodes.
1. Browser paints updated UI.
1. State/props changes trigger the cycle again.

# Extras

1. StrictMode
    - A React wrapper for development only
    - Detects potential problems.
    - Doesn’t render in production.

1. Fragments
    - You can’t return multiple root elements from a component.
    - Use a fragment (<>...</>) instead of a parent div.

# Situation to observe React working nuance

Say a basic react app is there where a state is being changed based on countUP/countDOWN buttons. (basic counter display)  
addValue is the function that is increamenting the value triggered by some click event on a button.

```jsx
const [counter, setCounter] = useState(0)
const addValue () {
  setCounter(counter + 1)
  setCounter(counter + 1)
  setCounter(counter + 1)
}
```

By how much the counter value change on a single button click?

- setCounter is coming from hook and hooks trigger UI updation process.
- React batches state updates, that occur within the same event (like a click).
    - batching: collect multiple updates, before processing.
- Hook's update queue, processes the final state by collapsing the similar/equivalent updates into one. After this reconciler renders that final state on DOM.
- before fiber, reconciliation was synchronous meaning each UI updation event will block the next-in-line event until it finishes whole reconcilation process.
- but now fiber, schedules and prioritizes these identical state replacements. Fiber’s contribution here is making this process interruptible and efficiently batched.
- Therefore React, batches and merges updates based on their content and timing.
- So, only the final setCounter is working and hence addValue will increment the value by only 1 and not 3 per button click.

## Further clarification

1. Batching: 
    - react says "All updates that happen inside this event handler are part of the same batch".
1. State update queue: <mark>( Hook Working )</mark>
    - Hook returns the array of state variable and the setState method. setState method updates the state value.
    - Every hook (like useState) maintains an internal queue of pending updates.
    - Calculates the final state value by processing all the updates in that batch.
        - Each setState (setCounter) method, adds an update to queue.
        - These updates are done in order.
        - In the setState method, if a _value is passed_, then added update _replaces_ the previous one, to set next value of state, & ultimately the final value.
        - In the setState method, if a _function is passed_, then added update _derives_ from the previous one, to set value of next state, & ultimately the final value.
1. Fiber:
    - Executes and schedules the rendering work once final state value is known.
    - After final state value to be rendered is decided, React marks it for reconcilation, which is handled by fiber algorithm.

## Functional updates
What if I want to add 3 value per button click and not this default behaviour?

- setCounter also accepts callbacks in arguments.
- this callback takes in the previous value of state, for that 'wait' is introduced for reconciliation process to execute completly.

```jsx
const [counter, setCounter] = useState(0)
const addValue () {
  setCounter(prevCounter => prevCounter + 1)
  setCounter(prevCounter => prevCounter + 1)
  setCounter(prevCounter => prevCounter + 1)
}
```
