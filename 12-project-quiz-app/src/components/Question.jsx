import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

import QUESTIONS from '../questions.js';

import { useState } from 'react';

export default function Question({index, onSelectAnswer, onSkipAnswer}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  let timer = 1000;

  if(answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectedAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    })

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
      })

    setTimeout(() => {
      onSelectAnswer(answer);
    }, 2000);
    }, 1000);
  }

  let answerState = '';

  if(answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if(answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      {/* Um componente só vai ser recriado quando algo nele mudar, para recomeçar o cronometro, usei essa key, 
      significa que sempre que a variável dentro dela mudar, o react recria o componente */}
      {/* Uma key só pode ser usada em um componente de cada vez, ou seja, se eu tiver dois elementos filhos e eles usarem
      a mesma key, vai dar erro.
       */}
       {/* Supondo que esse QuestionTimer tenha componentes filhos, eles também serão re renderizados */}
      <QuestionTimer timeout={timer} onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} mode={answerState} key={timer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers 
      answers={QUESTIONS[index].answers} 
      selectedAnswer={answer.selectedAnswer}  
      answerState={answerState}
      onSelect={handleSelectedAnswer}
      />
    </div>
  )
}