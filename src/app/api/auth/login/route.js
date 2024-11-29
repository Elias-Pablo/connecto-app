import connection from "@/lib/db";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const query = "SELECT * FROM usuarios WHERE email = ?";
    const results = await new Promise((resolve, reject) => {
      connection.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email o contraseña incorrectos",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = results[0];

    if (user && user.contraseña === password) {
      let id_perfil = null;

      // Si el usuario es "emprendedor", busca el id_perfil
      if (user.tipo_usuario === "emprendedor") {
        const perfilQuery =
          "SELECT id_perfil FROM perfil_negocio WHERE id_usuario = ?";
        const perfilResults = await new Promise((resolve, reject) => {
          connection.query(perfilQuery, [user.id_usuario], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });

        if (perfilResults.length > 0) {
          id_perfil = perfilResults[0].id_perfil;
        }
      }

      // Crear el token JWT con id_perfil si es emprendedor
      const token = jwt.sign(
        {
          userId: user.id_usuario,
          username: user.nombre_usuario,
          tipo_usuario: user.tipo_usuario,
          profilePicture: user.usuario_imagen,
          id_perfil, // Incluye el id_perfil en el token si existe
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return new Response(
        JSON.stringify({
          success: true,
          message: "Inicio de sesión exitoso",
          token,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600;`,
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email o contraseña incorrectos",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error en el login:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error al iniciar sesión" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
