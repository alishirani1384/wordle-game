import { useEffect, useState } from "react";
import "./App.css";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);
 
  useEffect(() => {
    fetch("https://json.extendsclass.com/bin/368030f5020e")
      .then((res) => res.json())
      .then(({ solutions: json }) => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
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
