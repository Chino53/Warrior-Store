import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

import "./App.css";

function App() {
  // Estado global para manejar el usuario actual
  const [user, setUser] = useState(null);

  // Ejemplo de conexión inicial al backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/test")
      .then(res => console.log("✅ Conectado con backend:", res.data))
      .catch(err => console.error("❌ Error al conectar con backend:", err));
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
