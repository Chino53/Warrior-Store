import connection from "../config/db.js";

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  connection.query(query, [name, email, password], (err) => {
    if (err) {
      console.error("❌ Error al registrar usuario:", err);
      return res.status(500).json({ error: "Error al registrar usuario" });
    }
    res.json({ message: "Usuario registrado correctamente" });
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  connection.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el login" });
    if (results.length === 0)
      return res.status(401).json({ error: "Credenciales inválidas" });

    res.json({ message: "Login exitoso", user: results[0] });
  });
};
