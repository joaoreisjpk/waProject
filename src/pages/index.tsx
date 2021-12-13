import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, useField, FieldAttributes } from 'formik';
import { useQuestions } from '../context/useQuestions';

import { Button, TextField, Typography } from '@mui/material';
import Header from '../components/Header';

import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

export default function Home() {
  const { push } = useRouter();
  const { fetchQuestions, resume } = useQuestions();

  const submitHandler = async (data, { setSubmitting }) => {
    setSubmitting(true);
    await fetchQuestions(data.questionNumber);
    push('/start');
  }

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
        type="number"
        error={!!errorText}
        helperText={errorText}
        variant='outlined'
        color='secondary'
        label='Number'
        {...field}
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
            <label>
              <Typography>How many questions?</Typography>
            </label>
            <MUInput name='questionNumber' type='input' label='sei la' />
            <Button
              endIcon={
                isSubmitting ? (
                  <CircularProgress color='secondary' />
                ) : (
                  <SendIcon />
                )
              }
              size='large'
              type='submit'
              variant='contained'
              disabled={isSubmitting}
            >
              {isSubmitting ? '' : 'Enviar'}
            </Button>
          </Form>
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
