import { createSlice } from "@reduxjs/toolkit";

// Toda a explicação está em um outro projeto chamado 19.1-diving-into-redux-with-commentarios/02-redux-toolkit
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      // Aqui é as informações do item que eu estou recebendo quando eu clico no botão de "Add to Cart"
      const newItem = action.payload;

      // Aqui é o items do initialState, estou verificando se o newItem que eu estou recebendo já foi adicionado antes no carrinho
      const existingItem = state.items.find(item => item.id === newItem.id);

      // Sempre que eu clicar em Add To Cart, eu adiciono +1 ao meu carrinho
      // Ou seja, tenho 1 item, clico em Add, agora tenho 2, clico em add (mesmo se for o mesmo produto), agora tenho 3...
      state.totalQuantity++;

      state.changed = true;

      // Se não existir nenhum newItem, eu adiciono ele no meu array de items
      if(!existingItem) {
        state.items.push({
          id: newItem.id, 
          price: newItem.price, 
          quantity: 1, 
          totalPrice: newItem.price,
          name: newItem.title
        });
      } else {
        // Caso eu já tenha um produto cadastrado e queira cadastrar o mesmo novamente, ele entra aqui
        // Só atualizo a quantidade e o preço total do mesmo produto

        // Aqui eu filtrei um item do array e estou modificando
        // Como eu filtrei algo do state, o toolkit consegue atualizar pra mim sem precisar fazer spread ou retornar algo
        // Peguei algo do state e atualizei = toolkit atualiza pra mim de forma automática
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemToCart(state, action) {
      // Vou pegar o id e logo abaixo filtrar esse item para checar se existe no meu array de items
      const id = action.payload;
      const existingItems = state.items.find(item => item.id === id);

      // Aqui quando eu clicar em remover um item do carrinho, eu removo -1
      state.totalQuantity --;
      
      // Se a quantidade de itens for 1, no primeiro if ele vai pra 0, ou seja, deleto do carrinho
      // Se a quantidade for maior que 1, eu apenas removo 1 mas mantenho o item no carrinho
      if(existingItems.quantity === 1) {
        // Aqui eu estou pegando o id de todos os items no meu array, se algum deles bater com o id que quero remover
        // eu removo apenas ele do array
        // Basicamente isso retorna true/false, o que for true ele mantém no array
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItems.quantity--;
        existingItems.totalPrice = existingItems.totalPrice - existingItems.price;
      }
    },
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;