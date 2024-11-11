import connection from "@/lib/db";

// Eliminar un producto de favoritos (DELETE)
export async function DELETE(req, { params }) {
  const { id_favorito } = params;

  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM favoritos WHERE id_favorito = ?',
      [id_favorito],
      (error, results) => {
        if (error) {
          console.error("Error al eliminar el producto de favoritos:", error);
          reject(new Response(JSON.stringify({ message: "Error al eliminar el producto de favoritos" }), { status: 500 }));
        } else {
          resolve(new Response(JSON.stringify({ message: "Producto eliminado de favoritos" }), { status: 200 }));
        }
      }
    );
  });
}
