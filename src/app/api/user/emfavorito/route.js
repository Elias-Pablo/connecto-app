import connection from "@/lib/db";
import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";

// Obtener los emprendedores favoritos del usuario
export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ error: true, message: "Token no encontrado" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (error) {
      return new Response(
        JSON.stringify({ error: true, message: "Token inválido" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const query = `
      SELECT f.id_favorito, pn.id_perfil, pn.nombre_negocio, pn.descripcion, pn.direccion, pn.telefono, pn.sitioweb_url
      FROM favemprendedor f
      INNER JOIN perfil_negocio pn ON f.id_negocio = pn.id_perfil
      WHERE f.id_usuario = ?
    `;

    const [results] = await connection.promise().query(query, [userId]);

    return new Response(JSON.stringify({ error: false, favorites: results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    return new Response(
      JSON.stringify({ error: true, message: "Error al obtener favoritos" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Agregar un emprendedor a favoritos
export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ error: true, message: "Token no encontrado" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (error) {
      return new Response(
        JSON.stringify({ error: true, message: "Token inválido" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { id_perfil } = await req.json();

    if (!id_perfil) {
      return new Response(
        JSON.stringify({
          error: true,
          message: "Business ID (id_perfil) es requerido",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verificar si ya existe en favoritos
    const checkQuery = `
      SELECT id_favorito FROM favemprendedor WHERE id_usuario = ? AND id_negocio = ?
    `;
    const [checkResults] = await connection
      .promise()
      .query(checkQuery, [userId, id_perfil]);

    if (checkResults.length > 0) {
      return new Response(
        JSON.stringify({ error: true, message: "Ya está en favoritos" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const query =
      "INSERT INTO favemprendedor (id_usuario, id_negocio, fecha_creacion) VALUES (?, ?, NOW())";

    const [results] = await connection
      .promise()
      .query(query, [userId, id_perfil]);

    return new Response(
      JSON.stringify({
        error: false,
        message: "Emprendedor agregado a favoritos",
        id: results.insertId,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al agregar emprendedor a favoritos:", error);
    return new Response(
      JSON.stringify({ error: true, message: "Error al agregar a favoritos" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Eliminar un emprendedor de favoritos
export async function DELETE(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ error: true, message: "Token no encontrado" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (error) {
      return new Response(
        JSON.stringify({ error: true, message: "Token inválido" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { searchParams } = new URL(req.url);
    const idFavorito = searchParams.get("id_favorito");

    if (!idFavorito) {
      return new Response(
        JSON.stringify({ error: true, message: "Favorite ID es requerido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const query =
      "DELETE FROM favemprendedor WHERE id_perfil = ? AND id_usuario = ?";

    const [results] = await connection
      .promise()
      .query(query, [idFavorito, userId]);

    if (results.affectedRows === 0) {
      return new Response(
        JSON.stringify({ error: true, message: "Favorito no encontrado" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: false,
        message: "Favorito eliminado exitosamente",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    return new Response(
      JSON.stringify({ error: true, message: "Error al eliminar favorito" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
