// src/app/api/reviews/products/[id].js

import connection from '@/lib/db'

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
    // Obtener todas las reseñas del producto
    const reviews = await new Promise((resolve, reject) => {
      connection.query(
        'SELECT calificacion FROM product_reviews WHERE id_producto = ?',
        [productId],
        (error, results) => {
          if (error) {
            console.error('Error al obtener las reseñas:', error)
            return reject(error)
          }
          resolve(results)
        }
      )
    })

    // Calcular el promedio de las calificaciones
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.calificacion, 0) /
          reviews.length
        : 0

    return new Response(
      JSON.stringify({ averageRating: averageRating.toFixed(1) }), // redondeamos a 1 decimal
      { status: 200 }
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
