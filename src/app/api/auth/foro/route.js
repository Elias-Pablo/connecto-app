import jwt from 'jsonwebtoken'
import connection from '@/lib/db'

export async function POST(req) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]
    if (!token)
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
      })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id_perfil } = decoded // Usar id_perfil en lugar de id_usuario

    const { titulo, descripcion, id_foro, url_imagen } = await req.json()

    // Verificar campos obligatorios
    if (!titulo || !descripcion || !id_foro) {
      return new Response(
        JSON.stringify({ message: 'Todos los campos son obligatorios' }),
        { status: 400 }
      )
    }

    let idImagen = null

    // Insertar la URL de la imagen si está presente
    if (url_imagen) {
      idImagen = await new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO imagen_publicacion (url_imagen, tiempo_creacion) VALUES (?, NOW())`,
          [url_imagen],
          (error, results) => {
            if (error) reject(error)
            resolve(results.insertId)
          }
        )
      })
    }

    // Insertar la publicación usando el id de la imagen si existe
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO publicaciones_foro (titulo, descripcion, id_foro, id_perfil, id_imagen, tiempo_creacion) VALUES (?, ?, ?, ?, ?, NOW())`,
        [titulo, descripcion, id_foro, id_perfil, idImagen],
        (error, results) => {
          if (error) {
            console.error('Error al insertar publicación:', error)
            reject(
              new Response(
                JSON.stringify({ message: 'Error al insertar publicación' }),
                { status: 500 }
              )
            )
          } else {
            resolve(
              new Response(
                JSON.stringify({
                  message: 'Publicación creada exitosamente',
                  id: results.insertId,
                }),
                { status: 201 }
              )
            )
          }
        }
      )
    })
  } catch (error) {
    console.error('Error en el servidor:', error)
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor' }),
      { status: 500 }
    )
  }
}

export async function GET(req) {
  const url = new URL(req.url)
  const type = url.searchParams.get('type')
  const categoria = url.searchParams.get('categoria') || null

  if (type === 'categorias') {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id_foro, nombre FROM foro', (error, results) => {
        if (error) {
          console.error('Error al obtener categorías:', error)
          reject(
            new Response(
              JSON.stringify({ message: 'Error al obtener categorías' }),
              { status: 500 }
            )
          )
        } else {
          resolve(new Response(JSON.stringify(results), { status: 200 }))
        }
      })
    })
  }

  if (type === 'publicaciones') {
    const page = parseInt(url.searchParams.get('page')) || 1
    const limit = 12
    const offset = (page - 1) * limit

    const query = `
      SELECT pf.id_publicaciones, pf.titulo, pf.descripcion, pf.id_foro, pf.id_perfil,
             pf.tiempo_creacion, ip.url_imagen, pn.nombre_negocio,
             (SELECT COUNT(*) FROM respuestas_foro WHERE id_publicaciones = pf.id_publicaciones) AS total_respuestas,
             (SELECT COUNT(*) FROM reacciones_foro WHERE id_publicaciones = pf.id_publicaciones AND tipo = 'me gusta') AS meGusta,
             (SELECT COUNT(*) FROM reacciones_foro WHERE id_publicaciones = pf.id_publicaciones AND tipo = 'útil') AS util
      FROM publicaciones_foro pf
      LEFT JOIN imagen_publicacion ip ON pf.id_imagen = ip.id_imagen
      LEFT JOIN perfil_negocio pn ON pf.id_perfil = pn.id_perfil
      WHERE (? IS NULL OR pf.id_foro = ?)
      ORDER BY pf.tiempo_creacion DESC
      LIMIT ? OFFSET ?
    `

    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [categoria, categoria, limit, offset],
        (error, results) => {
          if (error) {
            console.error('Error al obtener publicaciones:', error)
            reject(
              new Response(
                JSON.stringify({ message: 'Error al obtener publicaciones' }),
                { status: 500 }
              )
            )
          } else {
            resolve(
              new Response(JSON.stringify({ publicaciones: results }), {
                status: 200,
              })
            )
          }
        }
      )
    })
  }

  return new Response(
    JSON.stringify({ message: 'Tipo de solicitud inválido' }),
    { status: 400 }
  )
}
