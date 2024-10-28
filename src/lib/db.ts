import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10, // ajusta el límite según tus necesidades
  queueLimit: 0,
});

export async function query({ query, values = [] }) {
  try {
    const [results] = await pool.execute(query, values);
    return results;
  } catch (error: any) {
    console.error("Database query error:", error.message);
    throw new Error(error.message);
  }
}
