import connection from '@/lib/db'
import jwt from 'jsonwebtoken'
export const dynamic = 'force-dynamic'

// Obtener datos de usuario
export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return new Response(JSON.stringify({ message: 'Token no encontrado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const [user] = await connection
      .promise()
      .query(
        'SELECT nombre_usuario AS name, usuario_imagen AS profilePicture, email AS email FROM usuarios WHERE id_usuario = ?',
        [userId]
      )

    if (!user || user.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Usuario no encontrado' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(JSON.stringify(user[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
    return new Response(
      JSON.stringify({ message: 'Error al obtener los datos del usuario' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// Actualizar datos de usuario
export async function PUT(req) {
  try {
    const { name, email, profilePicture } = await req.json()

    if (!name || !email || !profilePicture) {
      return new Response(
        JSON.stringify({
          message:
            'Todos los campos (name, email, profilePicture) son requeridos',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const token = req.cookies.get('token')?.value

    if (!token) {
      return new Response(JSON.stringify({ message: 'Token no encontrado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const [result] = await connection
      .promise()
      .query(
        'UPDATE usuarios SET nombre_usuario = ?, email = ?, usuario_imagen = ? WHERE id_usuario = ?',
        [name, email, profilePicture, userId]
      )

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ message: 'Usuario no encontrado o sin cambios' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(
      JSON.stringify({ message: 'Datos actualizados exitosamente' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error)
    return new Response(
      JSON.stringify({ message: 'Error al actualizar los datos' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
