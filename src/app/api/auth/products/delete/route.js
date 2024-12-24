import connection from '@/lib/db'

export async function DELETE(req) {
  try {
    // Obtener el ID del producto a eliminar desde los parámetros de consulta
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    // Verificar si se proporciona un ID
    if (!id) {
      return new Response(
        JSON.stringify({ message: 'ID del producto es requerido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // 1. Eliminar las referencias del producto en la tabla `favoritos`
    await new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM favoritos WHERE id_producto = ?',
        [id],
        (error, results) => {
          if (error) {
            console.error('Error al eliminar el producto de favoritos:', error)
            return reject(
              new Response(
                JSON.stringify({
                  message: 'Error al eliminar el producto de favoritos',
                  error: error.message,
                }),
                { status: 500 }
              )
            )
          }
          resolve(results)
        }
      )
    })

    // 2. Eliminar las referencias del producto en la tabla `interacciones`
    await new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM interacciones WHERE id_producto = ?',
        [id],
        (error, results) => {
          if (error) {
            console.error(
              'Error al eliminar el producto de interacciones:',
              error
            )
            return reject(
              new Response(
                JSON.stringify({
                  message: 'Error al eliminar el producto de interacciones',
                  error: error.message,
                }),
                { status: 500 }
              )
            )
          }
          resolve(results)
        }
      )
    })

    // 3. Eliminar las imágenes asociadas al producto en la tabla `producto_imagenes`
    await new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM producto_imagenes WHERE id_producto = ?',
        [id],
        (error, results) => {
          if (error) {
            console.error('Error al eliminar imágenes del producto:', error)
            return reject(
              new Response(
                JSON.stringify({
                  message: 'Error al eliminar imágenes del producto',
                  error: error.message,
                }),
                { status: 500 }
              )
            )
          }
          resolve(results)
        }
      )
    })

    // 4. Eliminar el producto de la tabla `productos`
    await new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM productos WHERE id_producto = ?',
        [id],
        (error, results) => {
          if (error) {
            console.error('Error al eliminar el producto:', error)
            return reject(
              new Response(
                JSON.stringify({
                  message: 'Error al eliminar el producto',
                  error: error.message,
                }),
                { status: 500 }
              )
            )
          }
          resolve(results)
        }
      )
    })

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ message: 'Producto eliminado exitosamente' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
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
