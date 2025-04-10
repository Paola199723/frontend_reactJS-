// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import welcomeImage from '../assets/welcomeImage.jpg';
import ProductCard from './ProductCard';
import './ProductCard.css'; // reutilizamos los estilos ya definidos

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <div>
      {/* Sección de bienvenida */}
      <section style={styles.heroSection}>
        <h1 style={styles.heading}>Bienvenido a nuestra Tienda Online</h1>
        <img src={welcomeImage} alt="Bienvenida" style={styles.image} />
        <p style={styles.text}>Explora nuestros productos y ofertas exclusivas.</p>
        <a href="#productos" style={styles.button}>Ver Productos</a>
      </section>

      {/* Sección de productos */}
      <section id="productos" style={styles.productSection}>
        <h2 style={styles.subheading}>Nuestros Productos</h2>
        <div style={styles.productGrid}>
          {productos.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            productos.map(producto => (
              <ProductCard key={producto.id} producto={producto} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

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

export default Home;
