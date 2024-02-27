import { useContext } from 'react'
import {CurrencyFormater} from '../util/Formatting.js'
import Button from './Button.jsx'
import CartContext from '../Store/ContextCart.jsx'

export default function MealsItem({meal}) {
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }
    return (
        
            <li className="meal-item">
                <article>
                    <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                    <div>
                        <h3>{meal.name}</h3>
                        <p className="meal-item-price">{CurrencyFormater.format(meal.price)}</p>
                        <p className="meal-item-description">{meal.description}</p>
                    </div>
                    <p className="meal-item-action">
                        <Button onClick={handleAddMealToCart}>Add Cart</Button>
                    </p>
                </article>
            </li>
    
    )
}