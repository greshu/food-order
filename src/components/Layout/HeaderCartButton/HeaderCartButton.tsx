import { useContext, useEffect, useState } from 'react';
import classes from '../HeaderCartButton/HeaderCartButton.module.css'
import CartIcon from '../../../assets/icons/CartIcon';
import CartContext from '../../../store/cart-context';
const HeaderCartButton = (props: any) => {

    const [btnisHighlighted, setBtnisHighlighted] = useState(false)
    const crtCtx = useContext(CartContext);
    const numberOfItems = crtCtx.items.reduce((currentNumber, item: any) => {
        return currentNumber + item.quantity;
    }, 0);

    const btnClasses = `${classes.button} ${btnisHighlighted ? classes.bump : ''}`;
    useEffect(() => {
        if (crtCtx.items.length == 0) {
            return;
        }
        setBtnisHighlighted(true);
        const timer = setTimeout(() => {
            setBtnisHighlighted(false)
        }, 500)
        return () => {
            clearTimeout(timer);
        }
    }, [crtCtx.items])

    return (
        <button type='button' className={btnClasses} onClick={() => { props.onShowHideCart(true) }}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton;