import { Button, Typography, Box} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useQuestions } from '../../context/useQuestions';
import { handleSpecialCharacters, shuffle } from '../../helpers';

export default function Questions() {
  const [index, setIndex] = useState(0);
  const [answersArray, setAnswersArray] = useState([]);
  const { push } = useRouter();
  const { questions, setResume } = useQuestions();
  
  const { category, correct_answer, difficulty, incorrect_answers, question } =
    questions[index];

  // Checando se 'questions' está com seu valor default
  useEffect(() => {
    if (!questions[0].category) {
      push('/');
      return;
    }
  })

  // randomizando ids marcar a resposta certa
  const randomID = () => Math.ceil(Math.random() * 10 ** 13).toString();
  const rightAnswerID = randomID();

  // ajeitando os caracteres especiais -> Entities
  const rightAnswer = handleSpecialCharacters(correct_answer);
  const wrongAnswers = incorrect_answers.map((item) => ({
    id: randomID(),
    answer: handleSpecialCharacters(item),
  }));

  // juntando e randomizando as respostas
  const answers = [...wrongAnswers, { id: rightAnswerID, answer: rightAnswer }];
  const randomAnswers = shuffle(answers);

  function handleClick({ target }) {
    const arrayAtt = [
      ...answersArray,
      {
        rightAnswerID,
        question,
        answerID: target.id,
        randomAnswers,
        difficulty,
      },
    ]

    if (index === questions.length - 1) {
      localStorage.setItem('resume', JSON.stringify(arrayAtt))
      setResume(arrayAtt)
      push('/resume');
      return;
    }

    setAnswersArray(arrayAtt);
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
        <Typography>{handleSpecialCharacters(question)}</Typography>

        {randomAnswers.map(({ id, answer }) => (
          <Button variant="contained" key={answer} type='button' onClick={handleClick} id={id}>
            {answer}
          </Button>
        ))}

      </Box>
    </section>
  );
}
