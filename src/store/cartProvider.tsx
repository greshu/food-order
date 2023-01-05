import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state: any, action: any) => {
    let updatedTotalAmount;
    let existingItemIndex;
    let existingCartItem;
    let updatedItems;
    switch (action.type) {
        case 'ADD_ITEM':
            updatedTotalAmount = state.totalAmount + (action.item.price * action.item.quantity);
            existingItemIndex = state.items.findIndex((item: any) => item.id === action.item.id);
            existingCartItem = state.items[existingItemIndex];
            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + action.item.quantity
                };
                updatedItems = [...state.items]
                updatedItems[existingItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item)
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
            break;
        case 'REMOVE_ITEM':
            existingItemIndex = state.items.findIndex((item: any) => item.id === action.id);
            existingCartItem = state.items[existingItemIndex];
            updatedTotalAmount = state.totalAmount - existingCartItem.price;
            updatedItems = [...state.items];
            if(existingCartItem.quantity > 1) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity - 1
                };
                updatedItems[existingItemIndex] = updatedItem;
            } else {
                updatedItems.splice(existingItemIndex, 1)
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
            break;
        default:
            break;
    }
    return defaultCartState;
}

const CartProvider = (props: any) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addCartItemHandler = (item: any) => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        })
    }

    const removeCartItemHandler = (id: any) => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addCartItemHandler,
        removeItem: removeCartItemHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;