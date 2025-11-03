import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // tu contraseña de MySQL
  database: "warrior_store", // nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err);
  } else {
    console.log("✅ Conexión exitosa a MySQL");
  }
});

export default connection; // 👈 ESTA LÍNEA ES LA CLAVE
