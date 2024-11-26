// src/app/api/products/route.js
import connection from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("query") || "";

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT p.id_producto, p.nombre AS product_name, p.descripcion, p.precio, p.stock, i.url_imagen, pn.id_perfil, pn.nombre_negocio AS business_name
       FROM productos p
       LEFT JOIN imagen_publicacion i ON p.id_imagen = i.id_imagen
       LEFT JOIN perfil_negocio pn ON p.id_perfil = pn.id_perfil
       WHERE p.nombre LIKE ? OR p.descripcion LIKE ?`,
      [`%${searchTerm}%`, `%${searchTerm}%`],
      (error, results) => {
        if (error) {
          console.error("Error al cargar productos:", error);
          reject(
            new Response(
              JSON.stringify({
                message: "Error al cargar productos",
              }),
              { status: 500 }
            )
          );
        } else {
          const products = results.map((product) => ({
            id: product.id_producto,
            name: product.product_name,
            description: product.descripcion,
            price: product.precio,
            stock: product.stock,
            image: product.url_imagen,
            businessName: product.business_name,
            id_perfil: product.id_perfil, // Se incluye el id_perfil en la respuesta
          }));
          resolve(new Response(JSON.stringify({ products }), { status: 200 }));
        }
      }
    );
  });
}
