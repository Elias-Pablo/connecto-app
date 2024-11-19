import connection from "@/lib/db";

export async function POST(req) {
  const { tipo_interaccion, id_perfil, id_producto } = await req.json();

  if (!tipo_interaccion || !id_perfil) {
    return new Response(JSON.stringify({ message: "Datos incompletos" }), {
      status: 400,
    });
  }

  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO interacciones (id_perfil, id_producto, tipo_interaccion, fecha_interaccion)
      VALUES (?, ?, ?, NOW())
    `;

    connection.query(
      query,
      [id_perfil, id_producto || null, tipo_interaccion],
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
