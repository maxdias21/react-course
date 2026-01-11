import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store/index';

import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Temos que passar o Provider na hierarquia mais alta pois a minha loja do redux vai estar disponíveis para todos os filhos de Provider
// Provider recebe um store, que é o store que criamos em store/index.js
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
