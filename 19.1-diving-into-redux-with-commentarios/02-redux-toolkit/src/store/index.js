import counterSlice from "./counter";
import authSlice from "./auth";

import { configureStore } from "@reduxjs/toolkit";

// Aqui é onde eu configuro minhas funções do store, diferente do outro, eu posso ter várias
const store = configureStore({
  reducer: {counter: counterSlice.reducer, auth: authSlice.reducer}
});

export default store;