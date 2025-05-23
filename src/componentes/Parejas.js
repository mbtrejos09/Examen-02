import React from "react";
import "./Parejas.css";

const Parejas = ({ matches }) => {
  return (
    <div className="parejas">
      <h3>Parejas encontradas</h3>
      <p>{matches}</p>
    </div>
  );
};

export default Parejas;
