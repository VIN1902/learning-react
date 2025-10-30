import { useState } from "react";

function App() {
  const [color, setColor] = useState("grey"); // destructure the array returned

  return (
    <div className="w-full h-screen" style={{ backgroundColor: color }}>
      <div className='fixed bottom-10 flex flex-wrap justify-center items-center inset-x-0 px-2'>
        <div className="flex flex-wrap justify-center items-center gap-3 shadow-lg bg-white px-3 py-2 rounded-2xl">
          <button 
          className="text-white px-2 py-1 rounded-lg transition ease-in-out hover:-translate-y-1" 
          style={{backgroundColor: "red"}}
          onClick={()=>setColor("red")}>Red</button>
          <button 
          className="text-white px-2 py-1 rounded-lg transition ease-in-out hover:-translate-y-1" 
          style={{backgroundColor: "orange"}}
          onClick={()=>setColor("orange")}>Orange</button>
          <button 
          className="text-white px-2 py-1 rounded-lg transition ease-in-out hover:-translate-y-1" 
          style={{backgroundColor: "yellow"}}
          onClick={()=>setColor("yellow")}>Yellow</button>
          <button 
          className="text-white px-2 py-1 rounded-lg transition ease-in-out hover:-translate-y-1" 
          style={{backgroundColor: "green"}}
          onClick={()=>setColor("green")}>Green</button>
          <button 
          className="text-white px-2 py-1 rounded-lg transition ease-in-out hover:-translate-y-1" 
          style={{backgroundColor: "blue"}}
          onClick={()=>setColor("blue")}>Blue</button>
          <button 
          className="text-white px-2 py-1 rounded-lg transition ease-in-out hover:-translate-y-1" 
          style={{backgroundColor: "indigo"}}
          onClick={()=>setColor("indigo")}>Indigo</button>
          <button 
          className="text-white px-2 py-1 rounded-lg transition ease-in-out hover:-translate-y-1" 
          style={{backgroundColor: "violet"}}
          onClick={()=>setColor("violet")}>Violet</button>

        {/* 
        why a callback in onClick? and not directly setColor('red')?
        - onClick accepts a function.
            - In this its ok but can't pass arguments: onClick = {setColor} only reference is passed right now. and on click event that function will be executed.
            - To pass argument you open paranthesis, but this syntax executes the function instead and the return value goes into onClick, but it wants a function: onClick = {setColor()}
        - That is fine untill you need to pass an argument to the function.
            - in that case its a syntax rule that you have to use callback to pass any argument.
            - onClick = {()=>setColor('red')}
        */}
        </div>
      </div>
    </div>
  );
}

export default App;
