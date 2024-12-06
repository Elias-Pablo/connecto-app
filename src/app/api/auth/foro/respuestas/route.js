import connection from "@/lib/db";
import jwt from "jsonwebtoken";

// Crear una nueva respuesta en el foro (POST)
export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return new Response(JSON.stringify({ message: "No autorizado" }), { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id_perfil } = decoded; // Usar id_perfil en lugar de id_usuario

    const { id_publicaciones, respuesta } = await req.json();

    if (!id_publicaciones || !respuesta) {
      return new Response(JSON.stringify({ message: "Todos los campos son obligatorios" }), { status: 400 });
    }

    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO respuestas_foro (id_publicaciones, id_perfil, respuesta, tiempo_creacion) VALUES (?, ?, ?, NOW())",
        [id_publicaciones, id_perfil, respuesta],
        (error, results) => {
          if (error) {
            console.error("Error al insertar respuesta:", error);
            reject(new Response(JSON.stringify({ message: "Error al insertar respuesta" }), { status: 500 }));
          } else {
            resolve(new Response(JSON.stringify({ message: "Respuesta creada exitosamente", id: results.insertId }), { status: 201 }));
          }
        }
      );
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
  }
}



export async function GET(req) {
  const url = new URL(req.url);
  const id_publicaciones = url.searchParams.get("id_publicaciones");

  if (!id_publicaciones) {
    return new Response(JSON.stringify({ message: "ID de publicación requerido" }), { status: 400 });
  }

  try {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT rf.id_respuesta, rf.respuesta, rf.tiempo_creacion, p.nombre
         FROM respuestas_foro rf
         JOIN perfiles p ON rf.id_perfil = p.id_perfil
         WHERE rf.id_publicaciones = ?`,
        [id_publicaciones],
        (error, results) => {
          if (error) {
            console.error("Error al obtener respuestas:", error);
            reject(new Response(JSON.stringify({ message: "Error al obtener respuestas" }), { status: 500 }));
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

