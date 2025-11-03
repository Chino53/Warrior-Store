import connection from "../config/db.js";

// ✅ Esta función obtiene todos los productos
export const getProducts = (req, res) => {
  const query = "SELECT * FROM products";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener productos:", err);
      return res.status(500).json({ error: "Error al obtener productos" });
    }
    res.json(results);
  });
};
