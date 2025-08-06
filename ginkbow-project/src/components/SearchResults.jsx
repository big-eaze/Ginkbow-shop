import React, { useRef} from 'react';
import './SearchResults.css';
import { useCart } from '../Hooks/useCart';


function SearchResults({ filteredProducts, setShowPopup, setCart, setPaymentSumm, }) {

  const { addToCart } = useCart({ setCart, setPaymentSumm });

  const timeoutId = useRef(null);

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="search-results">
        <p>No products found.</p>
      </div>
    );
  }


  return (
    <div className='con-wrapper'>
      <h1>Search results</h1>
      <div className="con-container">
        {filteredProducts.map((product) => (
          <div className="kitch-container" key={product.id}>
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
              <p className="namE">{product.name}</p>
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
                  src={`images/ratings/rating-${product.rating.star}.png`}
                  alt="rating"
                />
                <p className="rating-number">({product.rating.rank})</p>
              </div>
              <button className="add-to-cart" onClick={() => {
                if (timeoutId.current) clearInterval(timeoutId.current);
                addToCart(product.id)
                setShowPopup(true);
                timeoutId.current = setTimeout(() => setShowPopup(false), 3000);
              }}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default SearchResults;
