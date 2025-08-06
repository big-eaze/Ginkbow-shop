import { useContext, useEffect, useRef } from "react";
import Header from "../components/Header";
import PopUp from "../components/PopUp";
import { useCart } from "../Hooks/useCart";
import axios from "../../utils/axios.js"
import { MenuContext } from "../../utils/MenuContext.jsx";
import "./HealthBeauty.css";


function HealthBeauty() {
  const { healthBeauty, setHealthBeauty, setFilteredProducts, products, showPopup, setShowPopup, setCart, setPaymentSumm, cartQuantity, setCartQuantity } = useContext(MenuContext);
  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity })
  const timeoutId = useRef(null);


  async function fetchHBProducts() {
    try {
      const productResponse = await axios.get('/products');
      setHealthBeauty(productResponse.data.filter((item) => item.type === "Health and Beauty"));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchHBProducts();
  })

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
          <div className="health-beauty-group">Health & Beauty</div>
          <div className="health-beauty-list-container js-health-list-container">
            {
              healthBeauty.map((item) => {
                if (item.type === 'Health and Beauty') {
                  return (
                    <div className="health-beauty-container" key={item.id}>
                      <div className="health-beauty-img-wishlist">
                        <img className="health-beauty-img" src={item.image} />
                        <div className="wishlist-container">
                          <img className="wishlist-img" src="images/kitchen-Accessories/wishlist.svg" />
                        </div>
                      </div>
                      <div className="low-options">
                        <p className="name-product">
                          ${item.name}
                        </p>
                        <div>
                          <p className="discount-price">₦{item.price.toLocaleString()}</p>
                          <div className="price-percentage">
                            <p className="price">{item.initialPrice && '₦' + item.initialPrice}</p>
                            <span className="percentage-cutoff">{item.discountPercent && item.discountPercent}</span>
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
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default HealthBeauty;