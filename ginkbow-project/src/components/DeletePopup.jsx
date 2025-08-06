import './PopUp.css';


function DeletePopup({ setShowDeletePopup }) {
  return (
    <div className="delete-popup">
      <div className='popup-content'>
        <div className='wrap'>
          <img className="check-img" src="images/check.png" />
          <p>
            Product removed from cart successfully
          </p>
        </div>
        <img onClick={() => setShowDeletePopup(false)} className="close-img js-close-img" src="images/close.png" />
      </div>
    </div>
  )
}

export default DeletePopup;