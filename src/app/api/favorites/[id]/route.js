import connection from '@/lib/db'

export const dynamic = 'force-dynamic'

// Eliminar un producto de favoritos (DELETE)
export async function DELETE(req, { params }) {
  try {
    // Obtener el `id` de los parámetros y `userId` de la consulta
    const { id } = params
    const url = new URL(req.url) // Obtener la URL de la solicitud
    const userId = url.searchParams.get('userId') // Obtener el userId de la consulta

    if (!id || !userId) {
      return new Response(
        JSON.stringify({
          message: 'El parámetro id y userId son requeridos',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Ejecutar la consulta para eliminar el favorito solo si coinciden `id` y `userId`
    const [results] = await connection
      .promise()
      .query('DELETE FROM favoritos WHERE id_producto = ? AND id_usuario = ?', [
        id,
        userId,
      ])

    // Verificar si se eliminó algún registro
    if (results.affectedRows === 0) {
      return new Response(
        JSON.stringify({
          message:
            'No se encontró un producto con el id proporcionado o el producto no pertenece a este usuario',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ message: 'Producto eliminado de favoritos con éxito' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error al eliminar el producto de favoritos:', error)
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
