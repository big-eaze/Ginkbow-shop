import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import './Header.css';
import SideMenu from "./SideBar";
import Fuse from "fuse.js";

function Header({ products, setFilteredProducts, cartQuantity}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const inputRef = useRef();
  const navigate = useNavigate();
  const closeMenu = () => {
    setIsMenuOpen(false);

  };

  function openMenu() {
    setIsMenuOpen(true);
  }
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }


    // Cleanup when the component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);




  const fuse = new Fuse(products, {
    keys: ['name', 'keywords', 'type'],
    threshold: 0.2
  })


  function searchAction() {

    const currentValue = inputRef.current.value.trim().toLowerCase();
    if (!currentValue) return;

    const result = fuse.search(currentValue);

    if (!result || result.length === 0) {
      setFilteredProducts([]);
      navigate('/');
    }
    const matches = result.map(r => r.item);
    setFilteredProducts(matches);
    navigate('/');

    inputRef.current.value = '';

  }



  return (
    <>
      <div className="second-layer-container">
        <div className="second-layer">
          <div className="joint-3">
            <div>
              <img className="menu-icon" src="images/menu-icon.png" onClick={openMenu} />
              <SideMenu isMenuOpen={isMenuOpen} cartQuantity={cartQuantity} toggleMenu={closeMenu} />
              {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
            </div>
            <Link to="/" onClick={() => setFilteredProducts([])}>
              <img className="jumia-logo-2" src="images/letter-g.png" />
            </Link>
          </div>
          <div className="joint-4">
            <div className="joint-5">
              <input ref={inputRef} onKeyDown={(e) => e.key === 'Enter' && searchAction()} className="search-bar" placeholder="Search products, brands and categories" />
            </div>
            <button onClick={searchAction} className="search-button">Search</button>
          </div>
          <div className="big-three">
            <Link to="/order" className="joint-6">
              <FaShoppingCart size={23} className="user-icon" />
              <div className="mini-joint">
                <p className="cart">Orders</p>
                <svg className="arrow-down"
                  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
              </div>
            </Link>
            <div className="joint-6">
              <svg className="help-icon"
                xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#434343"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
              <div className="mini-joint">
                <p className="cart">Help</p>
                <svg className="arrow-down"
                  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
              </div>
            </div>
            <Link to="/cart" className="joint-6">

              <div className="cart-concealer">
                <svg className="cart-icon"
                  xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#434343"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 .5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
                <div className="cart-quantity">{cartQuantity}</div>
              </div>
              <p className="cart">Cart</p>

            </Link>


          </div>
        </div>
      </div>

    </>
  )
}
export default Header;