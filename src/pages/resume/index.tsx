import { Typography } from '@mui/material';
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
    <div>
      <Header />
      {resume.map((item: resumeProps) => (
        <ResumeCards cardObject={item} key={item.rightAnswerID} />
      ))}
    </div>
  );
}
