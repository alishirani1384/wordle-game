import React, { useEffect, useState } from "react";

const Keypad = ({ usedKeys }) => {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("https://json.extendsclass.com/bin/368030f5020e")
      .then((res) => res.json())
      .then(({ letters: data }) => {
        setLetters(data);
      });
  }, [setLetters]);
  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
};

export default Keypad;
