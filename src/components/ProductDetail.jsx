import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext"; // <== importante
import './ProductDetail.css';

export default function ProductDetail() {
  const { state } = useLocation();
  const producto = state?.producto;
  const { addToCart } = useCart();

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div style={{ display: 'flex', padding: '2rem', gap: '2rem' }}>
      <img src={producto.img} alt={producto.description} style={{ width: '300px' }} />
      <div>
        <h2>{producto.description}</h2>
        <p>Categoría: {producto.category}</p>
        <p>Envío: ${producto.shippingCost}</p>
        <h3>Total: ${producto.total}</h3>

        <div>
          <button onClick={() => addToCart(producto)}>Agregar al carrito</button>
          <button>Comprar ahora</button>
        </div>
      </div>
    </div>
  );
}
