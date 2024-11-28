// src/app/api/products/route.js
import connection from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // Obtener el término de búsqueda de los parámetros de consulta
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("query") || "";

    // Consulta a la base de datos
    const [results] = await connection.promise().query(
      `SELECT 
        p.id_producto, 
        p.nombre AS product_name, 
        p.descripcion, 
        p.precio, 
        p.stock, 
        i.url_imagen, 
        pn.id_perfil, 
        pn.nombre_negocio AS business_name
       FROM productos p
       LEFT JOIN imagen_publicacion i ON p.id_imagen = i.id_imagen
       LEFT JOIN perfil_negocio pn ON p.id_perfil = pn.id_perfil
       WHERE p.nombre LIKE ? OR p.descripcion LIKE ?`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );

    // Formatear los resultados
    const products = results.map((product) => ({
      id: product.id_producto,
      name: product.product_name,
      description: product.descripcion,
      price: product.precio,
      stock: product.stock,
      image: product.url_imagen,
      businessName: product.business_name,
      id_perfil: product.id_perfil, // Incluye el ID del perfil
    }));

    // Respuesta exitosa
    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return new Response(
      JSON.stringify({ message: "Error al cargar productos" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
