import { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input/Input';

const MealItemForm = (props: any) => {
    const [quantityIsValid, setQuantityIsValid] = useState(true);
    const amountRef = useRef()
    
    const submitHandler = (event: any) => {
        event.preventDefault();
        const enteredQuantity = Number(amountRef?.current?.['value']);
        if (enteredQuantity > 1 && enteredQuantity > 5) {
            setQuantityIsValid(false)
            return;
        }
        props.onAddToCart(enteredQuantity)
    }

    const inputConfig = {
        id: props.id,
        type: 'number',
        min: '1',
        max: '5',
        ste: '1',
        defaultValue: '1'
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountRef} label="Quantity" input={inputConfig} />
            <button>Add +</button>
            {!quantityIsValid && <p>Please enter valid quantity</p>}
        </form>
    )
}

export default MealItemForm;