import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };
// Com toolkit, não precisamos daqueles tantos de "IF"
// Também podemos colocar ++ para manipular arrays ou objetos, pois ele cria uma cópia e garante que os dados não serão perdidos
// Do outro modelo, pode fazer isso também, mas não é recomendado
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
    toggleCounter(state){
      state.showCounter = !state.showCounter;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    }
  }
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;