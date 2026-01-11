import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {counter: 0, showCounter: true}

// Com toolkit, eu não preciso mais daqueles IFS
// Eu crio um slice com um name, um initialState (meus params iniciais) e as funções (reducers)
// Esse slice é do contador
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});

// Agora para mim chamar minhas funções, eu chamo counterSlice.actions.increment (exemplo)
// Eu dou um export nisso e agora eu não tenho chance de chamar uma função que não existe, pois eu coloco counterSlice.actions.increment
// Ele faz typing automáticamente para nós, ou seja, ele dá do nome dos nossos reduces, ou seja, quando eu chamar countersActions. ele dá
// as dicas pra gente (nesse caso, increment, decrement, increase e toggleCounter)
export const counterActions = counterSlice.actions;

export default counterSlice;