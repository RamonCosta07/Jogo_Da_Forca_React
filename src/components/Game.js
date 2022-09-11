import { useState, useRef } from "react";
import "./Game.css";

function Game({
  verifyLetter,
  selectedWord,
  selectedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter('');
    letterInputRef.current.focus();
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Descubra a palavra: </h1>
      <h3 className="clue">
        A pista é... <span className="category">{selectedCategory}</span>
      </h3>
      <p>Você possui {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Informar Letra</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letra já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
}

export default Game;
