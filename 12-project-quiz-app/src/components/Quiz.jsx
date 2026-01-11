// React states
import { useState, useCallback } from 'react';

// Components
import Question from './Question.jsx';
import Summary from './Summary.jsx';

import QUESTIOSNS from '../questions.js';
import imgQuizComplete from '../assets/quiz-complete.png';




export default function Quiz() {
  // Armazenar as respostas do usuário
  const [usersAnswers, setUserAnswers] = useState([]);

  // Para saber qual pergunta o usuário está
  const activeQuestionIndex = usersAnswers.length;

  // Saber se o quiz foi completado
  const quizIsComplete = activeQuestionIndex === QUESTIOSNS.length;

  // Selecionar a resposta
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    } );
  }, [])
 
  const handleSkipAnswer = useCallback(() => {
    return () => handleSelectAnswer(null);
  }, [handleSelectAnswer]);
  
   // Se o quiz for completado, usa esse return ao invés do mais abaixo
   if(quizIsComplete) {
    return (
      <Summary userAnswers={usersAnswers} />
    )
  }

  
  return (
    <div id="quiz">
      <Question 
      onSelectAnswer={handleSelectAnswer}
      onSkipAnswer={handleSkipAnswer}
      key={activeQuestionIndex}
      index={activeQuestionIndex}
      />
      {/* Não posso usar key em dois elementos filhos
      index/key são a mesma coisa, como key é reservado pelo react, em Question ia dar erro ao tentar usar
      */}
    </div>
  );
  
}