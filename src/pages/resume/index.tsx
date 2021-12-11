import React from 'react';
import { useQuestions } from '../../context/useQuestions';

export default function Resume() {
  const { resume } = useQuestions();
  return (
    <div>
      {resume.map(({ randomAnswers, rightAnswerID, answerID, question }) => {
        {if (rightAnswerID === answerID) {
          return (
            <section key={rightAnswerID} style={{ margin: '2rem 0' }}>
              <div>Você acertou a resposta!</div>
              <div>{question}</div>
              {randomAnswers.map(({ answer, id }) => {
                if (id === rightAnswerID) {
                  return <div style={{ color: 'green' }}>{answer}</div>;
                }
                return (
                  <div key='olar'>
                    {answer}
                  </div>
                );
              })}
            </section>
          )
        } return (
          <section key={rightAnswerID} style={{ margin: '2rem 0' }}>
            <div>Você errou a resposta!</div>
            <div>{question}</div>
            {randomAnswers.map(({ answer, id }) => {
              if (id === rightAnswerID) {
                return <div style={{ color: 'green' }}>{answer}</div>;
              } else if (id === answerID) {
                return <div style={{ color: 'red' }}>{answer}</div>;
              }
              return (
                <div key='olar'>
                  {answer}
                </div>
              );
            })}
          </section>
        )}        
      })}
    </div>
  );
}
