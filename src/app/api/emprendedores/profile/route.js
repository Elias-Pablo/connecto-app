import connection from "@/lib/db";
import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";

// Obtener el perfil del negocio por el ID de usuario
export async function GET(req) {
  try {
    // Obtener el token JWT de las cookies
    const token = req.cookies?.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
      });
    }

    // Decodificar el token para obtener el `userId`
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Consultar la base de datos para obtener el perfil del negocio
    const profile = await new Promise((resolve, reject) => {
      connection.query(
        `
          SELECT 
            id_perfil,  -- Incluye el id_perfil aquí
            nombre_negocio, 
            descripcion, 
            direccion, 
            telefono, 
            sitioweb_url 
          FROM perfil_negocio 
          WHERE id_usuario = ?
        `,
        [userId],
        (error, results) => {
          if (error) return reject(error);
          resolve(results[0]); // Obtener el primer resultado
        }
      );
    });

    if (!profile) {
      return new Response(
        JSON.stringify({ message: "Perfil de negocio no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener el perfil del negocio:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener el perfil" }),
      { status: 500 }
    );
  }
}

// Actualizar el perfil del negocio
export async function PUT(req) {
  try {
    const { nombre_negocio, descripcion, direccion, telefono, sitioweb_url } =
      await req.json();

    // Obtener el token JWT de las cookies
    const token = req.cookies?.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
      });
    }

    // Decodificar el token para obtener el `userId`
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Actualizar los datos del perfil del negocio en la base de datos
    await new Promise((resolve, reject) => {
      connection.query(
        `
          UPDATE perfil_negocio 
          SET 
            nombre_negocio = ?, 
            descripcion = ?, 
            direccion = ?, 
            telefono = ?, 
            sitioweb_url = ?
          WHERE id_usuario = ?
        `,
        [
          nombre_negocio,
          descripcion,
          direccion,
          telefono,
          sitioweb_url,
          userId,
        ],
        (error) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });

    return new Response(
      JSON.stringify({
        message: "Perfil de negocio actualizado correctamente",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el perfil del negocio:", error);
    return new Response(
      JSON.stringify({ message: "Error al actualizar el perfil" }),
      { status: 500 }
    );
  }
}
