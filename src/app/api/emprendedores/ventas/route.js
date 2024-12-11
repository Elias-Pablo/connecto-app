import connection from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id_perfil = url.searchParams.get("id_perfil");

    if (!id_perfil) {
      return new Response(JSON.stringify({ message: "Falta el id_perfil" }), {
        status: 400,
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ message: "Falta el token de autenticación" }),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.id_perfil !== parseInt(id_perfil)) {
      return new Response(
        JSON.stringify({ message: "Token no válido para este perfil" }),
        { status: 403 }
      );
    }

    // Consulta SQL para obtener ventas
    const ventasQuery = `SELECT
        DATE(i.fecha_interaccion) AS fecha,
        p.nombre AS producto,
        i.cantidad,
        (i.cantidad * p.precio) AS total
      FROM interacciones i
      JOIN productos p ON i.id_producto = p.id_producto
      WHERE i.id_perfil = ? AND i.tipo_interaccion = 'Purchase'
      ORDER BY i.fecha_interaccion DESC`
    ;

    const ventas = await new Promise((resolve, reject) => {
      connection.query(ventasQuery, [id_perfil], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    return new Response(JSON.stringify({ ventas }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en la API de ventas:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener las ventas" }),
      { status: 500 }
    );
  }
}