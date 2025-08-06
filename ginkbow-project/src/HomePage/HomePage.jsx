import { useContext, useEffect } from "react";
import HomeProduct from "./HomeProduct";
import Header from "../components/Header";
import HomeSecTwo from "./HomeSecTwo.jsx";
import SearchResults from "../components/SearchResults.jsx";
import PopUp from "../components/PopUp.jsx";
import axios from "../../utils/axios.js";
import { MenuContext } from "../../utils/MenuContext.jsx";
import "./HomePage.css";



function HomePage() {
  <>
    <title>Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </>

  const {
    products,
    setProducts,
    setCart,
    setPaymentSumm,
    filteredProducts,
    setFilteredProducts,
    showPopup,
    setShowPopup,
    cartQuantity
  } = useContext(MenuContext);



  async function fetchProducts() {
    try {
      const productResponse = await axios.get('/products');
      setProducts(productResponse.data);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  }


  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, []);


  return (
    <div className="home-overall">
      {showPopup && <PopUp setShowPopup={setShowPopup} />}
      <Header
        products={products}
        setFilteredProducts={setFilteredProducts}
        setPaymentSumm={setPaymentSumm}
        cartQuantity={cartQuantity}
      />
      <div className="cont-container">
        {
          filteredProducts.length === 0 ? (
            <>
              <HomeSecTwo />
              <div className="js-shopping-container">
                <HomeProduct
                  type="Kitchen-Appliances"
                  products={products}
                  setProducts={setProducts}
                  route="/kitchen-appliances"
                  setCart={setCart}
                  setPaymentSumm={setPaymentSumm}
                  showPopup={showPopup}
                  setShowPopup={setShowPopup}
                />
                <HomeProduct
                  type="Gadgets"
                  products={products}
                  setProducts={setProducts}
                  route="/phones-tablets"
                  setCart={setCart}
                  setPaymentSumm={setPaymentSumm}
                  showPopup={showPopup}
                  setShowPopup={setShowPopup}
                />
                <HomeProduct
                  type="Health and Beauty"
                  products={products}
                  setProducts={setProducts}
                  route="/health-beauty"
                  setCart={setCart}
                  setPaymentSumm={setPaymentSumm}
                  showPopup={showPopup}
                  setShowPopup={setShowPopup}
                />
                <HomeProduct
                  type="Home and Office"
                  products={products}
                  setProducts={setProducts}
                  route="/home-office"
                  setCart={setCart}
                  setPaymentSumm={setPaymentSumm}
                  showPopup={showPopup}
                  setShowPopup={setShowPopup}
                />
                <HomeProduct
                  type="Electronics"
                  products={products}
                  setProducts={setProducts}
                  route="/electronics"
                  setCart={setCart}
                  setPaymentSumm={setPaymentSumm}
                  showPopup={showPopup}
                  setShowPopup={setShowPopup}
                />
                <HomeProduct
                  type="Fashion"
                  products={products}
                  setProducts={setProducts}
                  route="/fashion"
                  setCart={setCart}
                  setPaymentSumm={setPaymentSumm}
                  showPopup={showPopup}
                  setShowPopup={setShowPopup}
                />
                <HomeProduct
                  type="Supermarket"
                  products={products}
                  setProducts={setProducts}
                  route="/supermarket"
                  setCart={setCart}
                  setPaymentSumm={setPaymentSumm}
                  showPopup={showPopup}
                  setShowPopup={setShowPopup}
                />
              </div>
            </>
          ) :
            <SearchResults
              filteredProducts={filteredProducts}
              setShowPopup={setShowPopup}
              setCart={setCart}
              setPaymentSumm={setPaymentSumm}
            />
        }
      </div>
    </div>
  )
}
export default HomePage;