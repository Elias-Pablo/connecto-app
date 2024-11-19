import connection from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    const fecha = new Date().toISOString().slice(0, 19).replace("T", " "); // Formato 'YYYY-MM-DD HH:MM:SS'

    const insertUserQuery = `
      INSERT INTO usuarios (nombre_usuario, tipo_usuario, email, contraseña, tiempo_creacion)
      VALUES (?, 'user', ?, ?, ?)
    `;
    const values = [username, email, password, fecha];
    const result = await new Promise((resolve, reject) => {
      connection.query(insertUserQuery, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return new Response(
      JSON.stringify({ message: "Usuario registrado exitosamente", result }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return new Response(
      JSON.stringify({ error: "Error al registrar usuario" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
