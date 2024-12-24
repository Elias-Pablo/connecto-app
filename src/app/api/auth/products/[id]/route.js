import connection from '@/lib/db'

export async function PUT(req, { params }) {
  try {
    const { id } = await params // Asegúrate de usar await aquí.
    const { name, description, price, stock } = await req.json()

    if (!id || !name || !description || !price || stock === undefined) {
      return new Response(
        JSON.stringify({ message: 'Todos los campos son obligatorios' }),
        {
          status: 400,
        }
      )
    }

    // Convertimos connection.query en una promesa
    const queryPromise = (query, values) =>
      new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
          if (error) {
            reject(error)
          } else {
            resolve(results)
          }
        })
      })

    try {
      await queryPromise(
        'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?',
        [name, description, price, stock, id]
      )

      return new Response(
        JSON.stringify({ message: 'Producto actualizado exitosamente' }),
        { status: 200 }
      )
    } catch (dbError) {
      console.error('Error al actualizar producto:', dbError)
      return new Response(
        JSON.stringify({
          message: 'Error al actualizar producto',
          error: dbError.message,
        }),
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    return new Response(
      JSON.stringify({
        message: 'Error en la solicitud',
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
