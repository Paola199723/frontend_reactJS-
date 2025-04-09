// ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import './ProductCard.css';

export default function ProductCard({ producto }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/producto/${producto.id}`, { state: { producto } });
  };

  return (
    <div className="product-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={producto.img} alt={producto.description} />
      <h3>{producto.description}</h3>
      <p>Precio: ${producto.price}</p>
      <p>Envío: ${producto.shippingCost}</p>
      <strong>Total: ${producto.total}</strong>
    </div>
  );
}

// links de imagnes
/*
zapato branco
https://asset.cloudinary.com/dix4crqes/1d2c9ca43b9058c6ce21e72d84c3c363
zapatos deportivo rojao y blanco
https://asset.cloudinary.com/dix4crqes/3e0aaff28395195277a19c99463f7c04
ropa deportiva
https://asset.cloudinary.com/dix4crqes/cdbfbb8ee0e48ce03cd9fbebda70f509
*/