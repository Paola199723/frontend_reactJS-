import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    removeFromCart,
    selectCartItems,
    selectTotalItems,
    selectTotalPagar,
    updateQuantity
} from "../redux/slice/cartSlice";
import CheckoutModal from "./CheckoutModal";
import "./CheckoutModal.css";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPagar = useSelector(selectTotalPagar);
  const dispatch = useDispatch();

  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div style={{ display: 'flex', padding: '2rem', gap: '2rem' }}>
      {/* RESUMEN DE COMPRA */}
      <div style={{
        flex: '1',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        height: 'fit-content',
      }}>
        <h2>Resumen de compra</h2>
        <p><strong>Total de artículos:</strong> {totalItems}</p>
        <p><strong>Total a pagar:</strong> ${totalPagar.toLocaleString()}</p>
        <button style={styles.button} disabled={cartItems.length === 0} onClick={() => setShowCheckout(true)} >
          Hacer Pedido
        </button>
        {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
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
                    dispatch(updateQuantity({
                      id: producto.id,
                      cantidad: parseInt(e.target.value)
                    }))
                  }
                >
                  {[...Array(8).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(producto.id))}
                style={styles.button}
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
const styles = {
    heroSection: {
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '1000px',
      margin: '2rem auto',
    },
    heading: {
      fontSize: '2rem',
      color: '#333',
    },
    image: {
      width: '100%',
      maxWidth: '500px',
      margin: '1rem 0',
      borderRadius: '8px',
    },
    text: {
      fontSize: '1rem',
      color: '#666',
    },
    button: {
      display: 'inline-block',
      padding: '0.8rem 2rem',
      backgroundColor: '#007BFF',
      color: '#fff',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '1rem',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
    productSection: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    subheading: {
      textAlign: 'center',
      fontSize: '1.8rem',
      marginBottom: '1rem',
      color: '#333',
    },
    productGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      justifyContent: 'center',
    },
  };
  
