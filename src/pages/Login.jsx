import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext) || {}; // Evita errores si el contexto no está disponible

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔹 Intentar login en el backend
      const res = await axios.post("http://localhost:5000/api/users/login", form);

      // 🔹 Si hay contexto, guarda el usuario
      if (login) login(res.data.user);

      alert(`✅ Bienvenido, ${res.data.user.name || "usuario"}!`);
      navigate("/");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      const message = err.response?.data?.message || "❌ Credenciales inválidas o error en el servidor.";
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
