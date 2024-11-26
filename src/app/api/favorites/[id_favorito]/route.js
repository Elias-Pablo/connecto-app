import connection from "@/lib/db";

export const dynamic = "force-dynamic";

// Eliminar un producto de favoritos (DELETE)
export async function DELETE(req, { params }) {
  try {
    // Obtener el `id_favorito` de los parámetros
    const { id_favorito } = params;

    if (!id_favorito) {
      return new Response(
        JSON.stringify({ message: "El parámetro id_favorito es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Ejecutar la consulta para eliminar el favorito
    const [results] = await connection
      .promise()
      .query("DELETE FROM favoritos WHERE id_favorito = ?", [id_favorito]);

    // Verificar si se eliminó algún registro
    if (results.affectedRows === 0) {
      return new Response(
        JSON.stringify({
          message: "No se encontró un producto con el id proporcionado",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Producto eliminado de favoritos con éxito" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al eliminar el producto de favoritos:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
