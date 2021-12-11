import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuestions } from '../../context/useQuestions';
import { shuffle } from '../../helpers';

export default function Questions() {
  const [index, setIndex] = useState(0);
  const { push } = useRouter();
  const { questions, resume, setResume } = useQuestions();

  const randomID = () => Math.ceil(Math.random() * (10 ** 13)).toString();
  const rightAnswerID = randomID();

  const {
    category,
    correct_answer: rightAnswer,
    difficulty,
    incorrect_answers,
    question,
  } = questions[index];

  const wrongAnswers = incorrect_answers.map(item => (
    { id: randomID(), answer: item }
  ))

  const answers = [
    ...wrongAnswers,
    { id: rightAnswerID, answer: rightAnswer}
  ];

  const randomAnswers = shuffle(answers);

  function handleClick({ target }) {
    setResume([...resume, { rightAnswerID, question, answerID: target.id, randomAnswers, difficulty}])

    if (index === questions.length - 1) {
      push('/resume')
      return;
    }

    setIndex(index + 1)
  }

  return (
    <section>
      <div>Pergunta {index + 1} de {questions.length}</div>
      <div>{category}</div>
      <div>{question}</div>
      { randomAnswers.map(({ id, answer }) => (
        <button
          key={answer}
          type="button"
          onClick={handleClick}
          id={id}
        >
          {answer}
        </button>
      )) }
    </section>
  );

}
