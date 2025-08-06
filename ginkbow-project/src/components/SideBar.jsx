import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router";

function SideMenu({ isMenuOpen, cartQuantity }) {

  const [catDisplay, setCatDistplay] = useState(false);

  function toggleCategories() {
    setCatDistplay((prev) => !prev );
  }


  return (
    <div className={`side-menu ${isMenuOpen ? "show" : ""}`}>
      <div className="side-menu-header">
        <h2>Navigation</h2>
      </div>
      <ul className="menu-options">
        <li className="menu-options-sub">
          <div className="catee" onClick={toggleCategories}>
            Categories
            <ul className={`category-opt ${catDisplay ? 'open' : ""}`} >
              <li>
                <Link to="/kitchen-appliances">
                  Kitchen-appliances
                </Link>
              </li>
              <li>
                <Link to="/phones-tablets">
                  Phones & Tablets
                </Link>
              </li>
              <li>
                <Link to="/health-beauty">
                  Health & Beauty
                </Link>
              </li>
              <li>
                <Link to="/home-office">
                  Home & Office
                </Link>
              </li>
              <li>
                <Link to="/electronics">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/fashion">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/supermarket">
                  Supermarket
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="menu-options-sub">
          <Link to="/order">Orders</Link>
        </li>
        <li className="menu-options-sub">
          <Link to="/cart">Cart</Link>
          <span className="cartQty">(<span>{cartQuantity}</span>)</span>
        </li>
        <li className="menu-options-sub">
          <Link to="/">Profile</Link>
        </li>
        <li className="menu-options-sub">
          <Link to="/">Help</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideMenu;