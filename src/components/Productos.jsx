import React, { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "./ProductCard";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} /> 
        ))
      )}
    </div>
  );
}
