import React from "react";
import "./Vidas.styles.css";

const Vidas = ({ health = 0 }) => {
  return (
    <div className="vidas" id="health">
      <h3>Vidas</h3>
      <p>{'❤️'.repeat(health)}</p>
    </div>
  );
};

export default Vidas;
