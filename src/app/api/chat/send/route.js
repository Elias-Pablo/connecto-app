import connectionpromise from "@/lib/db2";

export async function POST(req) {
  try {
    const { id_remitente, id_destinatario, id_conversacion, contenido } =
      await req.json();

    if (!id_remitente || !id_destinatario || !id_conversacion || !contenido) {
      return new Response(
        JSON.stringify({ message: "Todos los campos son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insertar mensaje en la base de datos
    await connectionpromise.query(
      `INSERT INTO mensajes (id_conversacion, id_remitente, id_destinatario, contenido, fecha_envio)
       VALUES (?, ?, ?, ?, NOW())`,
      [id_conversacion, id_remitente, id_destinatario, contenido]
    );

    return new Response(
      JSON.stringify({ message: "Mensaje enviado correctamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
