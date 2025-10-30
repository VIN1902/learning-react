import { useState, useCallback } from "react";
// useCallback caches the function defination upon each re-render. arguments are a function and dependecies array.

/*
# Goal:
- call passwordGenerator function on page load.
- multiple inputs in UI and their state will be calling the same passwordGenerator function again and again.
    - optimize this by using memoization, to somehow remember necessary stuff of function instead of re-call the entire function again.
    - मतलब UI के साथ छेड-छाड़ करनी है । and for that react gives us dev api called hooks (useCallback).
- a copy button that will target only the input field.
*/

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // const passwordGenerator = () => {}
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_-~`{}|?.,<>+:;";

    for (let i = 0; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * (str.length - 0)) + 0;
      pass += str.at(randomIndex);
    }

    setPassword(password);
  }, [length, numberAllowed, characterAllowed]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-2xl font-bold text-center mb-4">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
        type="text"
        value={password}
        className="w-full py-2 px-3 outline-none bg-gray-600 text-white font-semibold"
        placeholder="password"
        readOnly
      />
      <button className="text-white bg-blue-400 py-2 px-3 hover:bg-blue-500">copy</button>
      </div>
      <div className="text-sm flex gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
          type="range"
          name=""
          id=""
          />
        </div>
      </div>
    </div>
  );
}

export default App;
