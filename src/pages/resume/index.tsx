import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import ResumeCards from '../../components/ResumeCards';
import Header from '../../components/Header';
import { useQuestions } from '../../context/useQuestions';

interface resumeProps {
  rightAnswerID: string;
  answerID: string;
  randomAnswers: { id: string, answer: string}[];
  difficulty: string;
  question: string;
}

export default function Resume() {
  const { resume } = useQuestions();
  return (
    <Grid container direction="column">
      <Header />
      <Stack gap={3} direction="column" margin="auto" padding={5}>
        <Typography variant="h2">Resume</Typography>
        {resume.map((item: resumeProps, index: number) => (
          <ResumeCards index={index} cardObject={item} key={item.rightAnswerID} />
        ))}
      </Stack>
    </Grid>
  );
}
