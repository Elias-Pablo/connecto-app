import connection from "@/lib/db";
import jwt from "jsonwebtoken";

// Obtener el avatar del usuario
export async function GET(req) {
  try {
    // Obtener el token JWT de las cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
      });
    }

    // Decodificar el token para obtener el `userId`
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Consultar la base de datos para obtener el avatar del usuario
    const [user] = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT usuario_imagen FROM usuarios WHERE id_usuario = ?",
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
    console.error("Error al obtener el avatar del usuario:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener el avatar" }),
      { status: 500 }
    );
  }
}

// Actualizar el avatar del usuario
export async function PUT(req) {
  try {
    const { usuario_imagen } = await req.json();

    // Obtener el token JWT de las cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
      });
    }

    // Decodificar el token para obtener el `userId`
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Actualizar el avatar del usuario en la base de datos
    await new Promise((resolve, reject) => {
      connection.query(
        `UPDATE usuarios 
         SET usuario_imagen = ? 
         WHERE id_usuario = ?`,
        [usuario_imagen, userId],
        (error) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });

    return new Response(
      JSON.stringify({ message: "Avatar actualizado correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el avatar del usuario:", error);
    return new Response(
      JSON.stringify({ message: "Error al actualizar el avatar" }),
      { status: 500 }
    );
  }
}
