import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { addToCart } from "../redux/slice/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => {
        setProducto(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener el producto:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(producto));
  };

  if (loading) return <p>Cargando producto...</p>;
  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>{producto.description}</h2>
      <img src={producto.img} alt={producto.description} style={{ width: '300px' }} />
      <p>Precio: ${producto.total}</p>
      <button onClick={handleAddToCart} style={{ marginTop: '10px' }}>
        Agregar al carrito
      </button>
    </div>
  );
}
