
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { uiActions } from './store/ui-slice';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector(state => state.cart);

  // Não posso usar esse tipo de função (useEffect) nos redutores, não é recomendado
  useEffect(() => {
    const sendCartData = async () => {
        dispatch(uiActions.showNotification({
        status: 'painding',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));

      const response = await fetch('https://college-34d3b-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT', 
        body: JSON.stringify(cart)
      });

      if(!response.ok) {
        throw new Error('Sending cart data failed');
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!'
      }));
    };

    if(isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sent cart data failed!'
      }));
    });
    // React redux garante que a função dispatch nunca irá mudar, vai ser sempre a mesma
    // Só coloquei pra me livrar da linha vermelha de erro que o react lança (não altera nada no funcionamento)
  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title}/>}
      <Layout>
        {showCart && <Cart />} 
        <Products />
      </Layout>
    </>
  );
}

export default App;
