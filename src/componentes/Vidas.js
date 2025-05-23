import React from "react";
import "./Vidas.css";

const Vidas = ({ lives }) => {
  return (
    <div className="vidas">
      <h3>Vidas</h3>
      <p>{lives}</p>
    </div>
  );
};

export default Vidas;
