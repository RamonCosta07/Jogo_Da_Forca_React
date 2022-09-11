// CSS
import "./App.css";
//Components
import Start from "./components/Start";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
// Hooks
import { useCallback, useEffect, useState } from "react";
// Data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "gameover" },
];

function App() {
  const [words] = useState(wordsList);
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [letters, setLetters] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const [gameStage, setGameStage] = useState(stages[0].name);

  const pickWordAndCategory = useCallback(() => {
    // Find category Random
    const categories = Object.keys(words);
    const categoryRandom =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Find word Random
    const wordRandom =
      words[categoryRandom][
        Math.floor(Math.random() * words[categoryRandom].length)
      ];

    return { wordRandom, categoryRandom };
  }, [words]);

  const startGame = useCallback(() => {
    clearState();
    const { wordRandom, categoryRandom } = pickWordAndCategory();

    let wordLetters = wordRandom.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setGameStage(stages[1].name);

    // fill states

    setSelectedWord(wordRandom);
    setSelectedCategory(categoryRandom);
    setLetters(wordLetters);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const letterLowerCase = letter.toLowerCase();
    if (
      guessedLetters.includes(letterLowerCase) ||
      wrongLetters.includes(letterLowerCase)
    ) {
      return;
    }
    if (letters.includes(letterLowerCase)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letterLowerCase,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        letterLowerCase,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearState = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // lose
  useEffect(() => {
    if (guesses <= 0) {
      setGameStage(stages[2].name);
    }
  }, [guesses, letters, startGame]);

  // win
  useEffect(() => {
    /* Set will only leave unique items in an array */
    const uniqueLetters = [...new Set(letters)];
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      setScore((actualScore) => (actualScore += 50));
      setTimeout(function () {
        startGame();
      }, 500);
    }
  }, [guessedLetters]);

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <Start startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          selectedWord={selectedWord}
          selectedCategory={selectedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "gameover" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
