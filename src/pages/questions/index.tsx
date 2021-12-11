import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuestions } from '../../context/useQuestions';
import { shuffle } from '../../helpers';

export default function Questions() {
  const [index, setIndex] = useState(0);
  const { push } = useRouter();
  const { questions, pontuationAtt } = useQuestions();

  const randomID = () => Math.ceil(Math.random() * 10000000).toString();
  const rightAnswerID = randomID();

  const {
    category,
    correct_answer: rightAnswer,
    difficulty,
    incorrect_answers: wrongAnswer,
    question,
    type,
  } = questions[index];

  function handleClick({ target }) {
    if (index === questions.length - 1) {
      push('/resume')
      return;
    }
    if (target.id === rightAnswerID) {
      pontuationAtt(difficulty);
    }
    setIndex(index + 1)
  }

  const answers = () => (
    [...wrongAnswer, rightAnswer].map((item, i) => {
      if (i === wrongAnswer.length) {
        return (
          <button
            key={item}
            type="button"
            onClick={handleClick}
            id={rightAnswerID}
          >
            {item}
          </button>
        )
      } else {
        return (
          <button
            key={item}
            type="button"
            onClick={handleClick}
            id={randomID()}
          >
            {item}
          </button>
        )
      }
    })
  )

  return (
    <section>
      <div>Pergunta {index + 1} de {questions.length}</div>
      <div>{category}</div>
      <div>{question}</div>
      { shuffle(answers()) }
    </section>
  );

}
