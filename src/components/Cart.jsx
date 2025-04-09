import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPagar,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div style={{ display: 'flex', padding: '2rem', gap: '2rem' }}>
      {/* RESUMEN DE COMPRA */}
      <div
        style={{
          flex: '1',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          height: 'fit-content',
        }}
      >
        <h2>Resumen de compra</h2>
        <p>
          <strong>Total de artículos:</strong> {totalItems}
        </p>
        <p>
          <strong>Total a pagar:</strong> ${totalPagar.toLocaleString()}
        </p>

        <button onClick={() => setShowCheckout(true)}>Hacer Pedido</button>

        {showCheckout && (
          <CheckoutModal onClose={() => setShowCheckout(false)} />
        )}
      </div>

      {/* LISTA DE ITEMS DEL CARRITO */}
      <div style={{ flex: '3' }}>
        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          cartItems.map((producto) => (
            <div
              key={producto.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                borderBottom: '1px solid #ddd',
                paddingBottom: '1rem',
              }}
            >
              <img
                src={producto.img}
                alt={producto.description}
                style={{ width: '100px', marginRight: '1rem' }}
              />
              <div style={{ flex: '1' }}>
                <h4>{producto.description}</h4>
                <p>Precio unitario: ${producto.total}</p>
                <label>Cantidad: </label>
                <select
                  value={producto.cantidad}
                  onChange={(e) =>
                    updateQuantity(producto.id, parseInt(e.target.value))
                  }
                >
                  {[...Array(8).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => removeFromCart(producto.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'red',
                  cursor: 'pointer',
                }}
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
