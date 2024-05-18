import { useCallback, useEffect, useState } from "react";
import words from "./tool/words.json";
import HangmanDrawing from "./tool/HangmanDrawing";
import HangmanWords from "./tool/HangmanWords";
import Keyboard from "./tool/Keyboard";
import { Modal } from "./tool/Window";
import styled from "styled-components";
import { RxUpdate } from "react-icons/rx";
import Hint from "./tool/Hint";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 70%;
  left: 40%;
  transform: translate(0%, 0%);

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: blue;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-10%);
    }
  }
`;

function App() {
  const [wordsGuess, setWordsGuess] = useState(getWord);
  const [guessedLetter, setGuessedLetter] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const incorrectLetters = guessedLetter.filter(
    (letter) => !wordsGuess.word.includes(letter)
  );

  const loser = incorrectLetters.length >= 6;
  const winner = wordsGuess.word
    .toLowerCase()
    .split("")
    .every((letter) => guessedLetter.includes(letter.toLowerCase()));

  const addGuess = useCallback(
    (letter: string) => {
      if (guessedLetter.includes(letter.toLowerCase()) || loser || winner)
        return;
      setGuessedLetter((currentLetter) => [...currentLetter, letter.toLowerCase()]);
    },
    [guessedLetter, winner, loser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuess(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetter, addGuess]);

  useEffect(() => {
    if (loser || winner) {
      setIsOpen(true);
    }
  }, [loser, winner]);

  const resetGame = () => {
    setGuessedLetter([]);
    setWordsGuess(getWord());
    setIsOpen(false);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      {isOpen && (
        <Modal>
          <p style={{fontSize: "2em"}}>{loser ? "You lost! Try again?" : "You won! Play again?"}</p>
          <Button onClick={resetGame}>
            <RxUpdate />
          </Button>
        </Modal>
      )}
      <Hint hint={wordsGuess.hint} />
      <HangmanDrawing
        numberofGuesses={incorrectLetters.length}
        hint={wordsGuess.hint}
      />
      <HangmanWords
        guessedLetter={guessedLetter}
        wordsGuess={wordsGuess.word.toLowerCase()}
        hint={wordsGuess.hint}
        reveal={loser}
      />
      <div
        style={{
          alignSelf: "stretch",
        }}
      >
        <Keyboard
          activeLetter={guessedLetter.filter((w) =>
            wordsGuess.word.includes(w)
          )}
          inActiveLetter={incorrectLetters}
          addGuess={addGuess}
          disabled={winner || loser}
        />
      </div>
    </div>
  );
}

export default App;
