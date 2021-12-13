import { Typography } from '@mui/material';
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
}

export default function AnswerCard({ cardObject }: AnswerCardProps) {
  const { randomAnswers, rightAnswerID, answerID, question } = cardObject;

  function Card({ title }: { title: string }) {
    return (
      <section key={rightAnswerID} style={{ margin: '2rem 0' }}>
        <Typography>{title}</Typography>
        <Typography>
          {handleSpecialCharacters(question)}
        </Typography>

        {randomAnswers.map(({ answer, id }) => {
          if (id === rightAnswerID) {
            return <Typography style={{ color: 'green' }}>{answer}</Typography>;
          } else if (id === answerID) {
            return <Typography style={{ color: 'red' }}>{answer}</Typography>;
          }
          return <Typography key='olar'>{answer}</Typography>;
        })}

      </section>
    );
  }

  return rightAnswerID === answerID ? (
    <Card title='Você acertou a resposta!' />
  ) : (
    <Card title='Você errou a resposta!' />
  );
}
