import connection from '@/lib/db';

export async function PUT(req, { params }) {
  try {
    const { id } = params; // Captura el ID de la URL
    const { name, description, price, stock, id_imagen } = await req.json();

    if (!id || !name || !description || !price || stock === undefined) {
      return new Response(JSON.stringify({ message: 'Todos los campos son obligatorios' }), {
        status: 400,
      });
    }

    connection.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_imagen = ? WHERE id_producto = ?',
      [name, description, price, stock, id_imagen, id],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar producto:', error);
          return new Response(JSON.stringify({ message: 'Error al actualizar producto', error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ message: 'Producto actualizado exitosamente' }), { status: 200 });
      }
    );
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return new Response(
      JSON.stringify({ message: 'Error en la solicitud', error: error.message }),
      { status: 500 }
    );
  }
}
