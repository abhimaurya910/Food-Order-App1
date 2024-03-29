import { useReducer } from 'react';
import { createContext } from 'react';

const CartContext = createContext({
    items:[],
    addItem: (item)=>{},
    removeItem:(id)=>{},
    cartClear:()=>{}
});


function cartReducer(state , action) {
        if(action.type === 'ADD_ITEM'){
            const existingCartItemIndex = state.items.findIndex(
                (item)=> item.id===action.item.id );


                const updatedItems = [...state.items];

                if(existingCartItemIndex>-1)
                {
                    const existingItem = state.items[existingCartItemIndex]
                    const updateItem = {
                        ...existingItem,
                        quantity: existingItem.quantity+1
                    };
                    updatedItems[existingCartItemIndex]=updateItem;
                }
                else{
                    updatedItems.push({...action.item , quantity:1});
                }

                return {...state , items:updatedItems };
        }

        if(action.type=== 'REMOVRE_ITEM')
        {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );

            const existingCartItem =state.items[existingCartItemIndex];
            const updatedItems = [...state.items];

            if(existingCartItem.quantity===1)
            {
                updatedItems.splice(existingCartItemIndex , 1);

            }
            else{
                const updatedItem={
                    ...existingCartItem,
                    quantity:existingCartItem.quantity-1,
                };
                updatedItems[existingCartItemIndex]= updatedItem;
            }
            return {...state , items:updatedItems };
        }

        if(action.type === 'CART_CLEAR')
        {
            return {...state , items:[]};
        }

        return state;
}
 export function CartContextProvider({children}){
    const [cart , dispatchCartAction]= useReducer(cartReducer , {items:[]} );


    function addItem(item){
        dispatchCartAction({type:'ADD_ITEM' , item});
    }

    function removeItem(id){
        dispatchCartAction({type:'REMOVRE_ITEM' , id});
    }
    function cartClear(){
        dispatchCartAction({type:'CART_CLEAR'})
    }

    const cartContext = {
        items:cart.items,
        addItem,
        removeItem,
        cartClear,
    };
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;