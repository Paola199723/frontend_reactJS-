import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTotalItems } from "../redux/slice/cartSlice";
import "./Navbar.css";

// ...


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = useSelector(selectTotalItems);


  return (
    <nav className="navbar">
      <div className="logo">Mi Tienda</div>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>☰</div>
      <div className={`menu ${isOpen ? "show" : ""}`}>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/carrito" style={{ position: 'relative' }}>
          <FaShoppingCart />
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px'
            }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
