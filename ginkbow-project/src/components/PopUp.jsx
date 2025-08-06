import './PopUp.css';


function PopUp({setShowPopup}) {
  return (
    <div className="popup">
    <div className="popup-content">
      <div className="wrap">
        <img className="check-img" src="images/check.png" />
        <p>Product added successfully</p>
      </div>
      <img onClick={() => setShowPopup(false)} className="close-img" src="images/close.png" />
    </div>
  </div>
  
  )
}

export default PopUp;