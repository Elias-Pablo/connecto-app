// src/app/api/reviews/product/[id].js
import connection from '@/lib/db'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

export async function GET(req, { params }) {
  const productId = params.id

  if (!productId) {
    return new Response(
      JSON.stringify({ message: 'ID del producto es requerido' }),
      { status: 400 }
    )
  }

  try {
    // Obtener las reseñas del producto
    const reviews = await new Promise((resolve, reject) => {
      connection.query(
        'SELECT r.comentario, r.calificacion, r.fecha_creacion, u.nombre_usuario FROM product_reviews r JOIN usuarios u ON r.id_usuario = u.id_usuario WHERE r.id_producto = ?',
        [productId],
        (error, results) => {
          if (error) {
            console.error('Error al obtener las reseñas:', error)
            return reject(
              new Response(
                JSON.stringify({
                  message: 'Error al obtener las reseñas',
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

    return new Response(JSON.stringify({ reviews }), { status: 200 })
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

export async function POST(req, { params }) {
  const token = req.cookies.get('token')?.value
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const userId = decoded.userId
  const { calificacion, comentario } = await req.json()
  const productId = params.id // El ID del producto

  if (!productId || !calificacion || !comentario) {
    return new Response(
      JSON.stringify({ message: 'Todos los campos son obligatorios' }),
      { status: 400 }
    )
  }

  try {
    // Insertar la reseña en la base de datos
    await new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO product_reviews (id_usuario, id_producto, comentario, calificacion) VALUES (?, ?, ?, ?)',
        [userId, productId, comentario, calificacion],
        (error, results) => {
          if (error) {
            console.error('Error al agregar reseña:', error)
            return reject(
              new Response(
                JSON.stringify({
                  message: 'Error al agregar reseña',
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

    return new Response(
      JSON.stringify({ message: 'Reseña agregada exitosamente' }),
      { status: 201 }
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
