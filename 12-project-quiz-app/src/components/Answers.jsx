import { useRef } from 'react';

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    // Embaralhar as perguntas (pois a primeira sempre é a correta)
  shuffledAnswers.current = [...answers];

  // Pesquisar mais sobre o método sort + random para embaralhar perguntas
  // Em python, temos isso com o método shuffle
  shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  
  return (
    <ul id="answers">
          {shuffledAnswers.current.map(answer => {
            const isSelected = selectedAnswer === answer;
            let cssClasses = '';

            if (answerState === 'answered' && isSelected) {
              cssClasses = 'selected';
            }

            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
              cssClasses = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button onClick={() => onSelect(answer)} className={cssClasses} disabled={answerState !== ''}>
                  {answer}
                </button>
              </li>
            )
          })}
        </ul>
  )
}