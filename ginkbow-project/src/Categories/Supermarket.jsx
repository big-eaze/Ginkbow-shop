import { useContext, useEffect, useRef} from "react";
import Header from "../components/Header";
import PopUp from "../components/PopUp";
import { useCart } from "../Hooks/useCart";
import axios from "../../utils/axios.js"
import { MenuContext } from "../../utils/MenuContext.jsx";
import './Supermarket.css';


function Supermarket() {

  const {supermarket, setSupermarket, setFilteredProducts, products, showPopup, setShowPopup, setCart, setPaymentSumm, cartQuantity, setCartQuantity} = useContext(MenuContext);
  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity })  
  const timeoutId = useRef(null);





  async function fetchSMProducts() {
    try {
      const productResponse = await axios.get('/products');
      setSupermarket(productResponse.data.filter((item) => item.type === "Supermarket"));

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchSMProducts();
  })


  return (
    <div className="overall">
      {showPopup && <PopUp setShowPopup={setShowPopup} />}
      <Header

        setFilteredProducts={setFilteredProducts}
        products={products}
        cartQuantity={cartQuantity}
      />

      <div className="body-content">
        <div className="shopping-categories">
          <div className="supermarket-group">Supermarket</div>
          <div className="supermarket-list-container js-supermarket-list-container">
            {
              supermarket.map((item) => {
                return (
                  <div className="supermarket-container" key={item.id}>
                    <div className="supermarket-img-wishlist">
                      <img className="supermarket-img" src={item.image} />
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
                      <button className="add-to-cart" onClick={
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
                      } >Add to cart</button>
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

export default Supermarket;