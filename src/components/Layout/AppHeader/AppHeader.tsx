import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';

import classes from '../AppHeader/AppHeader.module.css';

import mealsImg from '../../../assets/images/meals.jpg';

const AppHeader = (props: any) => {
    return (
        <>
            <header className={classes.header}>
                <h1>Meals</h1>
                <HeaderCartButton onShowHideCart={props.onShowHideCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="Tabe of food" />
            </div>
        </>
    );
}

export default AppHeader;