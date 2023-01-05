import { useState } from 'react';
import AppHeader from "./components/Layout/AppHeader/AppHeader";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from './store/cartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showHideCartHandler = (isShowCart: boolean) => {
    setCartIsShown(isShowCart)
  }


  return (
    <CartProvider>
      {cartIsShown && <Cart onShowHideCart={showHideCartHandler} />}
      <AppHeader onShowHideCart={showHideCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>

  );
}

export default App;
