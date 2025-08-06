import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Hooks/useCart.js";
import { MenuContext } from "../../utils/MenuContext.jsx";
import './HomeProduct.css';

function HomeProduct({ type, products, route, setCart, setPaymentSumm, setShowPopup }) {
  
  const { setCartQuantity } = useContext(MenuContext);
  
  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity })



  const [itemsToShow, setItemsToShow] = useState(getItemsToShow(window.innerWidth));


  function getItemsToShow(width) {
    if (width < 650) return 3
    return 4;
  }


  useEffect(() => {

  })
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = products.filter((product) => product.type === type).slice(0, itemsToShow);


  return (
    <div className="shopping-category">
      <div className="group">{type}
        <Link to={route}>
          <p className="see-more">❯❯❯</p>
        </Link>
      </div>
      <div className="kitchen-list-container">
        {filteredProducts.map((product) => {
          return (
            <div className="kit-container" key={product.id}>
              <div className="kitchen-img-wishlist">
                <img className="kitchen-img" src={product.image} alt={product.name} />
                <div className="wishlist-container">
                  <img
                    className="wishlist-img"
                    src="images/kitchen-Accessories/wishlist.svg"
                    alt="wishlist"
                  />
                </div>
              </div>
              <div className="low-options">
                <p className="name">{product.name}</p>
                <div>
                  <p className="discount-price">₦{product.price.toLocaleString()}</p>
                  <div className="price-percentage">
                    <p className="price">{product.initialPrice ? '₦' + product.initialPrice : <span>&nbsp;</span>}</p>
                    <span className="percentage-cutoff">{product.discountPercent}</span>
                  </div>
                </div>
                <div className="rating-container">
                  <img
                    className="rating-star"
                    src={`images/ratings/rating-${product.rating.star || 0}.png`}
                    alt="rating"
                  />
                  <p className="rating-number">({product.rating.rank})</p>
                </div>
                <button className="add-tocart" onClick={() => {
                  addToCart(product.id)
                  setShowPopup(true);
                  setTimeout(() => {
                    setShowPopup(false)
                  }, 3000);
                }}>Add to cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeProduct;