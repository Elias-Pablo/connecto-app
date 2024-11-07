import connection from '@/lib/db';

// Actualizar una publicación en el foro (PUT)
export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const { titulo, descripcion, id_foro } = await req.json();

    if (!titulo || !descripcion || !id_foro) {
      return new Response(JSON.stringify({ message: 'Todos los campos son obligatorios' }), {
        status: 400,
      });
    }

    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE publicaciones_foro SET titulo = ?, descripcion = ?, id_foro = ? WHERE id_publicaciones = ?',
        [titulo, descripcion, id_foro, id],
        (error) => {
          if (error) {
            console.error('Error al actualizar la publicación en el foro:', error);
            reject(new Response(JSON.stringify({ message: 'Error al actualizar la publicación' }), { status: 500 }));
          } else {
            resolve(new Response(JSON.stringify({ message: 'Publicación actualizada exitosamente' }), { status: 200 }));
          }
        }
      );
    });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return new Response(JSON.stringify({ message: 'Error al procesar la solicitud' }), { status: 500 });
  }
}

// Eliminar una publicación en el foro (DELETE)
export async function DELETE(req, { params }) {
  const { id } = params;
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM publicaciones_foro WHERE id_publicaciones = ?',
      [id],
      (error) => {
        if (error) {
          console.error('Error al eliminar la publicación en el foro:', error);
          reject(new Response(JSON.stringify({ message: 'Error al eliminar la publicación' }), { status: 500 }));
        } else {
          resolve(new Response(JSON.stringify({ message: 'Publicación eliminada exitosamente' }), { status: 200 }));
        }
      }
    );
  });
}
