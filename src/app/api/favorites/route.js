import connection from "@/lib/db";
export const dynamic = "force-dynamic";

// Obtener los favoritos del usuario (GET)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Consulta a la base de datos para obtener los favoritos, incluidas todas las imágenes del producto
    const query = `
      SELECT 
        f.id_favorito, 
        p.id_producto, 
        p.nombre, 
        p.precio,
        pi.url_imagen,
        pn.id_perfil, 
        pn.nombre_negocio AS business_name
      FROM favoritos f
      INNER JOIN productos p ON f.id_producto = p.id_producto
      LEFT JOIN producto_imagenes pi ON p.id_producto = pi.id_producto
      LEFT JOIN perfil_negocio pn ON p.id_perfil = pn.id_perfil
      WHERE f.id_usuario = ?
    `;

    const [results] = await connection.promise().query(query, [userId]);

    // Agrupar los productos por su ID y consolidar las imágenes en un array
    const favoriteMap = {};
    results.forEach((favorite) => {
      if (!favoriteMap[favorite.id_producto]) {
        // Si el producto no está en el mapa, añadirlo
        favoriteMap[favorite.id_producto] = {
          id: favorite.id_producto,
          name: favorite.nombre,
          price: favorite.precio,
          images: favorite.url_imagen ? [favorite.url_imagen] : [], // Inicializar el array de imágenes
          businessName: favorite.business_name,
          id_perfil: favorite.id_perfil,
          id_favorito: favorite.id_favorito,
        };
      } else {
        // Si el producto ya está en el mapa, agregar la imagen a su array
        if (favorite.url_imagen) {
          favoriteMap[favorite.id_producto].images.push(favorite.url_imagen);
        }
      }
    });

    // Convertir el mapa a un array
    const favorites = Object.values(favoriteMap);

    return new Response(JSON.stringify({ favorites: favorites }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener favoritos" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Agregar un producto a favoritos (POST)
export async function POST(req) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return new Response(
        JSON.stringify({ message: "User ID and Product ID are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const query =
      "INSERT INTO favoritos (id_usuario, id_producto, fecha_creacion) VALUES (?, ?, NOW())";

    const [results] = await connection
      .promise()
      .query(query, [userId, productId]);

    return new Response(
      JSON.stringify({
        message: "Producto agregado a favoritos",
        id: results.insertId,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al agregar producto a favoritos:", error);
    return new Response(
      JSON.stringify({ message: "Error al agregar producto a favoritos" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
