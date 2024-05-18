import styles from "./Keyboard.module.css";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
type KeyboardProps = {
  activeLetter: string[];
  inActiveLetter: string[];
  addGuess: (letter: string) => void;
  disabled?: boolean;
};

export default function Keyboard({
  activeLetter,
  inActiveLetter,
  addGuess,
  disabled = false,
}: KeyboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
      }}
    >
      {KEYS.map((key) => {
        const isActive = activeLetter.includes(key);
        const inActive = inActiveLetter.includes(key);
        return (
          <button
            disabled={isActive || inActive || disabled}
            onClick={() => addGuess(key)}
            className={`${styles.btn} ${isActive ? styles.active : ""} ${
              inActive ? styles.inactive : ""
            }`}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
