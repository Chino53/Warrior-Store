import express from "express";
import connection from "../config/db.js";

const router = express.Router();

// Ruta para registrar usuario
router.post("/register", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  connection.query(sql, [nombre, email, password], (err, result) => {
    if (err) {
      console.error("❌ Error al registrar usuario:", err);
      res.status(500).json({ error: "Error al registrar el usuario" });
    } else {
      res.status(201).json({ message: "Usuario registrado con éxito" });
    }
  });
});

// Ruta para listar usuarios (solo para probar)
router.get("/", (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error al obtener los usuarios" });
    } else {
      res.json(results);
    }
  });
});

export default router;
