import connection from '@/lib/db'

export async function GET() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM perfil_negocio', (error, results) => {
      if (error) {
        console.error('Error al cargar perfil:', error)
        reject(
          new Response(
            JSON.stringify({
              message: 'Error al cargar perfil',
            }),
            { status: 500 }
          )
        )
      } else {
        const perfiles = results.map((perfil) => ({
          id: perfil.id_perfil,
          idUsuario: perfil.id_usuario,
          idImagen: perfil.id_imagen,
          nombreNegocio: perfil.nombre_negocio,
          descripcion: perfil.descripcion,
          direccion: perfil.direccion,
          telefono: perfil.telefono,
          sitioWeb: perfil.sitioweb,
          tipoPerfil: perfil.tipo_perfil,
          idMetricas: perfil.id_metricas,
          idForo: perfil.id_foro,
          tiempoCreacion: perfil.tiempo_creacion,
        }))

        resolve(
          new Response(JSON.stringify({ perfiles }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          })
        )
      }
    })
  })
}
