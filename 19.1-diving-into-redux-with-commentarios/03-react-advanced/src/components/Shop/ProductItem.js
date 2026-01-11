import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

import { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
  // Serve para disparar os minhas funções reducers 
  // Posso ver em store/ui-slice | cart-slice
  const dispatch = useDispatch();

  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    // Disparo as ações passando as props (no caso, se chama payload)
    dispatch(cartActions.addItemToCart(
      {id: id, title, price}
    ));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
