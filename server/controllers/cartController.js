import connection from "../config/db.js";

// 🛒 Agregar producto al carrito
export function addToCart(req, res) {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const query = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
  `;

  connection.query(query, [user_id, product_id, quantity], (err) => {
    if (err) {
      console.error("❌ Error al agregar al carrito:", err);
      return res.status(500).json({ error: "Error al agregar al carrito" });
    }
    res.json({ message: "✅ Producto agregado al carrito" });
  });
}

// 🛍️ Obtener carrito de un usuario
export function getCart(req, res) {
  const { user_id } = req.params;

  const query = `
    SELECT c.id, p.name, p.price, c.quantity
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  connection.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener carrito:", err);
      return res.status(500).json({ error: "Error al obtener carrito" });
    }
    res.json(results);
  });
}

// ❌ Eliminar producto del carrito
export function removeFromCart(req, res) {
  const { id } = req.params;

  const query = "DELETE FROM cart WHERE id = ?";

  connection.query(query, [id], (err) => {
    if (err) {
      console.error("❌ Error al eliminar producto:", err);
      return res.status(500).json({ error: "Error al eliminar producto" });
    }
    res.json({ message: "🗑️ Producto eliminado del carrito" });
  });
}
