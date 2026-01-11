import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  // Serve para disparar os minhas funções reducers 
  // Posso ver em store/ui-slice | cart-slice
  const dispatch = useDispatch();

  // Use selector serve para pegar um valor do meu redux em tempo real
  // No caso, quero pegar um valor chamado cartIsVisible, para saber se eu mostro
  // ou não meu carrinho
  const showCart = useSelector(state => state.ui.cartIsVisible);

  const cart = useSelector(state => state.cart);

  const notification = useSelector(state => state.ui.notification);


  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {

    if(isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed) {
      dispatch(sendCartData(cart));
    }

    }, [cart, dispatch]);
  

  return (
    <>
     {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
