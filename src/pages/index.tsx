import { Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../components/Header';
import { useQuestions } from '../context/useQuestions';

import SendIcon from '@mui/icons-material/Send';

export default function Home() {
  const [question, setQuestion] = useState<string>('1');
  const { push } = useRouter();
  const { fetchQuestions, questions } = useQuestions();

  const onSubmit = (e): void => {
    e.preventDefault();
    fetchQuestions(question);
    push('/start');
  };

  return (
    <div>
      <Header />
      
      <form onSubmit={onSubmit}>
        <label>
          <Typography>How many questions?</Typography>
          
        </label>
        <TextField
            type='number'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            variant='outlined'
            color='secondary'
            label='Number'
          />
        <Button endIcon={<SendIcon />} size="large" type='submit' variant="contained">Enviar</Button>
      </form>
    </div>
  );
}
