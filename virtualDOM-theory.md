# Virtual DOM vs Browser DOM

React using the createRoot mehthods creates a virtual DOM-like-structure behind the scene  
Browser also creates a actual DOM for every page.

This virtual DOM is compared with real DOM and only changes those nodes that are changed in real DOM.  
But browser re-paints the entire real DOM on slightest of change. This is called page-reloading.

Take a case where a button text is update per network call, now within a second multiple such calls were made and multiple changes react had to keeep track of.  
So why not create a algorithm where instead of immediately changing the DOM you wait and optimize in such way that only final value is updated on UI.

Read this [article](https://github.com/acdlite/react-fiber-architecture) on react fibre architecture.

# React fibre Algorithm

This algo is responsible for updating the virtual DOM.

Understand Problem:  
React used to update its DOM immediately on a state change, but that caused multiple intermediatary changes.  
A element was going to get changed but in the meantime a new change update came so now cancel previous one and start changing this new one but in middle again came a new change and so on.  

## ***Key feature of fibre***:
1. ability to ***pause, abort, or reuse work as new updates come in*** and the ability to ***assign priority to different types of updates***; and new concurrency primitives.  
1. incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames. 

---

Hydration: The DOM nodes are loaded on page but they don't work yet untill JS gets injected.

Reconciliation: The recursive-algorithm React uses to diff one tree with another to determine which parts need to be changed.  
Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM."

when you render a React application, a tree of nodes that describes the app is generated and saved in memory.
```js
{
  'a',
  {
    href: "https://wikipedia.com",
    target: "_blank"
  },
  'Click to visit wikipedia'
}
```
when app is updated (via setState) a new tree is generated, this one is diffed with previous one to see which particular operations are needed to update the app.

Fibre is re-write from ground up of this reconciler.  
It now instead of diff-ing the trees on update, replaces the old tree completely for some components.  
Diffing of lists is performed using keys. Keys should be "stable, predictable, and unique."

So,
- In a UI, it's not necessary for every update to be applied immediately; in fact, doing so can be wasteful, causing frames to drop and degrading the user experience.
- Different types of updates have different priorities — an animation update needs to complete more quickly than, say, an update from a data store.
- A push-based approach requires the app (you, the programmer) to decide how to schedule work. A pull-based approach allows the framework (React) to be smart and make those decisions for you.
