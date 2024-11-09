import connection from "@/lib/db";
import jwt from "jsonwebtoken";

// Obtener datos de usuario
export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const [user] = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT nombre_usuario AS name, usuario_imagen AS profilePicture, email AS email FROM usuarios WHERE id_usuario = ?",
        [userId],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener los datos del usuario" }),
      { status: 500 }
    );
  }
}

// Actualizar datos de usuario
export async function PUT(req) {
  try {
    const { name, email, profilePicture } = await req.json();
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE usuarios SET nombre_usuario = ?, email = ?, usuario_imagen = ? WHERE id_usuario = ?",
        [name, email, profilePicture, userId],
        (error, results) => {
          if (error) {
            console.error("Error al actualizar los datos del usuario:", error);
            return reject(
              new Response(
                JSON.stringify({ message: "Error al actualizar los datos" }),
                { status: 500 }
              )
            );
          }

          resolve(
            new Response(
              JSON.stringify({ message: "Datos actualizados exitosamente" }),
              { status: 200 }
            )
          );
        }
      );
    });
  } catch (error) {
    console.error("Error al actualizar los datos del usuario:", error);
    return new Response(
      JSON.stringify({ message: "Error al actualizar los datos" }),
      { status: 500 }
    );
  }
}
