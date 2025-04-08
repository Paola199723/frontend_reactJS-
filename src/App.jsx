import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import './components/Navbar.css';
import './components/ProductCard.css';
import Productos from "./components/productos";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Bienvenido</h1>} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<h1>Carrito</h1>} />
        <Route path="/producto/:id" element={<h1>Detalle del producto</h1>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
