import React from "react";
import "./Restart.styles.css";

const Restart = ({ onRestart }) => {
  return (
    <button id="restart" onClick={onRestart}>
      Reiniciar
    </button>
  );
};

export default Restart;
