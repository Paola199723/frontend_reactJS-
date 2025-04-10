// src/components/ProductCard.jsx
import React from 'react';

const ProductCardHome = ({ product }) => {
  return (
    <div style={styles.card}>
      <img src={product.imageUrl} alt={product.name} style={styles.image} />
      <h3 style={styles.title}>{product.name}</h3>
      <p style={styles.price}>${product.price}</p>
      <button style={styles.button}>Añadir al carrito</button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '250px',
    margin: '1rem',
    transition: 'transform 0.3s ease',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  title: {
    fontSize: '1.2rem',
    color: '#333',
  },
  price: {
    fontSize: '1rem',
    color: '#555',
  },
  button: {
    padding: '0.6rem 1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

export default ProductCardHome;
