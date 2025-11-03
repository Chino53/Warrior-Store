import express from "express";
import connection from "../config/db.js";

const router = express.Router();

/* 🛒 Obtener todos los productos del carrito */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM carrito";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener el carrito:", err);
      res.status(500).json({ error: "Error al obtener el carrito" });
    } else {
      res.json(results);
    }
  });
});

/* ➕ Agregar producto al carrito */
router.post("/add", (req, res) => {
  const { producto_id, cantidad } = req.body;

  if (!producto_id || !cantidad) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const sql = "INSERT INTO carrito (producto_id, cantidad) VALUES (?, ?)";
  connection.query(sql, [producto_id, cantidad], (err, result) => {
    if (err) {
      console.error("❌ Error al agregar al carrito:", err);
      res.status(500).json({ error: "Error al agregar al carrito" });
    } else {
      res.status(201).json({ message: "Producto agregado al carrito" });
    }
  });
});

/* ❌ Eliminar un producto del carrito */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM carrito WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error al eliminar producto:", err);
      res.status(500).json({ error: "Error al eliminar producto" });
    } else {
      res.json({ message: "Producto eliminado del carrito" });
    }
  });
});

export default router;
