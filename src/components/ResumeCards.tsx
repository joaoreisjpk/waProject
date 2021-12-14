import { Button as MUIButton, ButtonGroup, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useQuestions } from '../context/useQuestions';
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

export default function ResumeCard({ cardObject, index }: AnswerCardProps) {
  const { randomAnswers, rightAnswerID, answerID, question } = cardObject;

  const Button = ({ color, answer }: { color: string; answer: string }) => (
    <MUIButton
      disabled
      style={{
        color,
        minWidth: '300px',
        fontWeight: '600',
      }}
    >
      {answer}
    </MUIButton>
  );

  return (
    <section key={rightAnswerID}>
      <Typography variant='h5'>
        {index + 1 + ' - ' + handleSpecialCharacters(question)}
      </Typography>

      <ButtonGroup orientation='vertical' sx={{ margin: '1rem 2rem' }}>
        {randomAnswers.map(({ answer, id }) => {
          if (id === rightAnswerID)
            return <Button answer={answer} color='green' />;
          else if (id === answerID)
            return <Button answer={answer} color='red' />;

          return <Button key={id} answer={answer} color='gray' />;
        })}
      </ButtonGroup>
    </section>
  );
}
