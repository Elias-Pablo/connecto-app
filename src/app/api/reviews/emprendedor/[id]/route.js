import connection from "@/lib/db";
import jwt from "jsonwebtoken";

// Obtener reseñas del emprendedor
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const entrepreneurId = params.id;

  if (!entrepreneurId) {
    return new Response(
      JSON.stringify({ message: "ID del emprendedor es requerido" }),
      { status: 400 }
    );
  }

  try {
    // Obtener reseñas del emprendedor
    const reviews = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT r.comentario, r.calificacion, r.fecha_creacion, u.nombre_usuario FROM entrepreneur_reviews r JOIN usuarios u ON r.id_usuario = u.id_usuario WHERE r.id_emprendedor = ?",
        [entrepreneurId],
        (error, results) => {
          if (error) {
            console.error("Error al obtener las reseñas:", error);
            return reject(
              new Response(
                JSON.stringify({
                  message: "Error al obtener las reseñas",
                  error: error.message,
                }),
                { status: 500 }
              )
            );
          }
          resolve(results);
        }
      );
    });

    return new Response(JSON.stringify({ reviews }), { status: 200 });
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return new Response(
      JSON.stringify({
        message: "Error en la solicitud",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// Agregar una nueva reseña
export async function POST(req, { params }) {
  const token = req.cookies.get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;
  const { calificacion, comentario } = await req.json();
  const entrepreneurId = params.id; // El ID del emprendedor

  if (!entrepreneurId || !calificacion || !comentario) {
    return new Response(
      JSON.stringify({ message: "Todos los campos son obligatorios" }),
      { status: 400 }
    );
  }

  try {
    // Insertar la reseña en la base de datos
    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO entrepreneur_reviews (id_usuario, id_emprendedor, comentario, calificacion) VALUES (?, ?, ?, ?)",
        [userId, entrepreneurId, comentario, calificacion],
        (error, results) => {
          if (error) {
            console.error("Error al agregar reseña:", error);
            return reject(
              new Response(
                JSON.stringify({
                  message: "Error al agregar reseña",
                  error: error.message,
                }),
                { status: 500 }
              )
            );
          }
          resolve(results);
        }
      );
    });

    return new Response(
      JSON.stringify({ message: "Reseña agregada exitosamente" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return new Response(
      JSON.stringify({
        message: "Error en la solicitud",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
