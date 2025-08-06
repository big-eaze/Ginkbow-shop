import React, { useState } from "react";
import { MenuContext } from "./MenuContext.jsx";




export function MenuProvider({ children }) {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [paymentSumm, setPaymentSumm] = useState([]);
  const [orders, setOrders] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [fashion, setFashion] = useState([]);
  const [healthBeauty, setHealthBeauty] = useState([]);
  const [homeOffice, setHomeOffice] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [gadgets, setGadgets] = useState([]);
  const [supermarket, setSupermarket] = useState([]);
  const [tracking, setTracking] = useState(() => {
    const stored = localStorage.getItem("track");
    return stored ? JSON.parse(stored) : null;
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);




  return (
    <MenuContext.Provider value={
      {
        products,
        setProducts,
        cart,
        setCart,
        orders,
        setOrders,
        electronics,
        setElectronics,
        fashion,
        setFashion,
        healthBeauty,
        setHealthBeauty,
        homeOffice,
        setHomeOffice,
        kitchen,
        setKitchen,
        gadgets,
        setGadgets,
        supermarket,
        setSupermarket,
        tracking,
        setTracking,
        filteredProducts,
        setFilteredProducts,
        showPopup,
        setShowPopup,
        paymentSumm,
        setPaymentSumm,
        cartQuantity,
        setCartQuantity
      }
    } >
      {children}
    </MenuContext.Provider>
  )
}