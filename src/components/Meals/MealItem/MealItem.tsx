import {useContext} from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context';
const MealItem = (props: any) => {
    const cartCtx = useContext(CartContext)
    const addToCartHandler = (qty: number) => {
        cartCtx.addItem({
           ...props,
           quantity: qty
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler}/> 
            </div>
        </li>
    )
}

export default MealItem