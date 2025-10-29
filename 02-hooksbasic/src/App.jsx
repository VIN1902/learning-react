import { useState } from 'react'

import './App.css'

function App() {
  // let counter = 5

  // function addValue(){
  //   counter += 1
  //   console.log(counter);
  // }

  // function dropValue(){
  //   counter -= 1
  //   console.log(counter);
  // }

  // UI updation problem, JS is able to control the state of counter but not able to show it in DOM
  // React want's to control when and what changes UI and not you giving you the controll of UI with JS.
  // So, you using JS control component's variable's state. and React reacts to that change in state and by itself controls the UI on DOM. UI controls are not given to you to manipulate using JS. let counter = 5 -> variable assigned like this will never propogate in UI.
  // This is because often times a change in state is responsible for multiple UI changes at places so that responsiblity is with react not you. cause if you were to do it, you would manually first select each and every (10-100?) element then apply events to it and so on. very laborious to do that.
  // now for UI updation react gives us its own methods, called hooks. hooks are modular, each do only a specific task on UI.

  // useState hook - propogate the state changes in UI/DOM, pass a defualt argument of any datatype, returns an array of 1st element is a counter & 2nd element is a function for 1st.

  let [counter, setCounter] = useState(0)

  function addValue() {
    if ((counter < 10)) {
      setCounter(counter + 1)
    }
  }

  function dropValue() {
    if (counter > -10) {
      setCounter(counter - 1) // React reacts to change in state for this variable, auto-analyzes the whole DOM where this variable is present, then manages the state of variable from now on.
    }
  }

  return (
    <>
    <h1>Making a Counter</h1>
    <p>Counter value {counter}</p>
    <button onClick={dropValue}>Down {counter}</button>
    <button onClick={addValue}>Up {counter}</button>
    <p>{counter}|{counter}|{counter}|{counter}</p>
    <p>My god its ({counter}) updating everywhere in UI/DOM</p>
    </>
  )
}

export default App
