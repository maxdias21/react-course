import classes from './CartButton.module.css';
import {uiActions} from '../../store/ui-slice';

import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  // Serve para disparar uma ação dos meus reducers
  const dispatch = useDispatch();

  // Pegar o meu initialState com o valor atualizado
  // Posso ver em store/cart-slice
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    // Vou disparar um reduce no meu arquivo /store/ui-slice.js
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
