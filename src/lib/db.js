import mysql from "mysql2";

const connection = mysql.createPool({
  host: "localhost", // El host de tu servidor MySQL
  user: "root", // Usuario de la base de datos MySQL
  password: "", // Contraseña de la base de datos MySQL
  database: "connecto", // Nombre de la base de datos
  port: "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connection;
