import connection from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (!token) return new Response(JSON.stringify({ message: "No autorizado" }), { status: 401 });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id_perfil } = decoded;
  
      return new Promise((resolve, reject) => {
        connection.query(
          `SELECT * FROM publicaciones_foro WHERE id_perfil = ?`,
          [id_perfil],
          (error, results) => {
            if (error) {
              console.error("Error al obtener publicaciones del usuario:", error);
              reject(new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 }));
            } else {
              resolve(new Response(JSON.stringify(results), { status: 200 }));
            }
          }
        );
      });
    } catch (error) {
      console.error("Error en el servidor:", error);
      return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
    }
  }
  