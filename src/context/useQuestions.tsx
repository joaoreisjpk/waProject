import { createContext, useContext, useState } from 'react';
import { api } from '../api';

interface TransactionContextData {
  questions: any[];
  pontuation: number;
  fetchQuestions: (param: string) => void;
  pontuationAtt: (param: string) => void;
};

export const QuestionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [pontuation, setPontuation] = useState(0);
  
  async function fetchQuestions(param: string) {
    const response = await api.get(`api.php?amount=${param}`);
  
    const { results } = response.data;

    console.log(results);
    setQuestions(results);
  };

  function pontuationAtt(param: string) {
    if (param === 'easy') {
      setPontuation(pontuation + 10)
    } else if (param === 'medium') {
      setPontuation(pontuation + 20)
    } else {
      setPontuation(pontuation + 30)
    }
  }

  return (
    <QuestionsContext.Provider value={{ questions, fetchQuestions, pontuationAtt, pontuation }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export function useQuestions() {
  const context = useContext(QuestionsContext);

  return context;
}