import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys,setUsedKeys]=useState({})

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    formattedGuess.forEach((l, i) => {

      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });
    return formattedGuess;
  };
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prev) => {
      return [...prev, currentGuess];
    })
    setTurn((prev) => {
      return prev + 1;
    })
    setUsedKeys((prev) => {
      let newKeys = { ...prev }


      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color === 'green') {
          newKeys[l.key] = 'green';
          return
        }
        if (l.color === 'yellow'&&currentColor!=='green') {
          newKeys[l.key] = 'yellow';
          return
        }
        if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[l.key] = 'grey';
          return
        }
      })
      return newKeys;
    })
    setCurrentGuess("")
  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter"||key==="Go") {
      if (turn > 5) {
        console.log("you used all your guesses");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("you already tried that word");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("word must be 5 char long");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((pre) => pre.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((pre) => pre + key);
      }
    }
  };
  return {
    setCurrentGuess,
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyup,
    usedKeys,
    addNewGuess,
    formatGuess,
  };
};
export default useWordle;
