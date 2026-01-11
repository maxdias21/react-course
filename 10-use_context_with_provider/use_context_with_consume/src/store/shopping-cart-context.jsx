import { createContext, useState, useReducer} from 'react';

import {DUMMY_PRODUCTS} from '../dummy-products';

// Só ajuda no preenchimento automático
export const CartContext = createContext({
  items: [],
  addItemToCard: () => {},
  updateItemQuantity: () => {}
});

// action são os params que passamos
// state é o estado mais atual
function shoppingCardReducer(state, action) {
    if(action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(
          (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          const product = DUMMY_PRODUCTS.find((product) => product.id === id);
          updatedItems.push({
            id: payload.id,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }

        return {
          items: updatedItems
        }
  }

    if(action.type === 'UPDATE_ITEM'){
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
  return state;
}

export default function CartConstProvider({children}) {
  // O primeiro args e o estado, e o segundo é o que chama a função (no caso shoppingCardReducer)
  // Dentro de useReducer eu passo a função que eu quero que ele chame e posso passar um segundo param que é um valor
  // inicial para o state
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCardReducer, {items: []});

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type:'UPDATE_ITEM',
      payload: {productId, amount}
    })
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCard: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity
  }

  return <CartContext.Provider value={ctxValue}>
    {children}
  </CartContext.Provider>
}