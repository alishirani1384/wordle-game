import React, { useEffect, useState } from "react";

const Keypad = ({ usedKeys, setCurrentGuess, currentGuess }) => {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("https://json.extendsclass.com/bin/368030f5020e")
      .then((res) => res.json())
      .then(({ letters: data }) => {
        setLetters(data);
      });
  }, [setLetters]);
  const Enter = "Go";

  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
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
      <button onClick={() => window.key=Enter}>Enter</button>
    </div>
  );
};

export default Keypad;
