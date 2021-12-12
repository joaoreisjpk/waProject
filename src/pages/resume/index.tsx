import { Typography } from '@mui/material';
import React from 'react';
import Header from '../../components/Header';
import { useQuestions } from '../../context/useQuestions';

export default function Resume() {
  const { resume } = useQuestions();
  return (
    <div>
      <Header />
      {resume.map(({ randomAnswers, rightAnswerID, answerID, question }) => {
        {
          if (rightAnswerID === answerID) {
            return (
              <section key={rightAnswerID} style={{ margin: '2rem 0' }}>
                <Typography>Você acertou a resposta!</Typography>
                <Typography>{question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}</Typography>
                {randomAnswers.map(({ answer, id }) => {
                  if (id === rightAnswerID) {
                    return <Typography style={{ color: 'green' }}>{answer}</Typography>;
                  }
                  return <Typography key='olar'>{answer}</Typography>;
                })}
              </section>
            );
          }
          return (
            <section key={rightAnswerID} style={{ margin: '2rem 0' }}>
              <Typography>Você errou a resposta!</Typography>
              <Typography>{question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}</Typography>
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
      })}
    </div>
  );
}
