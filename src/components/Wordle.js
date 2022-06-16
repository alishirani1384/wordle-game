import React, { useEffect ,useState} from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from './Keypad';
import Modal from './Modal'

const Wordle = ({ solution }) => {
  const {
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    setCurrentGuess,
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false)
  const [valued, setValue] = useState('')


  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    


    if (isCorrect) {
      setTimeout(() => setShowModal(true), 1500);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 1500);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <>
      <input type="text" onSubmit={(e)=>setValue('')} value={valued} className="input" maxLength="5" autoFocus />
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad
        handleKeyup={handleKeyup}
        usedKeys={usedKeys}
        setCurrentGuess={setCurrentGuess}
      />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </>
  );
};

export default Wordle;
