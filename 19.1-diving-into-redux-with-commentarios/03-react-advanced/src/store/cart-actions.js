import { uiActions } from "./ui-slice";
import {cartActions} from './cart-slice';

// O Redux Thunk permite que você escreva ações assíncronas no Redux. Em vez de retornar um objeto de ação simples, você retorna uma função. 
// Essa função recebe 'dispatch' como parâmetro, o que permite disparar outras ações de dentro da função assíncrona.

// A ação 'sendCartData' é um "action creator" que retorna uma função assíncrona.
export const sendCartData = (cart) => {
  // A função retornada pelo 'sendCartData' recebe 'dispatch', que será usado para despachar ações.
  return async (dispatch) => {

    // Primeiro, despachamos uma ação de notificação que indica que os dados estão sendo enviados.
    dispatch(
      uiActions.showNotification({
        status: 'pending',  // Estado da notificação (pendente)
        title: 'Sending...', // Título da notificação
        message: 'Sending cart data...', // Mensagem informando que os dados estão sendo enviados
      })
    );

    // Criamos uma função assíncrona chamada 'sendRequest' que envia os dados do carrinho para a API.
    const sendRequest = async () => {
      // Usamos o método 'fetch' para fazer uma requisição HTTP PUT para enviar os dados do carrinho.
      const response = await fetch(
        'https://college-34d3b-default-rtdb.firebaseio.com/cart.json',  // URL para onde os dados são enviados
        {
          method: 'PUT',  // O método HTTP é PUT, o que significa substituir os dados existentes
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),  // Convertendo o objeto 'cart' para JSON antes de enviá-lo no corpo da requisição
        }
      );

      // Se a resposta não for OK (ou seja, um erro de rede ou resposta de erro da API), lançamos um erro.
      if (!response.ok) {
        throw new Error('Failed to send cart data.');  // Lançamos um erro caso a requisição falhe
      }
    };

    // Dentro do bloco try, tentamos despachar a notificação de sucesso.
    try {
      // Aguardamos que a função 'sendRequest' termine sua execução.
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',  // Estado da notificação (sucesso)
          title: 'Success!',  // Título da notificação
          message: 'Cart data sent successfully!',  // Mensagem informando que os dados foram enviados com sucesso
        })
      );
    } catch (error) {
      // Se algo der errado ao despachar a ação de sucesso, nós capturamos o erro aqui e despachamos uma notificação de erro.
      dispatch(
        uiActions.showNotification({
          status: 'error',  // Estado da notificação (erro)
          title: 'Error!',  // Título da notificação
          message: 'Cart data sent failed!',  // Mensagem informando que o envio dos dados falhou
        })
      );
    }
  };
};

// Função usada para carregar os items do carrinho quando eu entrar na página (eu tenho items no carrinho, se eu recarregar a página eu perco eles, isso evita esse comportamento)
export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch('https://college-34d3b-default-rtdb.firebaseio.com/cart.json');

      if(!response.ok) {
        throw new Error('Could not fetch card data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      // Chamo a função
      const cartData =  await fetchData();

      // Pego o retorno da função e busco os dados do meu carrinho e substituo
      // Pois quando eu recarrego a página eles somem, com isso, eu busco do meu bd tudo que estava no carrinho
      dispatch(cartActions.replaceCart(cartData));
    } catch(error) {
      // Se algo der errado ao despachar a ação de sucesso, nós capturamos o erro aqui e despachamos uma notificação de erro.
      dispatch(
        uiActions.showNotification({
          status: 'error',  // Estado da notificação (erro)
          title: 'Error!',  // Título da notificação
          message: 'Cart data sent failed!',  // Mensagem informando que o envio dos dados falhou
        })
      );
    }
  };
};
