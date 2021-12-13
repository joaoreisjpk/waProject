import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';

interface questionProps {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
}

interface resumeProps {
  rightAnswerID: string;
  answerID: string;
  randomAnswers: { id: string, answer: string}[];
  difficulty: string;
  question: string;
}

const defaultQuestions = [{
  category: '',
  correct_answer: '',
  difficulty: '',
  incorrect_answers: [''],
  question: '',
}]

interface TransactionContextData {
  questions: questionProps[];
  fetchQuestions: (param: string) => void;
  resume: resumeProps[];
  setResume: (param: resumeProps[]) => void;
};

export const QuestionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }) {
  const [questions, setQuestions] = useState<questionProps[]>(defaultQuestions as questionProps[]);
  const [resume, setResume] = useState<resumeProps[]>([]);

  useEffect(() => {
    setResume(JSON.parse(localStorage.getItem('resume') || '[]'))
  }, [])

  async function fetchQuestions(param: string) {
    const response = await api.get(`api.php?amount=${param}`);
  
    const { results } = response.data;

    console.log(response);
    setQuestions(results);
  };

  useEffect(() => {
    
  }, [])
/* 
  function pontuationAtt(param: string) {
    if (param === 'easy') {
      setPontuation(pontuation + 10)
    } else if (param === 'medium') {
      setPontuation(pontuation + 20)
    } else {
      setPontuation(pontuation + 30)
    }
  } */

  return (
    <QuestionsContext.Provider value={{ questions, fetchQuestions, resume, setResume }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export function useQuestions() {
  const context = useContext(QuestionsContext);

  return context;
}