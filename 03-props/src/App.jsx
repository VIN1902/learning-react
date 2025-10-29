import { useState } from "react";
import "./App.css";
import Card from './components/Card.jsx';

function App() {
  const [count, setCount] = useState(0);

  let myObj = {
    age: 23,
    isWorried: true,
  }

  let myArr = [1,2,3]

  return (
    <>
      <h1 className="bg-fuchsia-500 rounded-2xl px-2 py-3">
        Using React + Tailwind in Vite
      </h1>
      <div className="flex gap-4">
        <Card username="Vikas" obj={myObj} arr={myArr}/>
        <Card username="Harsh" obj={myObj} arr={myArr}/>
        <Card username="Sakiv" obj={myObj} arr={myArr}/>
      </div>
    </>
  );
}

export default App;
