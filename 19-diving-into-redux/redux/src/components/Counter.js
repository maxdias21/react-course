import classes from './Counter.module.css';

import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  // Função para chamar o nosso contexto e passar algumas informações pra ele (state/action)
  const dispatch = useDispatch();

  // Aqui estou usando o selector para obter os dados (no caso apenas counter) do meu contexto (useContext) mas versão redux
  const counter =  useSelector(state => state.counter);

  const show = useSelector(state => state.showCounter);

  const incrementHandler = () => {
    dispatch({type: 'increment'})
  };

  const decrementHandler = () => {
    // Aqui funciona igual o useContext, passo a função de dispatch e um type, lá em store/index.js eu configurei o decrement/increment
    dispatch({type: 'decrement'})
  };

  const increaseHandler = () => {
    dispatch({type: 'increase', amount: 5})
  }

  // Sumir com o contador na tela caso seja verdadeiro
  const toggleCounterHandler = () => {
    dispatch({type: 'toggle'})
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
