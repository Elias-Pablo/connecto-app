import connectionpromise from "@/lib/db2";

// Ruta para obtener o crear una conversación
export async function POST(req) {
  try {
    const { id_remitente, id_destinatario } = await req.json();

    if (!id_remitente || !id_destinatario) {
      return new Response(
        JSON.stringify({
          message: "id_remitente e id_destinatario son requeridos",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verificar si ya existe una conversación
    const [existingConversation] = await connectionpromise.query(
      `SELECT id_conversacion FROM conversaciones
       WHERE (id_usuario1 = ? AND id_usuario2 = ?)
       OR (id_usuario1 = ? AND id_usuario2 = ?)`,
      [id_remitente, id_destinatario, id_destinatario, id_remitente]
    );

    if (existingConversation.length > 0) {
      return new Response(
        JSON.stringify({
          id_conversacion: existingConversation[0].id_conversacion,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Crear una nueva conversación si no existe
    const [newConversation] = await connectionpromise.query(
      `INSERT INTO conversaciones (id_usuario1, id_usuario2, nombre_conversacion)
       VALUES (?, ?, ?)`,
      [
        id_remitente,
        id_destinatario,
        `Chat entre ${id_remitente} y ${id_destinatario}`,
      ]
    );

    return new Response(
      JSON.stringify({ id_conversacion: newConversation.insertId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al manejar la conversación:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
