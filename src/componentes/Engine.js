import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import Vidas from "./Vidas/Vidas";
import Parejas from "./Parejas/Parejas";
import RestartButton from "./Restart/Restart";
import Toastify from "toastify-js";
import "./Engine.styles.css";

const getRandomWords = async () => {
  try {
    const res = await fetch(
      "https://random-word-api.herokuapp.com/word?number=6&lang=es"
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener palabras:", error);
    return ["gato", "luna", "sol", "nube", "mar", "río"]; // fallback
  }
};

const shuffle = (array) => {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

const Engine = () => {
  const [words, setWords] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [guessedWords, setGuessedWords] = useState([]);
  const [health, setHealth] = useState(5);
  const [gameStopped, setGameStopped] = useState(false);
  const [blockInteraction, setBlockInteraction] = useState(false);

  const startGame = async () => {
    const randomWords = await getRandomWords();
    const duplicated = randomWords.flatMap((word) => [word, word]);
    setWords(randomWords);
    setCards(shuffle(duplicated));
    setSelectedCards([]);
    setGuessedWords([]);
    setHealth(5);
    setGameStopped(false);
    setBlockInteraction(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleCardClick = (word, index) => {
    if (blockInteraction || gameStopped || guessedWords.includes(word)) return;

    const currentCard = { word, index };

    if (selectedCards.length === 1) {
      setBlockInteraction(true);
      const [firstCard] = selectedCards;

      if (firstCard.word === word && firstCard.index !== index) {
        setGuessedWords((prev) => {
          const newGuessed = [...prev, word];
          if (newGuessed.length === words.length) {
            setGameStopped(true);
            Toastify({
              text: "¡Has ganado el juego! 🎉",
              duration: 3000,
              style: {
                background: "linear-gradient(to right, green, blue)",
              },
            }).showToast();
          }
          return newGuessed;
        });
        setSelectedCards([]);
        setBlockInteraction(false);
      } else {
        setSelectedCards([firstCard, currentCard]);
        setTimeout(() => {
          setSelectedCards([]);
          setHealth((h) => {
            const newHealth = h - 1;
            if (newHealth <= 0) {
              setGameStopped(true);
              Toastify({
                text: "Has perdido el juego 😢",
                duration: 3000,
                style: {
                  background: "linear-gradient(to right, red, orange)",
                },
              }).showToast();
            }
            return newHealth;
          });
          setBlockInteraction(false);
        }, 1000);
      }
    } else {
      setSelectedCards([currentCard]);
    }
  };

  const restart = () => {
    startGame();
  };

  return (
    <>
      <section id="AppCards">
        {cards.map((word, index) => (
          <Card
            key={index}
            word={word}
            isFlipped={
              guessedWords.includes(word) ||
              selectedCards.some((card) => card.index === index)
            }
            isGuessed={guessedWords.includes(word)}
            onClick={() => handleCardClick(word, index)}
          />
        ))}
      </section>

      <section id="AppControlPanel">
        <h2>Vidas:</h2>
        <Vidas health={health} />
        <h2>Parejas encontradas</h2>
        <Parejas guessedWords={guessedWords} />
        <RestartButton onRestart={restart} />
      </section>
    </>
  );
};

export default Engine;
