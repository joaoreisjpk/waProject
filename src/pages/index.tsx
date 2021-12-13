import { Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Header from '../components/Header';
import { useQuestions } from '../context/useQuestions';
import { Formik } from 'formik';

import SendIcon from '@mui/icons-material/Send';

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { push } = useRouter();
  const { fetchQuestions, resume } = useQuestions();

  const onSubmit = (e): void => {
    e.preventDefault();

    if (Number(question) && Number(question) > 0 && Number(question) <= 50) {
      fetchQuestions(question);
      push('/start');
    } else {
      setError('Insira um número de 1 a 50');
      return;
    }
  };

  return (
    <div>
      <Header />

      <Formik initialValues={{ questionNumber: '' }} onSubmit={data => console.log(data)}>
        {() => (
          <form onSubmit={onSubmit}>
            <label>
              <Typography>How many questions?</Typography>
            </label>
            <TextField
              type='text'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              error={!!error}
              helperText={error}
              variant='outlined'
              color='secondary'
              label='Number'
            />
            <Button
              endIcon={<SendIcon />}
              size='large'
              type='submit'
              variant='contained'
            >
              Enviar
            </Button>
          </form>
        )}
      </Formik>
      {!!resume.length && (
        <Button
          endIcon={<SendIcon />}
          size='large'
          type='submit'
          variant='contained'
          onClick={() => push('/resume')}
        >
          Ver antigo Relatório
        </Button>
      )}
    </div>
  );
}
