import connection from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    // Obtener el ID del producto desde los parámetros de la URL
    const productId = params.id;

    if (!productId) {
      return new Response(
        JSON.stringify({ message: "ID del producto es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Consulta para obtener los detalles del producto, incluyendo todos los campos y las imágenes
    const [results] = await connection.promise().query(
      `SELECT 
        p.id_producto, 
        p.nombre AS product_name, 
        p.descripcion, 
        p.precio, 
        p.stock, 
        pi.url_imagen, 
        pn.id_perfil, 
        pn.nombre_negocio AS business_name,
        pn.descripcion AS business_description,
        pn.direccion AS business_address,
        pn.telefono AS business_phone,
        pn.sitioweb_url AS business_website
       FROM productos p
       LEFT JOIN producto_imagenes pi ON p.id_producto = pi.id_producto
       LEFT JOIN perfil_negocio pn ON p.id_perfil = pn.id_perfil
       WHERE p.id_producto = ?`,
      [productId]
    );

    // Verificar si el producto existe
    if (results.length === 0) {
      return new Response(
        JSON.stringify({ message: "Producto no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Agrupar los datos del producto, consolidando las imágenes en un array
    const productMap = {};
    results.forEach((product) => {
      if (!productMap[product.id_producto]) {
        // Si el producto no está en el mapa, añadirlo
        productMap[product.id_producto] = {
          id: product.id_producto,
          name: product.product_name,
          description: product.descripcion,
          price: product.precio,
          stock: product.stock,
          images: product.url_imagen ? [product.url_imagen] : [], // Inicializar el array de imágenes
          business: {
            id_perfil: product.id_perfil,
            name: product.business_name,
            description: product.business_description,
            address: product.business_address,
            phone: product.business_phone,
            website: product.business_website,
          },
        };
      } else {
        // Si el producto ya está en el mapa, agregar la imagen al array
        if (product.url_imagen) {
          productMap[product.id_producto].images.push(product.url_imagen);
        }
      }
    });

    // Extraer el producto del mapa (solo habrá uno en este caso)
    const productDetails = Object.values(productMap)[0];

    // Respuesta exitosa
    return new Response(JSON.stringify({ product: productDetails }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al cargar el producto:", error);
    return new Response(
      JSON.stringify({ message: "Error al cargar el producto" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
