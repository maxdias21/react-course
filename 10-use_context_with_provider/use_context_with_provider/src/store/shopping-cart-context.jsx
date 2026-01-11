import { createContext } from 'react';

// Esses itens dentro do contexto só ajuda na hora de dar as dicas
// Exemplo dos items, como é uma lista, quando eu chamar isso em um outro lugar
// ele dá as dicas de array, tipo filter...
export const CartContext = createContext({
  items: [],
  addItemToCard: () => {}
});
