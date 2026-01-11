import { useState, useEffect } from 'react';

export default function QuestionTimer({timeout, onTimeout, mode}) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const interval = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(interval);
    }
  }, [timeout, onTimeout])
  

  // Função do cronômetro
  // Essa função vai ficar renderizando o componente sempre que eu diminuir meu
  // cronômetro, a de cima por outro lado, apenas quando tiver alteração nas
  // props
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])
 
  return (
    <progress id="question-time" max={timeout} value={remainingTime} className={mode}/>
  )
}