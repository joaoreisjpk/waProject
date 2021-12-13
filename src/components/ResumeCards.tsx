import { Button, ButtonGroup, Typography } from '@mui/material';
import { handleSpecialCharacters } from '../helpers';

interface resumeProps {
  rightAnswerID: string;
  answerID: string;
  randomAnswers: { id: string; answer: string }[];
  difficulty: string;
  question: string;
}

interface AnswerCardProps {
  cardObject: resumeProps;
  index?: number;
}

export default function AnswerCard({ cardObject, index }: AnswerCardProps) {
  const { randomAnswers, rightAnswerID, answerID, question } = cardObject;

  function Card() {
    return (
      <section key={rightAnswerID}>
        <Typography variant="h5">
          {(index + 1) + ' - ' + handleSpecialCharacters(question)}
        </Typography>

        <ButtonGroup orientation="vertical" sx={{ margin: '1rem 2rem'}}>
          {randomAnswers.map(({ answer, id }) => {
            if (id === rightAnswerID) {
              return <Button disabled style={{ color: 'green', minWidth: '300px', fontWeight: '600' }}>{answer}</Button>;
            } else if (id === answerID) {
              return <Button disabled style={{ color: 'red', minWidth: '300px', fontWeight: '600' }}>{answer}</Button>;
            }
            return <Button disabled key={id} style={{ color: 'gray', minWidth: '300px', fontWeight: '600' }}>{answer}</Button>;
          })}
        </ButtonGroup>

      </section>
    );
  }

  return rightAnswerID === answerID ? (
    <Card />
  ) : (
    <Card />
  );
}
