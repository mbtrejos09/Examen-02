import React from "react";
import "./Parejas.styles.css";

const Parejas = ({ guessedWords = [] }) => {
  return (
    <ul id="guessedWords">
      {guessedWords.map((word, index) => (
        <li key={index}>{word}</li>
      ))}
    </ul>
  );
};

export default Parejas;
