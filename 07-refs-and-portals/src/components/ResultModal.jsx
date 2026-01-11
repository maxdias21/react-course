import {forwardRef, useImperativeHandle, useRef} from 'react';
import {createPortal} from 'react-dom';

// Para usar uma referência de um componente para outro, preciso usar o forwardRef, e ter uma prop chamada ref
// Esse ref é o componente que vai usar isso como referência, no caso uma variável no TimerChallange
const ResultModal = forwardRef(function ResultModal({onReset, result, targetTime, remainingTime}, ref) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattingTRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // No caso, o objeto que faz referê8ncia em TimerChallenge vai receber uma função que está ligada com o meu dialog (elemento HTML)
  // Eu uso isso lá na referência dele ao invés de usar aqui
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  });

  // Create portal serve para organizar nosso HTMl na dom
  // No caso o meu modal ficava lá na parte de baixo, posso organizar usando isso
  // Tem que usar o document.getElementById para mudar de posição
  // No index.html, tem um id onde quero que fique meu modal
  return createPortal(
    <dialog ref={dialog} className='result-modal' onClose={onReset}>
      {userLost && <h2>Your {result} </h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the timer with <strong>{formattingTRemainingTime} seconds left.</strong></p>
      <form method='dialog' onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
})

export default ResultModal;