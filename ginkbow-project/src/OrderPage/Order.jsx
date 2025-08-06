import dayjs from "dayjs";
import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios.js";
import { useCart } from "../Hooks/useCart.js";
import "./Order.css";


function Order({ orders, setCart, setPaymentSumm, setTracking, setShowPopup, setCartQuantity }) {

  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity })
  const timeoutId = useRef(null);

  async function trackPackage(orderId) {
    const trackResponse = await axios.get(`/tracking/${orderId}`);
    const trackData = trackResponse.data;
    setTracking(trackData);
    localStorage.setItem('track', JSON.stringify(trackData));
  }


  return (
    <Fragment>
      {
        orders.map((order) => (
          <div className="order-container" key={order.id}>

            <div className="order-info">
              <div>
                Order Placed: {dayjs(order.orderTimeMs).format("MMMM D, YYYY")}
              </div>
              <div className="order-id">
                Order ID: {order.id}
              </div>
            </div>
            <>
              {order.products.map((product) => (
                <div className="product-info" key={product.productId}>
                  <img className="product-Img" src={product.product.image} />
                  <div className="text-container">
                    <p className="delivery-time">Arriving on: {dayjs(product.estimatedDeliveryTimeMs).format('MMMM D')}</p>
                    <p className="product-nAme">{product.product.name}</p>
                    <p className="quantity">Quantity: {product.quantity}</p>
                    <div className="btns-container">
                      <button className="buy-btn" onClick={() => {

                        if (timeoutId.current) {
                          clearInterval(timeoutId);
                        }

                        addToCart(product.product.id);
                        setShowPopup(true);

                        timeoutId.current = setTimeout(() => {
                          setShowPopup(false);
                        }, 3000);

                      }}>
                        <svg className="buy-it-img"
                          xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
                        </svg>
                        Buy it again
                      </button>
                      <div className="track-container">
                        <Link to={`/tracking`}>
                          <button className="track-btn" onClick={() => trackPackage(product.orderId)}>Track Package</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        ))
      }
    </Fragment>

  )
}


export default Order;