import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem'

const Cart = (props: any) => {
    const crtCtx = useContext(CartContext);
    const onAddItemHandler = (item: any) => {
        crtCtx.addItem({...item, quantity: 1})
    }

    const onRemoveItemHandler = (id: any) => {
        crtCtx.removeItem(id)
    }

    const cartItems = <ul className={classes['cart-items']}>
        {crtCtx.items.map((item: any) => <CartItem key={item.id} {...item} onRemove={onRemoveItemHandler.bind(null, item.id)}
            onAdd={onAddItemHandler.bind(null, item)} />)}
    </ul>;

    return (
        <Modal onClose={() => { props.onShowHideCart(false) }}>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>${crtCtx.totalAmount.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={() => { props.onShowHideCart(false) }}>Close</button>
                {crtCtx.items.length > 0 && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
