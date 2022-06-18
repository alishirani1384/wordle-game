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


  useEffect(() => {
    // window.addEventListener("keyup", handleKeyup);
    window.addEventListener('keypress', handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 1500);
      window.removeEventListener("keypress", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 1500);
      window.removeEventListener("keypress", handleKeyup);
    }

    return () => window.removeEventListener("keypress", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <>
      <input type="text" maxLength='5' className="input" defaultValue='write here'/>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad
        usedKeys={usedKeys}
        setCurrentGuess={setCurrentGuess}
        currentGuess={currentGuess}
      />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </>
  );
};

export default Wordle;
