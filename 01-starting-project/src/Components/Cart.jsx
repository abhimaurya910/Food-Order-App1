import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../Store/ContextCart";
import { CurrencyFormater } from "../util/Formatting";
import Button from "./Button";
import UserProgressContext from "../Store/UserProgressContext";
import CartItem from "./CartItem.jsx";


export default function Cart(){
     const cartCxt =useContext(CartContext);
     const userProgressCtx=useContext(UserProgressContext);

     const cartTotal = cartCxt.items.reduce((totalPrice , item) => totalPrice+item.quantity*item.price,
     0)
    
     function handleCloseCart(){
        userProgressCtx.hideCart();
     }
     
     function handelCheckOut() {
        userProgressCtx.showCheckOut();
     }
    return<Modal className="cart" 
    open={userProgressCtx.progress==='Cart'} 
    onClose={userProgressCtx.progress==='Cart' ? handleCloseCart : null}
    >
        <h1> Your Cart </h1>
        <ul>
        {cartCxt.items.map(item => <CartItem key={item.id} 
        name={item.name}
         quantity={item.quantity} 
         price={item.price}
         onIncrease={()=>{cartCxt.addItem(item)}}
         onDecrease={()=>{cartCxt.removeItem(item.id)}}
         />)}
        </ul>
        <p className="cart-total">{CurrencyFormater.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly  onClick={handleCloseCart}>close</Button>
            {cartCxt.items.length > 0 && (<Button   onClick={handelCheckOut}>Check Out</Button>)}
        </p>

    </Modal>
}