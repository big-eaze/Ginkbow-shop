import { useContext, useEffect} from "react";
import Order from "./Order";
import Header from "../components/Header";
import PopUp from "../components/PopUp";
import { MenuContext } from "../../utils/MenuContext";
import axios from "../../utils/axios.js";
import './OrderPage.css';

function OrderPage() {


  const {
    orders,
    setOrders,
    setCart,
    setPaymentSumm,
    setTracking,
    setFilteredProducts,
    products,
    showPopup,
    setShowPopup,
    cartQuantity,
    setCartQuantity
  } = useContext(MenuContext);
  <title>order</title>



  async function fetchOrders() {
    try {
      const orderResponse = await axios.get("/orders?expand=products");
      setOrders(orderResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchOrders();
    //eslint-disable-next-line
  }, [])

  return (
    <>
      {showPopup && <PopUp setShowPopup={setShowPopup} />}
      <Header

        setFilteredProducts={setFilteredProducts}
        products={products}
        cartQuantity={cartQuantity}
      />
      <div className="content-container">
        <Order
          orders={orders}
          setCart={setCart}
          setPaymentSumm={setPaymentSumm}
          setTracking={setTracking}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          setCartQuantity={setCartQuantity}
        />
      </div>

    </>
  )
}


export default OrderPage;