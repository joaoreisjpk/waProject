import React from 'react'
import { useQuestions } from '../../context/useQuestions';

export default function Resume() {
  const { pontuation } = useQuestions();
  return (
    <div>
      { pontuation }
    </div>
  )
}
