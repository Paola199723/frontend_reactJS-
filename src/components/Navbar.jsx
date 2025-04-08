import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
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
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
        <a href="#">  <FaShoppingCart style={{ marginRight: "4px" }} />
        Carrito</a>
      </div>
    </nav>
  );
}
