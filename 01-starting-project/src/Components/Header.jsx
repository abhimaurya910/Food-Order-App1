import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './Button.jsx';
import CartContext from '../Store/ContextCart.jsx';
import UserProgressContext from '../Store/UserProgressContext.jsx';

export default function Header(){
   const cartCtx= useContext(CartContext);
   const userProgressCtx=useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems ,item)=>{
        return totalNumberOfItems+item.quantity;
    },0)

    function handleShowCart (){
        userProgressCtx.showCart('Cart');
    }
    return<header  id='main-header'>
    <div id='title'>
        <img src={logoImg} alt='A Resturant Logo'/>
        
        <h1> React Food</h1>
    </div>
    <nav >
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
    </nav>
    </header>
}