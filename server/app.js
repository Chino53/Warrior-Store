import express from "express";
import mysql from "mysql2";

const app = express();
const PORT = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "warrior", // 👈 nuevo usuario
  password: "1234", // 👈 su contraseña
  database: "warrior_store",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
    return;
  }
  console.log("✅ Conexión exitosa a MySQL");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
