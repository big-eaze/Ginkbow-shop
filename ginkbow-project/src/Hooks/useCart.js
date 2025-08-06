import axios from "../../utils/axios.js";

export function useCart({ setCart, setPaymentSumm, setCartQuantity }) {
  const addToCart = async (productId) => {
    const product = {
      productId,
      quantity: 1,
      deliveryFee: 500,
    };

    try {
      await axios.post('/cartItems', product); // Add the product to the cart on the backend

      const updatedCartResponse = await axios.get('/cartitems?expand=products'); // Fetch the updated cart state from the backend
      const updatedPaymentSummResponse = await axios.get('/payment-summary'); // Fetch the updated payment summary from the backend

      //Only call if these are valid functions
      if (typeof setCart === "function") {
        setCart(updatedCartResponse.data);
      }

      if (typeof setPaymentSumm === "function") {
        setPaymentSumm(updatedPaymentSummResponse.data);
      }
      await fetchCart(setCart, setCartQuantity);

    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  return { addToCart };
}


export async function fetchCart(setCart, setCartQuantity) {
  try {
    const dataResponse = await axios.get('/cartitems?expand=products');
    if (typeof setCart === "function") {
      setCart(dataResponse.data);
    }
    if (typeof setCartQuantity === "function") {
      setCartQuantity(dataResponse.data.totalQuantity);
    }
  } catch (error) {
    console.error("Error fetching cart:", error.message);
  }
}
