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

    const query = `
      SELECT f.id_favorito, p.id_producto, p.nombre, p.precio, i.url_imagen AS image 
      FROM favoritos f
      INNER JOIN productos p ON f.id_producto = p.id_producto
      LEFT JOIN imagen_publicacion i ON p.id_imagen = i.id_imagen
      WHERE f.id_usuario = ?
    `;

    const [results] = await connection.promise().query(query, [userId]);

    return new Response(JSON.stringify({ favorites: results }), {
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
