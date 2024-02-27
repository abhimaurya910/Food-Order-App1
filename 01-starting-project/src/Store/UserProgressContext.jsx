import { createContext,  useState } from "react";


const UserProgressContext = createContext({
    progress: "",
    showCart:()=>{},
    hideCart:()=>{},
    showCheckOut:()=>{},
    hideCheckOut: ()=>{}
});

export function UserProgressContextProvider({children}){
       const[userProgress , setUserProgress]= useState();

       function showCart() {
        setUserProgress('Cart');
       }
       function hideCart() {
        setUserProgress('');
       }
       function showCheckOut() {
        setUserProgress('CheckOut');
       }
       function hideCheckOut() {
        setUserProgress('');
       }

       const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckOut
       };

    return(
        <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
    )

    
}

export default UserProgressContext;