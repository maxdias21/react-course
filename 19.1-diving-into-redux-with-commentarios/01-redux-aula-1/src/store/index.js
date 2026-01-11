import { createStore } from "redux";

// Aqui é onde a função principal é chamada, geralmente tenho vários IF, pois ela pode ter várias action (como incremento/decremento...)
// action.type === 'increment' -> faça algo | action.type === 'decrement' -> faça outra coisa
// Posso passar params também, no caso, ele fica em action, no caso, o meu contador pode adicionar de x em x, no caso, ficou
// action.amount
// ps: posso ver isso em components/Counter.js
// -------------------------------------------- //
// Ela recebe um state que é o estado inicial *para não ser undefined
// Ele cria esse estado inicial apenas na primeira vez que é chamado
// -------------------------------------------- //
// Aqui tem que ser uma função pura, não se usa nenhum hook do react, nem localStorage do navegador, nem requisição do bd
const counterReducer = (state = {counter: 0, showCounter: true}, action) => {
  if(action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter
    }
  }

  if(action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    }
  }

  if(action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    }
  }

  if(action.type === 'toggle') {
    return {
      showCounter: !state.showCounter,
      counter: state.counter 
    }
  }

  // IMPORTANTE, NUNCA ALTERE O VALOR ANTIGO
  // Não estou usando return, porém isso funcionaria
  // Não faça isso pois objetos/tuplas são IMUTÁVEIS, logo sempre retorne um objeto atualizado
  // NUNCA ALTERE O VALOR ANTIGO
  if(action.type === 'neverDoIt') {
    state.counter++;
  }

  return state;
};

// Aqui é onde crio o coração do redux
// Eu passo uma função que vai ser usada para criar o local onde o app é mantido
// Essa função que eu passo é responsável por gerenciar toda a lógica do meu store
const store = createStore(counterReducer);

export default store;