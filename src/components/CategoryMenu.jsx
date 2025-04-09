// src/components/CategoryMenu.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CategoryMenu.css';

export default function CategoryMenu({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error al obtener categorías', err));
  }, []);

  return (
    <div className="category-menu">
      <button onClick={() => onSelectCategory(null)}>Todas</button>
      {categories.map((cat) => (
        <button key={cat.id} onClick={() => onSelectCategory(cat.name)}>
          {cat.name}
        </button>
      ))}
    </div>
  );
}
