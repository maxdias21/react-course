import classes from './Counter.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store/counter';

const Counter = () => {
  // Serve para pegar os valores atualizados do meu initialState (props iniciais)
  // Posso ver eles em uma variável chamada initialState no arquivo store/index.js
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  // Aqui serve para chamar as funções que eu criei no arquivo store/index.js -> counterSlice
  const dispatch = useDispatch();


  // Aqui chamo as funções
  // Diferente do redux (sem toolkit), aqui eu chamo a função do arquivo que eu exportei em store/index.js -> counterActions
  // Não preciso usar type: increment
  // Agora fica mais fácil de usar, pois agora tem typagem
  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(5));
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {/* Mostrando o valor atual do contador */}
      {/* Oculta/mostra o contador */}
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Incremento</button>
        <button onClick={increaseHandler}>Aumentar +5</button>
        <button onClick={decrementHandler}>Decremento</button>
      </div>
      {/* Oculta ou mostra o contador clicando nele */}
      <button onClick={toggleCounterHandler}>{show ? 'Mostrar' : 'Ocultar'} contador</button>
    </main>
  );
};

export default Counter;
