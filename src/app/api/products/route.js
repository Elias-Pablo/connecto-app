// src/app/api/products/route.js
import connection from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("query") || "";

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock, i.url_imagen
       FROM productos p
       LEFT JOIN imagen_publicacion i ON p.id_imagen = i.id_imagen
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
            name: product.nombre,
            description: product.descripcion,
            price: product.precio,
            stock: product.stock,
            image: product.url_imagen,
          }));
          resolve(new Response(JSON.stringify({ products }), { status: 200 }));
        }
      }
    );
  });
}
