import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import './components/Navbar.css';
import './components/ProductCard.css';
import ProductDetail from "./components/ProductDetail";
import Productos from "./components/Productos";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Cart/>}/>
        <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>
    </Router>
  );
}

export default App;
