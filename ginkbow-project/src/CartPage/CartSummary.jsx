import { Fragment, useContext } from "react";
import axios from "../../utils/axios.js";
import { MenuContext } from "../../utils/MenuContext.jsx";
import "./CartSummary.css";

function CartSummary({ cart, setCart, setPaymentSumm, setShowDeletePopup }) {


  const { setCartQuantity } = useContext(MenuContext);

  async function removeFromCart(productId) {
    try {
      await axios.delete(`/cartItems/${productId}`); // Remove the product from the cart on the backend

      const updatedCartResponse = await axios.get('/cartitems?expand=products'); // Fetch the updated cart state from the backend

      const updatedPaymentSummResponse = await axios.get('/payment-summary'); // Fetch the updated payment summary from the backend

      setCart(updatedCartResponse.data);
      setCartQuantity(updatedCartResponse.data.totalQuantity)
      setPaymentSumm(updatedPaymentSummResponse.data);

    } catch (error) {
      console.error("Error removing from cart:", error.message);
      alert("Failed to update the cart. Please try again.");
    }
  }

  async function updateQuantity(productId, quantity, action) {
    try {
      if (quantity < 1 || quantity > 10) {
        alert("Quantity must be between 1 and 10");
        return;
      }

      if (action === 'reduction') {
        await axios.put(`/cartItems/${productId}`, {
          quantity: quantity - 1
        }); // Update the product quantity in the cart on the backend

      } else if (action === 'addition') {
        await axios.put(`/cartItems/${productId}`, {
          quantity: quantity + 1
        });
      }


      const updatedCartResponse = await axios.get('/cartitems?expand=products'); // Fetch the updated cart state from the backend
      const updatedPaymentSummResponse = await axios.get('/payment-summary'); // Fetch the updated payment summary from the backend

      setCart(updatedCartResponse.data);
      setPaymentSumm(updatedPaymentSummResponse.data);

    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  }


  return (
    <Fragment>
      {
        cart?.cartItems?.length > 0 ?
          (cart.cartItems.map((cartItem) => (
            <div className="cart-product-container s-cart-product-container" key={cartItem.id}>
              <div className="product-info-container">
                <div>
                  <img className="product-img" src={cartItem.product.image} alt={cartItem.product.name} />
                </div>
                <div className="n-p-container">
                  <p className="product-Name">{cartItem.product.name}</p>
                  <div>
                    <p className="product-price">₦{cartItem.product.price.toLocaleString()}</p>
                    <div className="discount-container">
                      <p className="initial-price">₦{cartItem.product.initialPrice}</p>
                      <div className="discount-percent">{cartItem.product.discountPercent}</div>
                    </div>
                    <p className="available">in stock</p>
                  </div>
                </div>
              </div>
              <div className="quantity-delete-container">
                <div className="delete-container js-delete-container" onClick={() => removeFromCart(cartItem.productId)}>
                  <svg
                    className="delete-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="35px"
                    viewBox="0 -960 960 960"
                    width="35px"
                    fill="#FFFFFF"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                  <p onClick={() => {
                    setShowDeletePopup(true);
                    setTimeout(() => {
                      setShowDeletePopup(false)
                    }, 3000);
                  }
                  } className="remove">Remove</p>
                </div>
                <div className="quantity-container js-quantity-container">
                  <button className="reduction-btn js-reduction-btn" onClick={() => updateQuantity(cartItem.productId, cartItem.quantity, 'reduction')}>
                    <img className="quantity-icon" src="images/cart-images/remove.png" alt="Reduce quantity" />
                  </button>
                  <p className="quantity js-quantity">{cartItem.quantity}</p>
                  <button className="addition-btn js-addition-btn" onClick={() => updateQuantity(cartItem.productId, cartItem.quantity, 'addition')}>
                    <img className="quantity-icon" src="images/cart-images/add.png" alt="Increase quantity" />
                  </button>
                </div>
              </div>
            </div>
          ))) : <p className="empty-cart"> Your Cart is Empty</p>
      }
    </Fragment>
  );
}

export default CartSummary;