import connection from "@/lib/db";

export async function POST(req) {
  const { tipo_interaccion, id_perfil, id_producto, cantidad } = await req.json();

  if (!tipo_interaccion || !id_perfil || !id_producto || !cantidad) {
    return new Response(JSON.stringify({ message: "Datos incompletos" }), {
      status: 400,
    });
  }

  return new Promise((resolve, reject) => {
    const queryInsert = `
      INSERT INTO interacciones (id_perfil, id_producto, tipo_interaccion, fecha_interaccion, cantidad)
      VALUES (?, ?, ?, NOW(), ?)
    `;

    connection.query(
      queryInsert,
      [id_perfil, id_producto, tipo_interaccion, cantidad],
      (error, results) => {
        if (error) {
          console.error("Error al registrar la interacción:", error);
          reject(
            new Response(JSON.stringify({ message: "Error en el servidor" }), {
              status: 500,
            })
          );
        } else {
          resolve(
            new Response(
              JSON.stringify({ message: "Interacción registrada con éxito" }),
              { status: 200 }
            )
          );
        }
      }
    );
  });
}
