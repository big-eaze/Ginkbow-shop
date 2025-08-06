import { Link } from "react-router-dom";
import axios from "../../utils/axios.js";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../utils/MenuContext.jsx";
import { fetchCart } from "../Hooks/useCart.js";
import "./PaymentSummary.css";


function PaymentSummary({ cart, setCart, setOrders }) {


  const { paymentSumm, setPaymentSumm, setCartQuantity } = useContext(MenuContext);

  async function fetchPaymentSummary() {
    try {
      const paymentResponse = await axios.get('/payment-summary');
      setPaymentSumm(paymentResponse.data);
    } catch (error) {
      console.error("Error fetching payment summary:", error.message);
    }
  }

  useEffect(() => {
    fetchPaymentSummary();
    //eslint-disable-next-line
  }, [])

  async function placeOrder() {
    const cartContent = cart.cartItems

    await axios.post("/orders", cartContent);

    const updatedOrderResponse = await axios.get("/orders?expand=products");

    setOrders(updatedOrderResponse.data);
    await fetchCart(setCart, setCartQuantity);
  }


  return (
    <>
      {
        paymentSumm ? (
          <div>
            <div className="summary">CART SUMMARY</div>
            <div className="joint">
              <p className="item-cost">Subtotal:</p>
              <p className="subtotal-figure">₦{paymentSumm.subTotal != null ? paymentSumm.subTotal.toLocaleString() : "0"}</p>
            </div>
            <div className="joint">
              <p className="delivery-fee">Delivery-fee:</p>
              <p className="d-free">₦{paymentSumm.totalDeliveryFee != null ? paymentSumm.totalDeliveryFee.toLocaleString() : "0"}</p>
            </div>
            <div className="joint">
              <p className="total-order">Order Total:</p>
              <p className="total-order-figure">₦{paymentSumm.totalCost != null ? paymentSumm.totalCost.toLocaleString() : "0"}</p>
            </div>
            <div className="container-btn">
              <Link to="/order">
                <button className="place-order-btn js-place-order-btn" onClick={(e) => {
                  if (cart.cartItems.length > 0) {
                    placeOrder();
                  } else {
                    e.preventDefault();
                    alert("Cart is empty! Kindly fill it up");
                  }
                }}>
                  Place Your Order (₦{paymentSumm.totalCost != null ? paymentSumm.totalCost.toLocaleString() : "0"})
                </button>
              </Link>
            </div>
          </div>
        ) : <p>Loading payment summary...</p>
      }
    </>
  );
}

export default PaymentSummary;