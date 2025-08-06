import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import './HomeSecTwo.css';


function HomeSecTwo() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "images/desktopSlide/desktop.jpg",
    "images/desktopSlide/desktop3.png",
    "images/desktopSlide/desktop4.jpg"
  ] // array of slide image paths

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);  // Cleanup interval on component unmount to avoid memory leaks and unwanted behaviour.
  }, [nextSlide]);

  // Reset the interval when the user manually navigates
  const handleManualNavigation = (direction) => {
    if (direction === "next") {
      nextSlide();
    } else if (direction === "prev") {
      prevSlide();
    }
  };

  return (
    <div className="first-1">
      <div className="options-container">
        <div className="categories">Categories</div>
        <Link className="appliances-container" to="kitchen-appliances">
          <svg className="appliances" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px">
            <path
              d="M120-640h720v360q0 50-35 85t-85 35H240q-50 0-85-35t-35-85v-360Zm80 80v280q0 17 11.5 28.5T240-240h480q17 0 28.5-11.5T760-280v-280H200Zm-80-120v-80h240v-40q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800v40h240v80H120Zm360 280Z" />
          </svg>
          <div className="appliances-link" >kitchen-Appliances</div>
        </Link>
        <Link className="appliances-container" to="phones-tablets">
          <svg className="appliances" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#000000">
            <path
              d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z" />
          </svg>
          <div className="appliances-link" >Phones & Tablets</div>
        </Link>
        <Link className="appliances-container" to="health-beauty">
          <svg className="appliances" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#000000">
            <path
              d="M200-80 40-520l200-120v-240h160v240l200 120L440-80H200Zm480 0q-17 0-28.5-11.5T640-120q0-17 11.5-28.5T680-160h120v-80H680q-17 0-28.5-11.5T640-280q0-17 11.5-28.5T680-320h120v-80H680q-17 0-28.5-11.5T640-440q0-17 11.5-28.5T680-480h120v-80H680q-17 0-28.5-11.5T640-600q0-17 11.5-28.5T680-640h120v-80H680q-17 0-28.5-11.5T640-760q0-17 11.5-28.5T680-800h160q33 0 56.5 23.5T920-720v560q0 33-23.5 56.5T840-80H680Zm-424-80h128l118-326-124-74H262l-124 74 118 326Zm64-200Z" />
          </svg>
          <div className="appliances-link" href="#">Health & Beauty</div>
        </Link>
        <Link className="appliances-container" to="home-office">
          <svg className="appliances" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#000000">
            <path
              d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
          <div className="appliances-link" href="#">Home & Office</div>
        </Link>
        <Link className="appliances-container" to="electronics">
          <svg className="appliances" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#000000">
            <path
              d="M413-480q17 0 28.5-11.5T453-520q0-17-11.5-28.5T413-560q-17 0-28.5 11.5T373-520q0 17 11.5 28.5T413-480Zm-133 0q17 0 28.5-11.5T320-520q0-17-11.5-28.5T280-560q-17 0-28.5 11.5T240-520q0 17 11.5 28.5T280-480Zm267 0q17 0 28.5-11.5T587-520q0-17-11.5-28.5T547-560q-17 0-28.5 11.5T507-520q0 17 11.5 28.5T547-480Zm133 0q17 0 28.5-11.5T720-520q0-17-11.5-28.5T680-560q-17 0-28.5 11.5T640-520q0 17 11.5 28.5T680-480ZM160-320h640v-400H160v400Zm320 160q-99 0-169.5-13.5T240-206v-34h-80q-33 0-56.5-23.5T80-320v-400q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v400q0 33-23.5 56.5T800-240h-80v34q0 19-70.5 32.5T480-160Zm0-360Z" />
          </svg>
          <div className="appliances-link" href="#">Electronics</div>
        </Link>
        <Link className="appliances-container" to="fashion">
          <svg className="appliances" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#000000">
            <path
              d="m240-522-40 22q-14 8-30 4t-24-18L66-654q-8-14-4-30t18-24l230-132h70q9 0 14.5 5.5T400-820v20q0 33 23.5 56.5T480-720q33 0 56.5-23.5T560-800v-20q0-9 5.5-14.5T580-840h70l230 132q14 8 18 24t-4 30l-80 140q-8 14-23.5 17.5T760-501l-40-20v361q0 17-11.5 28.5T680-120H280q-17 0-28.5-11.5T240-160v-362Zm80-134v456h320v-456l124 68 42-70-172-100q-15 51-56.5 84.5T480-640q-56 0-97.5-33.5T326-758L154-658l42 70 124-68Zm160 177Z" />
          </svg>
          <div className="appliances-link" href="#">Fashion</div>
        </Link>
        <Link className="appliances-container" to="supermarket">
          <svg className="appliances" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#000000">
            <path
              d="M640-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170T640-80Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-480 0q-33 0-56.5-23.5T80-240v-304q0-8 1.5-16t4.5-16l80-184h-6q-17 0-28.5-11.5T120-800v-40q0-17 11.5-28.5T160-880h280q17 0 28.5 11.5T480-840v40q0 17-11.5 28.5T440-760h-6l66 152q-19 10-36 21t-32 25l-84-198h-96l-92 216v304h170q5 21 13.5 41.5T364-160H160Zm480-440q-42 0-71-29t-29-71q0-42 29-71t71-29v200q0-42 29-71t71-29q42 0 71 29t29 71H640Z" />
          </svg>
          <div className="appliances-link">Supermarket</div>
        </Link>
      </div>
      <div className="slideshow">
        <button onClick={() => handleManualNavigation("prev")} className="prev">❮</button>
        <img className="desktop" src={slides[currentSlide]} alt={`slide ${currentSlide + 1}`} />
        <button onClick={() => handleManualNavigation("prev")} className="next">❯</button>
      </div>
      <div className="two-way">
        <div className="mini-info">
          <div className="call-info">
            <img className="phone-icon" src="images/desktopSlide/phone-icon-1.png" />
            <div className="phone-text-container">
              <p className="call-text">CALL TO ORDER</p>
              <p className="phone-no">41011111222, 01100022276</p>
            </div>
          </div>
          <div className="call-info">
            <img className="phone-icon" src="images/desktopSlide/icone-seller-1.png" />
            <div className="phone-text-container">
              <p className="call-text">Sell on Ginkbow</p>
            </div>
          </div>
          <div className="call-info">
            <img className="phone-icon" src="images/desktopSlide/icone-2-return.png" />
            <div className="phone-text-container">
              <p className="call-text">Best Deals</p>
            </div>
          </div>
        </div>
        <div>
          <img className="jumia-force" src="images/shop-with-us.gif" />
        </div>
      </div>
    </div>
  )
}

export default HomeSecTwo;