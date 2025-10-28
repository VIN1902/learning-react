function App() {
  let myName = 'vikas'.toUpperCase()
  // in the {} is the evaluated expression. meaning only evaluted JS can be written in it and not raw JS expression like control-flow, operations, etc.

  return (
    <main>
      <h1>Hello React</h1>
      <p>I am {myName} and <mark>Vite</mark> lets me create react apps.</p>
    </main>
  )
}

export default App

/*
Make a function return entire html inside a single element be it div, main, etc.
Export that function.
Default export lets you rename the function whatever you want during import and without use of any braces. 1 default export per file.
Named exports makes you use braces during import and use the exact same name you exported with.
*/