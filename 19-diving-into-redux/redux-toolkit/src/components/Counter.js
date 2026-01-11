// Alguns comentários foram removidos mas mantido nos outros arquivos
// Não precisamos mais fazer type=""... agora fica bem mais fácil

import classes from './Counter.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const counter =  useSelector(state => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(5)); // Type é definido automaticamente, payload são os args agora (o número 5 no caso)
  }

  // Sumir com o contador na tela caso seja verdadeiro
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
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
