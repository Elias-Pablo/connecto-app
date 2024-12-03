import connection from "@/lib/db";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Token no proporcionado" }),
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const idPerfil = decoded.id_perfil;

    const query = `
      SELECT 
        pr.comentario, 
        pr.calificacion, 
        pr.fecha_creacion, 
        p.nombre AS producto,
        u.nombre_usuario AS usuario
      FROM product_reviews pr
      JOIN productos p ON pr.id_producto = p.id_producto
      JOIN usuarios u ON pr.id_usuario = u.id_usuario
      WHERE p.id_perfil = ?
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [idPerfil], (error, results) => {
        if (error) {
          console.error("Error al obtener reseñas de productos:", error);
          reject(
            new Response(
              JSON.stringify({ message: "Error al obtener reseñas" }),
              { status: 500 }
            )
          );
        }
        resolve(
          new Response(JSON.stringify({ reviews: results }), { status: 200 })
        );
      });
    });
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      { status: 500 }
    );
  }
};
