import connectionpromise from '@/lib/db2'
export const dynamic = 'force-dynamic'

// Ruta para obtener mensajes de una conversación específica
export async function GET(req) {
  try {
    // Extraer parámetros de la URL
    const { searchParams } = new URL(req.url)
    const id_conversacion = searchParams.get('id_conversacion')

    // Validar el parámetro requerido
    if (!id_conversacion) {
      return new Response(
        JSON.stringify({ message: 'id_conversacion es requerido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Ejecutar la consulta para obtener los mensajes de la conversación
    const [mensajes] = await connectionpromise.query(
      `
      SELECT
        m.id_mensaje,
        m.contenido,
        m.fecha_envio,
        u.nombre_usuario AS remitente
      FROM
        mensajes m
      JOIN
        usuarios u
      ON
        m.id_remitente = u.id_usuario
      WHERE
        m.id_conversacion = ?
      ORDER BY
        m.fecha_envio ASC
      `,
      [id_conversacion]
    )

    // Retornar los mensajes obtenidos
    return new Response(JSON.stringify({ mensajes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    // Manejo de errores del servidor
    console.error('Error al obtener los mensajes:', error)
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
