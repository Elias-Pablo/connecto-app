import connection from '@/lib/db'

export async function POST(req) {
  try {
    const { id_remitente, id_destinatario } = await req.json()

    if (!id_remitente || !id_destinatario) {
      return new Response(
        JSON.stringify({ message: 'Faltan datos requeridos' }),
        { status: 400 }
      )
    }

    // Verificar si ya existe una conversación
    const [existingConversation] = await connection.query(
      `SELECT id_conversacion FROM conversaciones
       WHERE (id_remitente = ? AND id_destinatario = ?)
       OR (id_remitente = ? AND id_destinatario = ?)`,
      [id_remitente, id_destinatario, id_destinatario, id_remitente]
    )

    if (existingConversation.length > 0) {
      return new Response(
        JSON.stringify({
          id_conversacion: existingConversation[0].id_conversacion,
        }),
        { status: 200 }
      )
    }

    // Crear una nueva conversación
    const [result] = await connection.query(
      `INSERT INTO conversaciones (nombre_conversacion)
       VALUES (?)`,
      [
        `Chat entre ${id_remitente} y ${id_destinatario}`,
        id_remitente,
        id_destinatario,
      ]
    )

    return new Response(JSON.stringify({ id_conversacion: result.insertId }), {
      status: 201,
    })
  } catch (error) {
    console.error('Error al crear la conversación:', error)
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor' }),
      { status: 500 }
    )
  }
}
