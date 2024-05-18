import styled from "styled-components";

const Hints = styled.div`
  margin: 0 auto;
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
`;
const Span = styled.span`
  color: red;
`;

type HintProps = {
  hint: string;
};

function Hint({ hint }: HintProps) {
  return (
    <Hints>
      <Span>Hint: </Span>
      {hint.split("").map((h, i) => {
        return <span key={i}>{h}</span>;
      })}
    </Hints>
  );
}
export default Hint;
