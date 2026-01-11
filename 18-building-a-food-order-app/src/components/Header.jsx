import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';

// Components
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContent from '../store/UserProgressContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContent);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  },0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant"/>
        <h1>Max's restaurant</h1>
      </div>
      <nav>
       <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}