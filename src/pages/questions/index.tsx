import { Button, Typography, Box} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../components/Header';
import { useQuestions } from '../../context/useQuestions';
import { shuffle } from '../../helpers';

export default function Questions() {
  const [index, setIndex] = useState(0);
  const { push } = useRouter();
  const { questions, resume, setResume } = useQuestions();

  const randomID = () => Math.ceil(Math.random() * 10 ** 13).toString();
  const rightAnswerID = randomID();

  const { category, correct_answer, difficulty, incorrect_answers, question } =
    questions[index];

  const rightAnswer = correct_answer
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

  const wrongAnswers = incorrect_answers.map((item) => ({
    id: randomID(),
    answer: item.replace(/&quot;/g, '"').replace(/&#039;/g, "'"),
  }));

  const answers = [...wrongAnswers, { id: rightAnswerID, answer: rightAnswer }];

  const randomAnswers = shuffle(answers);

  function handleClick({ target }) {
    setResume([
      ...resume,
      {
        rightAnswerID,
        question,
        answerID: target.id,
        randomAnswers,
        difficulty,
      },
    ]);

    if (index === questions.length - 1) {
      push('/resume');
      return;
    }

    setIndex(index + 1);
  }

  return (
    <section>
      <Header />
      <Box padding={20}>
        <Typography>
          Pergunta {index + 1} de {questions.length}
        </Typography>
        <Typography>{category}</Typography>
        <Typography>{question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}</Typography>
        {randomAnswers.map(({ id, answer }) => (
          <Button variant="contained" key={answer} type='button' onClick={handleClick} id={id}>
            {answer}
          </Button>
        ))}
      </Box>
    </section>
  );
}
