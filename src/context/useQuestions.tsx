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

interface QuestionsContextProps {
  questions: questionProps[];
  fetchQuestions: (param: string) => void;
  resume: resumeProps[];
  setResume: (param: resumeProps[]) => void;
  count: number;
};

export const QuestionsContext = createContext<QuestionsContextProps>(
  {} as QuestionsContextProps
);

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState<questionProps[]>(defaultQuestions as questionProps[]);
  const [resume, setResume] = useState<resumeProps[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setResume(JSON.parse(localStorage.getItem('resume') || '[]'))
  }, [])

  useEffect(() => {
    var counter = 0;
    resume.forEach((item) => item.answerID === item.rightAnswerID && (counter += 1))

    setCount(counter);
  }, [resume])

  async function fetchQuestions(param: string) {
    const response = await api.get(`api.php?amount=${param}`);
  
    const { results } = response.data;

    console.log(response);
    setQuestions(results);
  };

  useEffect(() => {
    
  }, [])

/*   function pontuationAtt(param: string) {
    if (param === 'easy') {
      setPontuation(pontuation + 10)
    } else if (param === 'medium') {
      setPontuation(pontuation + 20)
    } else {
      setPontuation(pontuation + 30)
    }
  } */

  return (
    <QuestionsContext.Provider value={{ questions, fetchQuestions, resume, setResume, count }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export function useQuestions() {
  const context = useContext(QuestionsContext);

  return context;
}