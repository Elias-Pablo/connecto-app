import connection from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // Obtener el token JWT del header de autorización
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return new Response(JSON.stringify({ message: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = authHeader.split(" ")[1]; // Asume formato "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId; // Extraer el userId del token

    if (!userId) {
      return new Response(JSON.stringify({ message: "Usuario no válido" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Consulta para obtener los mensajes no leídos
    const [rows] = await connection.promise().query(
      `SELECT 
        c.id_conversacion, 
        c.nombre_conversacion, 
        c.id_usuario1, 
        c.id_usuario2, 
        CASE 
          WHEN c.id_usuario1 = ? THEN u2.nombre_usuario
          WHEN c.id_usuario2 = ? THEN u1.nombre_usuario
        END AS nombre_usuario, -- Devuelve el nombre del otro usuario en la conversación
        COUNT(m.id_mensaje) AS unread_count
      FROM 
        conversaciones c
      LEFT JOIN 
        mensajes m
      ON 
        c.id_conversacion = m.id_conversacion
        AND m.leido = 0
        AND m.id_destinatario = ?
      LEFT JOIN 
        usuarios u1
      ON 
        c.id_usuario1 = u1.id_usuario
      LEFT JOIN 
        usuarios u2
      ON 
        c.id_usuario2 = u2.id_usuario
      WHERE 
        c.id_usuario1 = ? OR c.id_usuario2 = ?
      GROUP BY 
        c.id_conversacion;`,
      [userId, userId, userId, userId, userId]
    );

    const totalUnread = rows.reduce((sum, chat) => sum + chat.unread_count, 0);

    return new Response(JSON.stringify({ chats: rows, totalUnread }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener mensajes no leídos:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
