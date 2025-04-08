// src/components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import './ProductCard.css';

export default function ProductCard({ producto }) {
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/producto/${producto.id}`)}>
      <img src={producto.imagen} alt={producto.titulo} className="product-img" />
      <div className="product-info">
        <h3>{producto.titulo}</h3>
        <p className="product-price">${producto.precio.toLocaleString()}</p>
        <p className="product-cuotas">en 12 cuotas de ${(producto.precio / 12).toFixed(0)} con 0% interés</p>
        <p className="product-envio">📦 Envío gratis por ser tu primera compra</p>
      </div>
    </div>
  );
}
