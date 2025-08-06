import { useContext, useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import { MenuContext } from '../utils/MenuContext';
import './Tracking.css';


function Tracking() {

  const { tracking, cart, setFilteredProducts, products, cartQuantity } = useContext(MenuContext);
  const [iscopied, setIsCopied] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);
  //27cba69d-4c3d-4098-b42d-ac7fa62b7664

  if (!tracking) {
    return (
      <>
        <Header cartQuantity={cartQuantity} />

        <div className="tracking-container">
          <p>Loading tracking information...</p>
        </div>
      </>
    );
  }

  const getStepClass = (stepName) => {
    const statusOrder = [
      'Order Placed',
      'Processing',
      'Shipped',
      'Out for Delivery',
      'Delivered'
    ];
    const currentIndex = statusOrder.indexOf(tracking.status);
    const stepIndex = statusOrder.indexOf(stepName);

    if (stepIndex === currentIndex) return 'step current';
    if (stepIndex < currentIndex) return 'step completed';
    return 'step';
  };

  return (
    <>
      <Header
        cart={cart}
        setFilteredProducts={setFilteredProducts}
        products={products}
        cartQuantity={cartQuantity}
      />
      <div className="tracking-container">
        <div className="order-summary">
          <h2>Order-ID - {tracking.orderId}</h2>
          <p>
            <strong>Estimated Delivery:</strong>{' '}
            {new Date(tracking.estimatedDeliveryTimeMs).toLocaleDateString()}
          </p>
        </div>

        <div className="progress-tracker">
          <div className={getStepClass('Order Placed')}>Order Placed</div>
          <div className={getStepClass('Processing')}>Processing</div>
          <div className={getStepClass('Shipped')}>Shipped</div>
          <div className={getStepClass('Out for Delivery')}>Out for Delivery</div>
          <div className={getStepClass('Delivered')}>Delivered</div>
        </div>

        <div className="tracking-details">
          <p>
            <strong>Carrier:</strong> {tracking.carrier}
          </p>
          <p className='tracking-essent'>
            <strong>Tracking Number:</strong> {tracking.trackingNumber}{' '}
            <button className='copy-btn' aria-label='Copy tracking number' onClick={() => {
              if (timeoutId.current) {
                clearTimeout(timeoutId.current);
              }
              navigator.clipboard.writeText(tracking.trackingNumber)
              setIsCopied(true);
              timeoutId.current = setTimeout(() => {
                setIsCopied(false);
              }, 2000)
            }}>
              {iscopied ? 'copied' : 'copy'}
            </button>
          </p>
          <p>
            <strong>Status:</strong> {tracking.status}
          </p>
        </div>
      </div>
    </>
  );
}

export default Tracking;
