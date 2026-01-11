import {useState, useEffect} from 'react';

export default function ProgressBar({timer}) {
  const [remainingTime, setRemainingTime] = useState(timer); 

  useEffect(() => {
    // É executada de x em x segundos, diferente de setTimeout, essa é executada
  // mais de uma vez
  const interval = setInterval(() => {
    setRemainingTime((prevTime) => prevTime - 10);
  }, 10);

  return () => {
    clearInterval(interval);
  }
  }, [])
  
  return (
    <progress value={remainingTime} max={timer} />
  )
}