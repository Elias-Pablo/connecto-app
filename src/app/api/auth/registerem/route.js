import connection from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { businessName, email, password } = body;
    const fecha = new Date().toISOString().slice(0, 19).replace("T", " "); // Formato de fecha

    // Preferencia predeterminada para el perfil
    const defaultPreferences = 1; // Ajustar según tu valor predeterminado o lógica

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
      const insertPreferenceQuery = `INSERT INTO preferencias (productos_fav, fecha_creacion) VALUES ('', ?)`;
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

    // Insertar el usuario con tipo emprendedor
    const insertUserQuery = `INSERT INTO usuarios (nombre_usuario, id_preferencias, tipo_usuario, email, contraseña, tiempo_creacion) VALUES (?, ?, 'emprendedor', ?, ?, ?)`;
    const values = [businessName, defaultPreferences, email, password, fecha];
    const userResult = await new Promise((resolve, reject) => {
      connection.query(insertUserQuery, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const userId = userResult.insertId;

    // Crear perfil de negocio asociado
    const insertBusinessProfileQuery = `INSERT INTO perfil_negocio (id_usuario, nombre_negocio) VALUES (?, ?)`;
    const businessProfileValues = [userId, businessName];
    await new Promise((resolve, reject) => {
      connection.query(
        insertBusinessProfileQuery,
        businessProfileValues,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    return new Response(
      JSON.stringify({ message: "Emprendedor registrado exitosamente" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al registrar emprendedor:", error);
    return new Response(
      JSON.stringify({ error: "Error al registrar emprendedor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
