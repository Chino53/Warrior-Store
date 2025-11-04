import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
// Si todavía no creaste ProductDetail.jsx, no pasa nada — podés comentarlo o crearlo después
import ProductDetail from "./pages/ProductDetail";

import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

import "./App.css";

function App() {
  // Prueba de conexión con backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/test")
      .then((res) => console.log("✅ Conectado con backend:", res.data))
      .catch((err) => console.error("❌ Error al conectar con backend:", err));
  }, []);

  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>

          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
