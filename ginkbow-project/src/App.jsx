import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "../utils/axios.js";
import CartPage from "./CartPage/CartPage.jsx";
import Electronics from "./Categories/Electronics.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import Fashion from "./Categories/Fashion.jsx";
import OrderPage from "./OrderPage/OrderPage.jsx";
import Tracking from "./Tracking.jsx";
import Supermarket from "./Categories/Supermarket.jsx";
import PhoneTablets from "./Categories/PhoneTablets.jsx";
import HealthBeauty from "./Categories/HealthBeauty.jsx";
import HomeOffice from "./Categories/HomeOffice.jsx";
import KitchenAppliances from "./Categories/KitchenAppliances.jsx";
import { MenuContext } from "../utils/MenuContext.jsx";


function App() {


  const { setCartQuantity } = useContext(MenuContext);


  //pop up state

  async function fetchCartQuantity() {
    try {
      const updatedCartResponse = await axios.get('/cartitems');
      setCartQuantity(updatedCartResponse.data.totalQuantity);
    } catch (err) {
      console.error("error fetching cart data", err);
    }
  }

  useEffect(() => {
    fetchCartQuantity();
    //eslint-disable-next-line
  }, [])






  return (
    <Routes>
      <Route path="/" element={
        <HomePage />
      }
      />

      <Route path="cart" element=
        {
          <CartPage />
        }
      />


      <Route path="order" element=
        {
          <OrderPage />
        }
      />

      <Route path="tracking" element=
        {
          <Tracking />
        }
      />

      <Route path="electronics" element={<Electronics
      />} />

      <Route path="fashion" element=
        {
          <Fashion
          />
        }
      />
      <Route path="supermarket" element=
        {
          <Supermarket />
        }
      />

      <Route path="phones-tablets" element=
        {
          <PhoneTablets />
        }
      />

      <Route path="kitchen-appliances" element=
        {
          <KitchenAppliances />
        }
      />

      <Route path="health-beauty" element=
        {
          <HealthBeauty />
        }
      />

      <Route path="home-office" element=
        {
          <HomeOffice />
        }
      />
    </Routes>
  )
}
export default App;