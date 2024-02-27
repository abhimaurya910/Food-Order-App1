import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../Store/ContextCart";
import { CurrencyFormater } from "../util/Formatting";
import Input from "./Input";
import Button from "./Button";
import UserProgressContext from "../Store/UserProgressContext";
import useHttp from '../hooks/useHttp.js';
import Error from '../Components/Error.jsx'


const requestConfig={
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    }
}





export default function CheckOut() {


   const {data , isLoading , isSending, error , sendRequest ,clearData}= useHttp('http://localhost:3000/orders', requestConfig );
   const cartCtx= useContext(CartContext);
    const userProgressCtx =useContext(UserProgressContext);

   const cartTotal = cartCtx.items.reduce((totalPrice , item) => totalPrice+item.quantity*item.price,
   0)

   function handleCloseCheckOut(){
    userProgressCtx.hideCheckOut();
   }

   function handleFinish(){
    userProgressCtx.hideCheckOut();
    cartCtx.cartClear();
    clearData();
   }

   function handleSubmit(event){
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
        JSON.stringify({
            order:{
                items:cartCtx.items,
                customer: customerData
            },
    })
    );
   
   }

   let actions =(
    <>
   <Button type="button" textOnly onClick={handleCloseCheckOut}>
    Close
   </Button>
    <Button>Submit Order</Button>
    </>
);
if(isSending)
{
actions = <span>Sending order data...</span>
}

    if(data && !error)
    {
        return<Modal open={userProgressCtx.progress==="CheckOut" } onClose={handleFinish}>
            <h2>Success</h2>
            <p>gifdigsdvildshdguhf dsuhdudshjdivkvn bsdoivhdsv</p>
            <p>holhihoi hoijlkijlk klkjl hsjvosjvvj  </p>
            <p className="actions-modal">
                <Button onClick={handleFinish}>Close</Button>
            </p>
        </Modal>
    }
    return <Modal 
    open={userProgressCtx.progress==='CheckOut'}
    onClose={handleCloseCheckOut}
    >
        <form onSubmit={handleSubmit}>
            <h2>CheckOut</h2>
            <p>Total Amount:{CurrencyFormater.format(cartTotal)} </p>

            <Input label= "Full Name" type="text" id="name"/>
            <Input label= "E-Mail Address" type="email" id="email"/>
            <Input label= "Street" type="text" id="street"/>

            <div className="control-row">
            <Input label= "Postal Code" type="text" id="postal-code"/>
            <Input label= "City" type="text" id="city"/>
            </div>

            {error&& <Error title="Failed to submit order"  message={error} />}

            <p className="modal-actions">
               {actions}
            </p>

        </form>
    </Modal>
}