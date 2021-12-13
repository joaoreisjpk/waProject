import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, useField, FieldAttributes } from 'formik';
import { useQuestions } from '../context/useQuestions';
import { green } from '@mui/material/colors';

import {
  Button,
  TextField,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import Header from '../components/Header';

import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import FileOpenIcon from '@mui/icons-material/FileOpen';

export default function Home() {
  const { push } = useRouter();
  const { fetchQuestions, resume } = useQuestions();

  const submitHandler = async (data, { setSubmitting }) => {
    setSubmitting(true);
    await fetchQuestions(data.questionNumber);
    push('/start');
  };

  const validate = (param) => {
    if (Number(param) && Number(param) > 0 && Number(param) <= 50) {
      return {};
    }
    return { questionNumber: 'Insira um número de 1 a 50' };
  };

  type MyRadioProps = { label: string } & FieldAttributes<{}>;

  const MUInput: React.FC<MyRadioProps> = ({ label, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
      <TextField
        type='number'
        error={!!errorText}
        helperText={errorText}
        variant='outlined'
        color='secondary'
        margin='none'
        id='questionNumber'
        label='Number'
        {...field}
        sx={{
          width: 265,
        }}
      />
    );
  };

  return (
    <div>
      <Header />

      <Formik
        initialValues={{ questionNumber: '' }}
        validate={({ questionNumber: param }) => validate(param)}
        onSubmit={async (param1, param2) => await submitHandler(param1, param2)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid
              container
              marginTop='3rem'
              gap={8}
              justifyItems='center'
              direction='column'
              justifyContent='center'
              alignItems='center'
            >
              <Typography
                variant='h3'
                component='label'
                htmlFor='questionNumber'
                marginBottom='20px'
              >
                How many questions?
              </Typography>
              <Stack spacing={2}>
                <MUInput name='questionNumber' type='input' label='Number' />{' '}
                <Button
                  endIcon={isSubmitting ? null : <SendIcon />}
                  disabled={isSubmitting}
                  type='submit'
                  size='large'
                  variant='contained'
                  sx={{
                    width: 265,
                  }}
                >
                  {isSubmitting && (
                    <CircularProgress
                      color='secondary'
                      size={24}
                      sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                  Enviar
                </Button>
                {!!resume.length && (
                  <Button
                    size='large'
                    variant='contained'
                    endIcon={<FileOpenIcon />}
                    onClick={() => push('/resume')}
                    sx={{
                      width: 265,
                    }}
                  >
                    Ver antigo Relatório
                  </Button>
                )}
              </Stack>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}
