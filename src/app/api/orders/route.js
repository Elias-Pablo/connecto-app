import connection from '@/lib/db'
import jwt from 'jsonwebtoken'
export const dynamic = 'force-dynamic'

export async function GET(req) {
  const token = req.cookies.get('token')?.value
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const userId = decoded.userId

  try {
    // Recuperar los pedidos del usuario
    const orders = await new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM compra WHERE id_usuario = ?',
        [userId],
        (error, results) => {
          if (error) return reject(error)
          resolve(results)
        }
      )
    })

    // Recuperar los detalles de cada pedido
    const orderItems = await Promise.all(
      orders.map(async (order) => {
        const items = await new Promise((resolve, reject) => {
          connection.query(
            'SELECT * FROM detalle_compra WHERE id_compra = ?',
            [order.id_compra],
            (error, results) => {
              if (error) return reject(error)
              resolve(results)
            }
          )
        })
        return { ...order, items }
      })
    )

    return new Response(JSON.stringify({ orders: orderItems }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error al recuperar pedidos:', error)
    return new Response(
      JSON.stringify({ message: 'Error al recuperar pedidos' }),
      {
        status: 500,
      }
    )
  }
}
