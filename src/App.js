import { useEffect, useState } from "react";
import "./App.css";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);
  const keyboardOn = () => {
    navigator.virtualKeyboard.overlaysContent = true;
  };
  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => res.json())
      .then((json) => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
    window.addEventListener("load", keyboardOn);
  }, [setSolution]);

  return (
    <div className="App">
      <div className="app_header">
        <h2>WORDLE (Lingo)</h2>
      </div>
      <div className="app_main">
        {solution && <Wordle solution={solution} />}
      </div>
    </div>
  );
}

export default App;
