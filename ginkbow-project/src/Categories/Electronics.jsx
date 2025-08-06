import { useContext, useEffect, useRef } from "react";
import Header from "../components/Header";
import PopUp from "../components/PopUp";
import { useCart } from "../Hooks/useCart";
import axios from "../../utils/axios.js"
import './Electronics.css';
import { MenuContext } from "../../utils/MenuContext.jsx";


function Electronics() {


  const { electronics, setElectronics, setFilteredProducts, products, showPopup, setShowPopup, setCart, setPaymentSumm, cartQuantity,setCartQuantity  } = useContext(MenuContext);

  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity })



  async function fetchElectronicProducts() {
    try {
      const productResponse = await axios.get('/products');
      setElectronics(productResponse.data.filter((item) => item.type === "Electronics"));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchElectronicProducts();
  })

  const timeoutId = useRef(null);
  return (
    <div className="overall">
      {showPopup && <PopUp setShowPopup={setShowPopup} />}
      <Header
        setFilteredProducts={setFilteredProducts}
        products={products}
        showPopup={showPopup}
        cartQuantity={cartQuantity}
      />
      <div className="body-content">
        <div className="shopping-categories">
          <div className="electronics-group">Electronics</div>
          <div className="electronics-list-container js-electronics-list-container">
            {
              electronics.map((item) => {
                return (
                  <div className="electronics-container" key={item.id}>
                    <div className="electronics-img-wishlist">
                      <img className="electronics-img" src={item.image} />
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
                      } className="add-to-cart" data-product-id="${product.id}">Add to cart</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Electronics;