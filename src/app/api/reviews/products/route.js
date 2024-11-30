import connection from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id_producto = url.searchParams.get("id_producto");

    if (!id_producto) {
      return new Response(
        JSON.stringify({ message: "ID de producto es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const query = `
        SELECT r.id_review, r.comentario, r.calificacion, u.username, r.fecha_creacion
        FROM product_reviews r
        INNER JOIN usuarios u ON r.id_usuario = u.id_usuario
        WHERE r.id_producto = ?
      `;

    const [results] = await connection.promise().query(query, [id_producto]);

    return new Response(JSON.stringify({ reviews: results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener reseñas" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { id_producto, comentario, calificacion } = await req.json();

    if (!id_producto || !calificacion) {
      return new Response(
        JSON.stringify({
          message: "ID de producto y calificación son requeridos",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const query = `
      INSERT INTO product_reviews (id_usuario, id_producto, comentario, calificacion)
      VALUES (?, ?, ?, ?)
    `;

    await connection
      .promise()
      .query(query, [userId, id_producto, comentario, calificacion]);

    return new Response(
      JSON.stringify({ message: "Reseña creada exitosamente" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al crear reseña:", error);
    return new Response(JSON.stringify({ message: "Error al crear reseña" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
