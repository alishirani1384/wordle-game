import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

const Keypad = ({ usedKeys, setCurrentGuess, currentGuess }) => {
  const [letters, setLetters] = useState(null);
  const {handleKeyup}=useWordle()

  useEffect(() => {
    fetch("https://json.extendsclass.com/bin/368030f5020e")
      .then((res) => res.json())
      .then(({ letters: data }) => {
        setLetters(data);
      });
    navigator.virtualKeyboard.overlaysContent = true;
  }, [setLetters]);
  const Enter = "Enter";
  return (
    <div className="keypad">
      {
        letters?.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div
              onClick={
                currentGuess.length < 5
                  ? () => setCurrentGuess((pre) => pre + l.key)
                  : () => false
              }
              key={l.key}
              className={color}
            >
              {l.key}
            </div>
          );
        })}
      <button onClick={() => handleKeyup({key:Enter})}>Enter</button>
    </div>
  );
};

export default Keypad;
