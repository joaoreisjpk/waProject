import {
  Button,
  Typography,
  Box,
  ButtonGroup,
  Grid,
  Stack,
} from '@mui/material';
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
  });

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
    ];

    if (index === questions.length - 1) {
      localStorage.setItem('resume', JSON.stringify(arrayAtt));
      setResume(arrayAtt);
      push('/resume');
      return;
    }

    setAnswersArray(arrayAtt);
    setIndex(index + 1);
  }

  return (
    <Grid>
      <Header />
      <Grid
        height='100%'
        maxWidth="900px"
        margin='auto'
        padding={5}
        container
        justifyContent='center'
        alignItems='center'
      >
        <Stack gap={8}>
          <Stack gap={2} direction="row" justifyContent="space-between">
            <Typography variant='h6'>
              Pergunta {index + 1} de {questions.length}
            </Typography>
            <Typography variant='h5'>{category}</Typography>
          </Stack>
          <Grid container margin="auto" gap={4}>
            <Stack width="100%">
              <Typography variant='h4' sx={{textAlign: "center", fontSize: '1.5rem', fontWeight: '600'}} maxWidth="574px" margin="auto">
                {handleSpecialCharacters(question)}
              </Typography>
            </Stack>
            <ButtonGroup
              orientation="vertical"
              sx={{
                minWidth: 300,
                margin: "auto",
              }}
              
            >
              {randomAnswers.map(({ id, answer }) => (
                <Button
                  
                  key={answer}
                  type='button'
                  sx={{
                    height: 40,
                    fontWeight: 600,
                    fontSize: '.9rem',
                    borderWidth: '2px',
                  }}
                  onClick={handleClick}
                  id={id}
                >
                  {answer}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
}
