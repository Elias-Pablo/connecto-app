import connection from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    const fecha = new Date().toISOString().slice(0, 19).replace("T", " "); // Formato 'YYYY-MM-DD HH:MM:SS'
    const defaultPreferences = 1; // ID de preferencia predeterminada

    // Verificar si existe la preferencia predeterminada
    const checkPreferenceQuery = `SELECT id_preferencias FROM preferencias WHERE id_preferencias = ?`;
    const [preference] = await new Promise((resolve, reject) => {
      connection.query(
        checkPreferenceQuery,
        [defaultPreferences],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    // Si no existe la preferencia, insertar una nueva
    if (!preference) {
      const insertPreferenceQuery = `
        INSERT INTO preferencias (productos_fav, fecha_creacion)
        VALUES ('', ?)
      `;
      await new Promise((resolve, reject) => {
        connection.query(insertPreferenceQuery, [fecha], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }

    // Insertar el usuario con el ID de preferencia predeterminado
    const insertUserQuery = `
      INSERT INTO usuarios (nombre_usuario, id_preferencias, tipo_usuario, email, contraseña, tiempo_creacion)
      VALUES (?, ?, 'user', ?, ?, ?)
    `;
    const values = [username, defaultPreferences, email, password, fecha];
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
