import classes from './Counter.module.css';

import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  // Isso permite que eu busque um valor do meu state no store do redux
  // Posso ver meus itens de state indo em store/index.js -> counterReducer()
  // No caso, quero pegar o valor de counter
  // Sempre que um valor mudar, o useSelector vai re renderizar o componente
  const counter = useSelector(state => state.counter);

  const show = useSelector(state => state.showCounter);

  // Permite chamar a função principal, fica em store/index.js -> counterReducer();
  // No caso, aqui criamos ela para usar nas nossas funções mais abaixo, incrementHandler | decrementHandler
  const dispatch = useDispatch();

  // Aqui chamos as funções, uma para aumentar o contador e a outra para diminuir o contador
  // Quando eu diminuo/aumento, o valor do meu state muda, fazendo a re renderização do componente
  // Por isso quando aumento/diminuo o valor, ele é mostrado atualizado na tela
  // ----------------------------------- //
  // dispatch recebe o type, para saber na função store/index.js -> counterReducer() o que executar.
  const incrementHandler = () => {
    dispatch({type: 'increment'});
  };

  const decrementHandler = () => {
    dispatch({type: 'decrement'});
  };

  // Aqui eu passei uma propriedade extra, no qual aumenta o valor do contador de x em x
  // Mostro isso no store do redux, em /store/index.js em counterReducer()
  const increaseHandler = () => {
    dispatch({type: 'increase', amount: 5 });
  };

  const toggleCounterHandler = () => {
    dispatch({type: 'toggle'});
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
