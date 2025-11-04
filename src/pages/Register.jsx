import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext) || {}; // 🔹 Evita errores si UserContext aún no está inicializado

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      // 🔹 Intenta registrar en el backend
      const res = await axios.post("http://localhost:5000/api/users/register", form);

      // 🔹 Si hay contexto de usuario, loguea automáticamente
      if (login) login(res.data.user);

      alert("✅ Usuario registrado correctamente");
      navigate("/login");
    } catch (err) {
      console.error("Error al registrarse:", err);
      setError(err.response?.data?.message || "❌ Error al registrarte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          required
        />
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
          {loading ? "Registrando..." : "Registrarme"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
