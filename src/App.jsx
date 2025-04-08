import Navbar from "./components/Navbar";
import './components/Navbar.css'; // <--- Importas Tailwind acá

function App() {
  return (
    <>
      <Navbar />

      {/* Espacio para el navbar fijo */}
      <div className="pt-20">
        <h1 className="text-4xl font-bold mt-4">Bienvenido a la tienda</h1>
        {/* Tu contenido aquí */}
      </div>
    </>
  );
}

export default App;
