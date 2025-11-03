import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/productos") // tu backend Node
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <div className="App">
      <h1>🛒 Warrior Store</h1>
      <h2>Lista de productos</h2>
      <ul>
        {productos.length > 0 ? (
          productos.map((p) => (
            <li key={p.id}>
              <strong>{p.nombre}</strong> — ${p.precio}
            </li>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </ul>
    </div>
  );
}

export default App;
