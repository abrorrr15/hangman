

type HangmanWordsType = {
  guessedLetter: string[];
  wordsGuess: string;
  reveal?: boolean;
  hint: string;
};
export default function HangmanWords({
  guessedLetter,
  wordsGuess,
  reveal = false,
}: HangmanWordsType) {
  console.log(guessedLetter);

  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordsGuess.split("").map((letter, index) => {
        return (
          <span style={{ borderBottom: ".1em solid black" }} key={index}>
            <span
              style={{
                visibility:
                  guessedLetter.includes(letter) || reveal
                    ? "visible"
                    : "hidden",
                color:
                  !guessedLetter.includes(letter) && reveal ? "red" : "black",
              }}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
}
