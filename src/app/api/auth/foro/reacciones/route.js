import connection from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return new Response(JSON.stringify({ message: "No autorizado" }), { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id_perfil } = decoded;

    const { id_publicaciones, tipo } = await req.json();

    if (!id_publicaciones || !tipo) {
      return new Response(
        JSON.stringify({ message: "Todos los campos son obligatorios" }),
        { status: 400 }
      );
    }

    // Verificar si ya existe una reacción del usuario para esta publicación y tipo
    const [existingReaccion] = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT id_reaccion FROM reacciones_foro WHERE id_perfil = ? AND id_publicaciones = ? AND tipo = ?`,
        [id_perfil, id_publicaciones, tipo],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });

    if (existingReaccion) {
      // Si ya existe, elimina la reacción (como un "toggle")
      await new Promise((resolve, reject) => {
        connection.query(
          `DELETE FROM reacciones_foro WHERE id_reaccion = ?`,
          [existingReaccion.id_reaccion],
          (error) => {
            if (error) reject(error);
            resolve();
          }
        );
      });

      return new Response(
        JSON.stringify({ message: "Reacción eliminada exitosamente" }),
        { status: 200 }
      );
    } else {
      // Si no existe, insertar una nueva reacción
      await new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO reacciones_foro (id_publicaciones, id_perfil, tipo, tiempo_creacion) VALUES (?, ?, ?, NOW())`,
          [id_publicaciones, id_perfil, tipo],
          (error) => {
            if (error) reject(error);
            resolve();
          }
        );
      });

      return new Response(
        JSON.stringify({ message: "Reacción registrada exitosamente" }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
  }
}
