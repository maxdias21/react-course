// Importar redux
// ps: é um pouco diferente, pois não tem import from
const redux = require('redux');


// Aqui é onde a função principal é chamada, geralmente tenho vários IF, pois ela pode ter várias action (como incremento/decremento...)
// action.type === 'increment' -> faça algo | action.type === 'decrement' -> faça outra coisa
// -------------------------------------------- //
// Ela recebe um state que é o estado inicial *para não ser undefined
// Ele cria esse estado inicial apenas na primeira vez que é chamado
// -------------------------------------------- //
// Aqui tem que ser uma função pura, não se usa nenhum hook do react, nem localStorage do navegador, nem requisição do bd
const counterReducer = (state = {counter:0}, action) => {
  if(action.type === 'increment') {
    return {
      counter: state.counter + 1
    };
  }

  if(action.type === 'decrement') {
    return {
      counter: state.counter - 1
    };
  }

  return state;
};

// Aqui é onde crio o coração do redux
// Eu passo uma função que vai ser usada para criar o local onde o app é mantido
// Essa função que eu passo é responsável por gerenciar toda a lógica do meu store
const store = redux.createStore(counterReducer);

// Função que eu uso no store.subcribe()
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// Sempre que o meu store for atualizado, ele chama esse subscribe automaticamente
// Nesse caso, quando eu atualizar os dados do meu store (se retornar valor igual, ele não é executado), ele vai chamar ou executar alguma 
// função, nesse caso, quando meus dados do store forem atualizados ele chama a função counterSubscriber, pois eu passei ela como param
// -------------------------------------------- //
// ELE NÃO ALTERA DADOS DO STORE, MAS EU POSSO VER OS DADOS QUE EXISTE, NA VERDADE, EU POSSO VER EM QUALQUER LUGAR DO MEU CÓDIGO
// USANDO store.getState();
store.subscribe(counterSubscriber);

// Aqui é onde eu chamo a função (no caso, a função que eu registrei quando usei o createStore)
// Posso passar um type, isso é um identificador para saber o que fazer quando a função for chamada, expliquei isso na função acima, 
// chamada counterReducer()
store.dispatch({type: 'increment'});

store.dispatch({type: 'decrement'});