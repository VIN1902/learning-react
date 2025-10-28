import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MyComponent from './Component.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <MyComponent />
  </StrictMode>,
)

/*
if it was:

import React from 'react'
import ReactDOM from 'react-dom/client'
ReactDOM.createRoot(document.querySelector('root')).render(<App />)

This is exactly the same as what's happening above, there more lightweight options are used as compared to this.

How is it working?:

first with ReactDOM react creates a virtual DOM. just like browser creates actual DOM for itself.
then on that virtual DOM you run a method createRoot to create a root on your virtual DOM that is coming from or selected from the actuall browser DOM.
Using API methods like 'getElementById' or 'querySelector' you select a element on real DOM and with its as reference create a new root for the virtual DOM.
after that run a render method on virtual DOM that renders the html on it. HTML is coming from return statement of javascript function imported called App.
in this render method, you may use StrictMode method of react, which provides a developer tool to identify warnings and bugs in react app. Doesn't go in production.
inside render method you can only return one container which has all the html. use fragment tag => <> </>
*/