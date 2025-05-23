import React, { useState, useEffect } from "react";
import Card from "./Card";
import Vidas from "./Vidas";
import Parejas from "./Parejas";

const Engine = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [lives, setLives] = useState(5);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    const initialCards = [
      { id: 1, word: "Hola", matched: false },
      { id: 2, word: "Hola", matched: false },
      { id: 3, word: "Adiós", matched: false },
      { id: 4, word: "Adiós", matched: false },
      // Agrega más pares si lo deseas
    ];
    setCards(shuffleArray(initialCards));
  }, []);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (id) => {
    if (selectedCards.length === 2 || selectedCards.includes(id)) return;

    const newSelection = [...selectedCards, id];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      const [firstId, secondId] = newSelection;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard && secondCard && firstCard.word === secondCard.word) {
        setCards((prev) =>
          prev.map((card) =>
            card.word === firstCard.word ? { ...card, matched: true } : card
          )
        );
        setMatches((prev) => prev + 1);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
          setLives((prev) => prev - 1);
        }, 1000);
      }
    }
  };

  return (
    <div className="engine">
      <div className="cards-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            word={card.word}
            matched={card.matched}
            flipped={selectedCards.includes(card.id) || card.matched}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <div className="panel-lateral">
        <p>Vidas: {lives}</p>
        <p>Parejas encontradas: {matches}</p>
        <button onClick={() => window.location.reload()}>Reiniciar</button>
      </div>
    </div>
  );
};

export default Engine;
