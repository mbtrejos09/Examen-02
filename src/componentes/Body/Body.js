import React from "react";
import Vidas from "../Vidas/Vidas"; // solo si corresponde
import Parejas from "../Parejas/Parejas"; // opcional

const Body = ({ guessedWords = [] }) => {
  return (
    <div>
      <Vidas />
      <Parejas guessedWords={guessedWords} />
    </div>
  );
};

export default Body;
