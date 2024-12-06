import connection from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (!token) return new Response(JSON.stringify({ message: "No autorizado" }), { status: 401 });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id_perfil } = decoded; // Se usa id_perfil
  
      const { id_publicaciones, tipo } = await req.json();
  
      if (!id_publicaciones || !tipo) {
        return new Response(JSON.stringify({ message: "Campos obligatorios faltantes" }), { status: 400 });
      }
  
      await new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO reacciones_foro (id_publicaciones, id_perfil, tipo) VALUES (?, ?, ?)`,
          [id_publicaciones, id_perfil, tipo],
          (error) => {
            if (error) reject(error);
            resolve();
          }
        );
      });
  
      return new Response(JSON.stringify({ message: "Reacción registrada" }), { status: 201 });
    } catch (error) {
      console.error("Error en el servidor:", error);
      return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
    }
  }
  
