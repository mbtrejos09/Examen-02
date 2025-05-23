import React from "react";
import "./Card.css";

const Card = ({ id, word, matched, flipped, onClick }) => {
  const handleClick = () => {
    if (!flipped && !matched) {
      onClick(id);
    }
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{word}</div>
      </div>
    </div>
  );
};

export default Card;
