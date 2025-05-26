import React from "react";
import "./Card.styles.css";

const Card = ({ word, isFlipped, isGuessed, onClick }) => {
  const className = `AppCard ${isFlipped ? "flipped" : ""} ${isGuessed ? "guessed" : ""}`;

  return (
    <div className={className} onClick={onClick}>
      <div className="AppCardStyled">?</div>
      <div className="AppCardValue">{word}</div>
    </div>
  );
};

export default Card;
