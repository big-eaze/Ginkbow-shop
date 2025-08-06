
import { useContext, useEffect, useRef } from "react";
import Header from "../components/Header";
import PopUp from "../components/PopUp";
import { useCart } from "../Hooks/useCart";
import axios from "../../utils/axios.js"
import "./Fashion.css";
import { MenuContext } from "../../utils/MenuContext.jsx";


function Fashion() {



  const { fashion, setFashion, setFilteredProducts, products, showPopup, setShowPopup, setCart, setPaymentSumm, cartQuantity, setCartQuantity } = useContext(MenuContext);
  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity })
  const timeoutId = useRef(null);


  async function fetchFashionProducts() {
    try {
      const productResponse = await axios.get('/products');
      setFashion(productResponse.data.filter((item) => item.type === "Fashion"));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchFashionProducts();
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
          <div className="fashion-group">Fashion</div>
          <div className="fashion-list-container js-fashion-list-container">
            {
              fashion.map((item) => {
                if (item.type === 'Fashion') {
                  return (
                    <div className="fashion-container" key={item.id}>
                      <div className="fashion-img-wishlist">
                        <img className="fashion-img" src={item.image} />
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
                            addToCart(item.id)
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

export default Fashion;