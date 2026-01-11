// Importar redux usando node
const redux = require('redux');

// Aqui é a função que vai ser armazenada no store, aqui é onde definimos as propriedades
// No caso, estou criando um counter que vai retornar ele próprio +1

// No state, tem que colocar um valor inicial pois no caso o state seria undefined, aí daria erro
// Não preciso de um valor padrão caso eu retorne apenas o state
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1
    }
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1
    }
  }

  return state;
};

// Criar um armazenamento (tipo useContext())
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  // Aqui estou recebendo os últimos dados do meu state (ou seja, eles atualizados)
  const latestState = store.getState();
};

// Aqui é quando o redux vai basicamente executar tudo, ele sempre vai atualizar quando algo no meu state mudar
store.subscribe(counterSubscriber);

// Aqui eu estou chamando novamente minha função counterSubscriber
// Eu passo um parametro chamado type que o counterReducer vai receber no param action, lá posso fazer algumas checagens
// Funcionalidade = adicionar ao counter + 1
store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});

// Funcionalidade = remover do counter 1
store.dispatch({type: 'decrement'})
console.log(store.getState())

