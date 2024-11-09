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
      const token = jwt.sign(
        {
          userId: user.id_usuario,
          username: user.nombre_usuario,
          tipo_usuario: user.tipo_usuario,
          profilePicture: user.usuario_imagen,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
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
    return new Response(
      JSON.stringify({ success: false, error: "Error al iniciar sesión" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
