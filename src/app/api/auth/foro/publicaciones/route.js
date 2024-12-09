import connection from "@/lib/db";
import jwt from "jsonwebtoken";

// Eliminar una publicación
export async function DELETE(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return new Response(JSON.stringify({ message: "No autorizado" }), { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id_perfil } = decoded; // Validar que el usuario sea el dueño

    const url = new URL(req.url);
    const id_publicaciones = url.searchParams.get("id_publicaciones");

    if (!id_publicaciones) {
      return new Response(JSON.stringify({ message: "ID de publicación requerido" }), { status: 400 });
    }

    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM publicaciones_foro WHERE id_publicaciones = ? AND id_perfil = ?`,
        [id_publicaciones, id_perfil],
        (error, results) => {
          if (error) {
            console.error("Error al eliminar publicación:", error);
            reject(new Response(JSON.stringify({ message: "Error al eliminar publicación" }), { status: 500 }));
          } else if (results.affectedRows === 0) {
            resolve(new Response(JSON.stringify({ message: "Publicación no encontrada o no autorizada" }), { status: 404 }));
          } else {
            resolve(new Response(JSON.stringify({ message: "Publicación eliminada exitosamente" }), { status: 200 }));
          }
        }
      );
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
  }
}

// Actualizar una publicación
export async function PUT(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return new Response(JSON.stringify({ message: "No autorizado" }), { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id_perfil } = decoded;

    const { id_publicaciones, titulo, descripcion } = await req.json();

    if (!id_publicaciones || !titulo || !descripcion) {
      return new Response(JSON.stringify({ message: "Todos los campos son obligatorios" }), { status: 400 });
    }

    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE publicaciones_foro SET titulo = ?, descripcion = ? WHERE id_publicaciones = ? AND id_perfil = ?`,
        [titulo, descripcion, id_publicaciones, id_perfil],
        (error, results) => {
          if (error) {
            console.error("Error al actualizar publicación:", error);
            reject(new Response(JSON.stringify({ message: "Error al actualizar publicación" }), { status: 500 }));
          } else if (results.affectedRows === 0) {
            resolve(new Response(JSON.stringify({ message: "Publicación no encontrada o no autorizada" }), { status: 404 }));
          } else {
            resolve(new Response(JSON.stringify({ message: "Publicación actualizada exitosamente" }), { status: 200 }));
          }
        }
      );
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
  }
}
