import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthentication: false,
};

// Esse slice é do auth
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthentication = true
    },
    logout(state) {
      state.isAuthentication = false
    }
  }
});

// Comentário explicando no store/counter.js
export const authActions = authSlice.actions;

export default authSlice;