import express from "express";
import connection from "../config/db.js";
import { getProducts } from "../controllers/productsController.js";

const router = express.Router();

// 📦 Obtener todos los productos
router.get("/", (req, res) => {
  const sql = "SELECT * FROM productos";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener productos:", err);
      res.status(500).json({ error: "Error al obtener productos" });
    } else {
      res.json(results);
    }
  });
});

// ➕ Agregar un nuevo producto
router.post("/add", (req, res) => {
  const { nombre, descripcion, precio, stock, imagen } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: "Nombre y precio son obligatorios" });
  }

  const sql =
    "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [nombre, descripcion, precio, stock, imagen], (err, result) => {
    if (err) {
      console.error("❌ Error al agregar producto:", err);
      res.status(500).json({ error: "Error al agregar el producto" });
    } else {
      res.status(201).json({ message: "Producto agregado con éxito" });
    }
  });
});

export default router;
