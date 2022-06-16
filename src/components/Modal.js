import React from "react";

const Modal = ({ isCorrect, turn, solution }) => {
  const refresh = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  return (
    <div className="modal">
      <div className="modal-container">
        {isCorrect && (
          <div>
            <h1>You Win!</h1>
            <p className="solution">{solution}</p>
            <p>You found the solution in {turn} guesses :)</p>
          </div>
        )}
        {!isCorrect && (
          <div>
            <h1>Nevermind!</h1>
            <p className="solution">{solution}</p>
            <p>Better luck next time:)</p>
          </div>
        )}
        <button onClick={() => refresh()}>Try Again</button>
      </div>
    </div>
  );
};

export default Modal;
