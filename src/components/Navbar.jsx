import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Mi Tienda</div>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
      <div className={`menu ${isOpen ? "show" : ""}`}>
      <Link to="/">Inicio</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/carrito"><FaShoppingCart style={{ marginRight: "4px" }} />Carrito</Link>
      </div>
    </nav>
  );
}
