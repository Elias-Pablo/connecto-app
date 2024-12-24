import connection from '@/lib/db'
import jwt from 'jsonwebtoken'
export const dynamic = 'force-dynamic'

// Función auxiliar para obtener el id_perfil basado en el userId
async function getPerfilId(userId) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT id_perfil FROM perfil_negocio WHERE id_usuario = ?',
      [userId],
      (err, results) => {
        if (err) return reject(err)
        if (results.length === 0) return reject('Perfil no encontrado')
        resolve(results[0].id_perfil)
      }
    )
  })
}

// Obtener productos filtrados por usuario autenticado
export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return new Response(JSON.stringify({ message: 'Token no encontrado' }), {
        status: 401,
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const perfilId = await getPerfilId(userId)

    const products = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock, i.url_imagen
         FROM productos p
         LEFT JOIN producto_imagenes i ON p.id_producto = i.id_producto
         WHERE p.id_perfil = ?`,
        [perfilId],
        (err, results) => {
          if (err) return reject(err)
          resolve(results)
        }
      )
    })

    const formattedProducts = products.map((product) => ({
      id: product.id_producto,
      name: product.nombre,
      description: product.descripcion,
      price: product.precio,
      stock: product.stock,
      image: product.url_imagen,
    }))

    return new Response(JSON.stringify({ products: formattedProducts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error al cargar productos:', error)
    return new Response(
      JSON.stringify({
        message: 'Error al cargar productos',
        error: error.message,
      }),
      { status: 500 }
    )
  }
}

// Inserción de productos
export async function POST(req) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return new Response(JSON.stringify({ message: 'Token no encontrado' }), {
        status: 401,
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const id_perfil = await getPerfilId(userId) // Obtener id_perfil basado en el userId

    const { name, description, price, stock, images } = await req.json() // Aquí obtenemos las imágenes como un array
    if (!name || !description || !price || stock === undefined) {
      return new Response(
        JSON.stringify({ message: 'Todos los campos son obligatorios' }),
        { status: 400 }
      )
    }

    return new Promise((resolve, reject) => {
      // Insertar el producto en la tabla productos
      connection.query(
        'INSERT INTO productos (id_perfil, nombre, descripcion, precio, stock, tiempo_creacion) VALUES (?, ?, ?, ?, ?, NOW())',
        [id_perfil, name, description, price, stock],
        (error, results) => {
          if (error) {
            console.error('Error al insertar el producto:', error)
            return reject(
              new Response(
                JSON.stringify({
                  message: 'Error al insertar el producto',
                  error: error.message,
                }),
                { status: 500 }
              )
            )
          }

          const id_producto = results.insertId

          // Insertar múltiples imágenes asociadas al producto en la tabla producto_imagenes
          if (images && images.length > 0) {
            const imageQueries = images.map((url) => {
              return new Promise((imgResolve, imgReject) => {
                connection.query(
                  'INSERT INTO producto_imagenes (id_producto, url_imagen) VALUES (?, ?)',
                  [id_producto, url],
                  (err) => {
                    if (err) {
                      console.error('Error al insertar la imagen:', err)
                      imgReject(err)
                    } else {
                      imgResolve()
                    }
                  }
                )
              })
            })

            Promise.all(imageQueries)
              .then(() => {
                resolve(
                  new Response(
                    JSON.stringify({
                      message: 'Producto agregado exitosamente',
                      id: id_producto,
                    }),
                    { status: 201 }
                  )
                )
              })
              .catch((error) => {
                reject(
                  new Response(
                    JSON.stringify({
                      message: 'Error al insertar las imágenes',
                      error: error.message,
                    }),
                    { status: 500 }
                  )
                )
              })
          } else {
            resolve(
              new Response(
                JSON.stringify({
                  message: 'Producto agregado sin imágenes',
                  id: id_producto,
                }),
                { status: 201 }
              )
            )
          }
        }
      )
    })
  } catch (error) {
    console.error('Error al insertar el producto:', error)
    return new Response(
      JSON.stringify({
        message: 'Error al insertar el producto',
        error: error.message,
      }),
      { status: 500 }
    )
  }
}

// Eliminar productos
export async function DELETE(req) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return new Response(JSON.stringify({ message: 'Token no encontrado' }), {
        status: 401,
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const perfilId = await getPerfilId(userId) // Obtener id_perfil basado en el userId

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return new Response(
        JSON.stringify({ message: 'ID del producto es requerido' }),
        { status: 400 }
      )
    }

    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM productos WHERE id_producto = ? AND id_perfil = ?',
        [id, perfilId], // Verificar que el producto pertenece al perfil
        (error) => {
          if (error) {
            console.error('Error al eliminar producto:', error)
            reject(
              new Response(
                JSON.stringify({ message: 'Error al eliminar producto' }),
                { status: 500 }
              )
            )
          } else {
            resolve(
              new Response(
                JSON.stringify({
                  message: 'Producto eliminado exitosamente',
                }),
                { status: 200 }
              )
            )
          }
        }
      )
    })
  } catch (error) {
    console.error('Error al eliminar el producto:', error)
    return new Response(
      JSON.stringify({
        message: 'Error al eliminar el producto',
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
