import { useContext, useEffect, useState } from "react";
import { fetchCart } from "../Hooks/useCart.js";
import Header from "../components/Header";
import CartSummary from "./CartSummary";
import PaymentSummary from "./PaymentSummary";
import "./CartPage.css";
import DeletePopup from "../components/DeletePopup";
import { MenuContext } from "../../utils/MenuContext.jsx";


function CartPage() {


  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { cart, setCart, paymentSumm, setPaymentSumm, setOrders, setFilteredProducts, products, cartQuantity } = useContext(MenuContext);

  


  useEffect(() => {
    fetchCart(setCart);
    //eslint-disable-next-line
  }, [])

  if (!cart) {
    return <p>Loading cart.....</p>
  }



  return (
    <div className="home-overall">
      {
        showDeletePopup && <DeletePopup setShowDeletePopup={setShowDeletePopup} />
      }
      <Header
        setFilteredProducts={setFilteredProducts}
        products={products}
        cartQuantity={cartQuantity}
      />
      <div className="cart-overall-container">
        <div className="cart-container">
          <div className="cart-item">Cart(<span className="js-cart-header-quantity">{cart.totalQuantity}</span>)</div>
          <div className="cart-list-container">
            <CartSummary
              cart={cart}
              setCart={setCart}
              setPaymentSumm={setPaymentSumm}
              showDeletePopup={showDeletePopup}
              setShowDeletePopup={setShowDeletePopup}
            />
          </div>
        </div>
        <div className="cart-summary js-cart-payment-summary">
          <PaymentSummary
            paymentSumm={paymentSumm}
            cart={cart}
            setCart={setCart}
            setOrders={setOrders}
          />
        </div>
      </div>
    </div>

  )
}

export default CartPage;

