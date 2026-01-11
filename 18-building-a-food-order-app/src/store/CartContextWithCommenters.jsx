import { useReducer } from "react";
import { createContext } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {}
});

// State é o nosso estado atualizado
// Action é a ação que vamos realizar
function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    // Retorna -1 caso não encontre um item
    // Se encontrar o valor que eu quero, retorna o índice (posição) dele no array
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

    // Uma cópia do state.items para não modificar a original
    const updatedItems = [...state.items];

    // Se for maior que -1, significa que o item já existe
    if(existingCartItemIndex > -1) {
      // Estou pegando no array o meu item que possui +1
      const existingItem = state.items[existingCartItemIndex];

      // Aqui eu modifico alguns valores nele, no caso eu pego o item e adiciono +1 quantidade
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      }

      // Aqui eu altero a minha cópia do state.items
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // Aqui como só tem 1 item, eu adiciono apenas +1 quantidade
      updatedItems.push({...action.item, quantity: 1});
    }
    // Retorno o meu estado + item atualizado (um novo item ou um item existente com +1)
    return {...state, items: updatedItems};
  }

  if (action.type === 'REMOVE_ITEM') {
    // Retorna -1 caso não encontre um item
    // Se encontrar o valor que eu quero, retorna o índice (posição) dele no array
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

    // Pegar o valor que quero remover do array
    const existingCartItem = state.items[existingCartItemIndex];

    // Criar uma cópia imutável
    const updatedItems = [...state.items];

    // Se a quantidade for igual a 1, se eu remover vai para 0, logo eu quero pegar o item e fazer ele desaparecer do carrinho
    if(existingItem.quantity === 1) {
      // Splice funcionamento
      // Pega o índice e remove 1 valor 
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // Remover 1 item do carrinho (tem que ter mais de 1 do mesmo item)
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1
      };

      // Atualiza a quantidade de items
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {...state, items: updatedItems};
  }

  return state;
}

export function CartContextProvider({children}) {
  // useReducer(1 param, 2 param) = o primeiro é a função de callback que ele vai chamar, o segundo é o meu state
  // cart, dispatchCartAction = cart é o state atualizado, dispatch é onde colocamos o type/payload, quando ele é chamado
  // ele faz a função ser re renderizada
  const [cart, dispatchCartAction] =  useReducer(cartReducer, {items: []});

  function addItem(item) {
    dispatchCartAction({type: 'ADD_ITEM', item: item});
  }

  function removeItem(id){
    dispatchCartAction({type: 'REMOVE_ITEM', id: id});
  }

  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem
  }

  console.log(cartContext)

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;