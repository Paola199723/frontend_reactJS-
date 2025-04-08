// src/pages/Productos.jsx
import React, { useState } from "react";
import ProductCard from "./ProductCard";

const productos = [
  {
    id: 1,
    titulo: "Kit De Sillas Charles Eames",
    precio: 299000,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_982123-MLA52276116907_112022-F.webp",
    categoria: "Hogar",
  },
  {
    id: 2,
    titulo: "Sillas Solna para jardín",
    precio: 568700,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_602356-MLA49596409191_042022-F.webp",
    categoria: "Jardín",
  },
  {
    id: 3,
    titulo: "Estantería Metálica",
    precio: 380000,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_683822-MLA50808837242_072022-F.webp",
    categoria: "Hogar",
  }
];

const categorias = ["Todo", "Hogar", "Jardín"];

export default function Productos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todo");

  const productosFiltrados =
    categoriaSeleccionada === "Todo"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      {/* Submenú de categorías */}
      <aside style={{ width: "200px", marginRight: "24px" }}>
        <h3>Categoría</h3>
        {categorias.map((cat) => (
          <label key={cat} style={{ display: "block", marginBottom: "8px" }}>
            <input
              type="radio"
              name="categoria"
              value={cat}
              checked={categoriaSeleccionada === cat}
              onChange={() => setCategoriaSeleccionada(cat)}
              style={{ marginRight: "8px" }}
            />
            {cat}
          </label>
        ))}
      </aside>

      {/* Cards de productos */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", flexGrow: 1 }}>
        {productosFiltrados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}
