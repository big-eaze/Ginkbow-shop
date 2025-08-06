import { useContext, useEffect, useRef } from "react";
import Header from "../components/Header.jsx";
import PopUp from "../components/PopUp.jsx";
import { useCart } from "../Hooks/useCart.js";
import axios from "../../utils/axios.js"
import { MenuContext } from "../../utils/MenuContext.jsx";
import "./KitchenAppliances.css";


function KitchenAppliances() {

  const { kitchen, setKitchen, setFilteredProducts, products, showPopup, setShowPopup, setCart, setPaymentSumm, cartQuantity, setCartQuantity } = useContext(MenuContext);
  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity })

  const timeoutId = useRef(null);



  async function fetchKitchenProducts() {
    try {
      const productResponse = await axios.get('/products');
      setKitchen(productResponse.data.filter((item) => item.type === "Kitchen-Appliances"));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchKitchenProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {showPopup && <PopUp setShowPopup={setShowPopup} />}
      <Header

        setFilteredProducts={setFilteredProducts}
        products={products}
        cartQuantity={cartQuantity}
      />

      <div className="body-content">
        <div className="shopping-categories">
          <div className="kitchen-group">kitchen-Appliances</div>
          <div className="kitchen-list-container js-kitchen-list-container">
            {
              kitchen.map((item) => (
                <div className="kitch-container" key={item.id}>
                  <div className="kitchen-img-wishlist">
                    <img className="kitchen-img" src={item.image} />
                    <div className="wishlist-container">
                      <img className="wishlist-img" src="images/kitchen-Accessories/wishlist.svg" />
                    </div>
                  </div>
                  <div className="low-options">
                    <p className="name-product">
                      {item.name}
                    </p>
                    <div>
                      <p className="discount-price">₦{item.price.toLocaleString()}</p>
                      <div className="price-percentage">
                        {item.initialPrice ? (<><p className="price">{item.initialPrice && '₦' + item.initialPrice}</p>
                          <span className="percentage-cutoff">{item.discountPercent && item.discountPercent}</span></>) : <span>&nbsp;</span>}
                      </div>
                    </div>
                    <div className="rating-container">
                      <img className="rating-star" src={`images/ratings/rating-${item.rating.star}.png`} />
                      <p className="rating-number">({item.rating.rank})</p>
                    </div>
                    <button onClick={
                      () => {
                        if (timeoutId.current) {
                          clearInterval(timeoutId);
                        }

                        addToCart(item.id);
                        setShowPopup(true);

                        timeoutId.current = setTimeout(() => {
                          setShowPopup(false);
                        }, 3000);
                      }
                    } className="add-to-cart js-add-to-cart" >Add to cart</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default KitchenAppliances;