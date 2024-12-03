import jwt from "jsonwebtoken";
import connection from "@/lib/db";

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "No autorizado" }), { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id_usuario } = decoded;

    const { titulo, descripcion, id_foro, url_imagen } = await req.json();

    if (!titulo || !descripcion || !id_foro || !url_imagen) {
      return new Response(
        JSON.stringify({ message: "Todos los campos son obligatorios" }),
        { status: 400 }
      );
    }

    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO imagen_publicacion (url_imagen) VALUES (?)",
        [url_imagen],
        (error, results) => {
          if (error) {
            console.error("Error al insertar la imagen:", error);
            reject(new Response(JSON.stringify({ message: "Error al insertar la imagen" }), { status: 500 }));
            return;
          }

          const id_imagen = results.insertId;

          connection.query(
            "INSERT INTO publicaciones_foro (titulo, descripcion, id_foro, id_usuario, id_imagen, tiempo_creacion) VALUES (?, ?, ?, ?, ?, NOW())",
            [titulo, descripcion, id_foro, id_usuario, id_imagen],
            (error, results) => {
              if (error) {
                console.error("Error al crear la publicación:", error);
                reject(new Response(JSON.stringify({ message: "Error al crear la publicación" }), { status: 500 }));
              } else {
                resolve(new Response(JSON.stringify({ message: "Publicación creada exitosamente", id: results.insertId }), { status: 201 }));
              }
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(JSON.stringify({ message: "Error al procesar la solicitud" }), { status: 500 });
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const page = parseInt(url.searchParams.get("page")) || 1; // Página actual
  const limit = 10; // Publicaciones por página
  const offset = (page - 1) * limit;

  if (type === "categorias") {
    // Manejo de categorías
    return new Promise((resolve, reject) => {
      connection.query("SELECT id_foro, nombre FROM foro", (error, results) => {
        if (error) {
          console.error("Error al obtener categorías:", error);
          reject(new Response(JSON.stringify({ message: "Error al obtener categorías" }), { status: 500 }));
        } else {
          resolve(new Response(JSON.stringify(results), { status: 200 }));
        }
      });
    });
  } else if (type === "publicaciones") {
    // Manejo de publicaciones
    return new Promise((resolve, reject) => {
      // Contar el total de publicaciones
      connection.query("SELECT COUNT(*) AS total FROM publicaciones_foro", (countError, countResults) => {
        if (countError) {
          console.error("Error al contar las publicaciones:", countError);
          reject(new Response(JSON.stringify({ message: "Error al contar las publicaciones" }), { status: 500 }));
          return;
        }

        const totalPublicaciones = countResults[0].total;
        const totalPaginas = Math.ceil(totalPublicaciones / limit);

        // Obtener las publicaciones con límite y desplazamiento
        connection.query(
          `SELECT pf.id_publicaciones, pf.titulo, pf.descripcion, pf.id_foro, pf.id_usuario, u.nombre_usuario, 
            pf.tiempo_creacion, ip.url_imagen, 
            (SELECT COUNT(*) FROM respuestas_foro WHERE id_publicaciones = pf.id_publicaciones) AS total_respuestas
            FROM publicaciones_foro pf
            LEFT JOIN imagen_publicacion ip ON pf.id_imagen = ip.id_imagen
            LEFT JOIN usuarios u ON pf.id_usuario = u.id_usuario
            ORDER BY pf.tiempo_creacion DESC
            LIMIT ? OFFSET ?;
          `,
          [limit, offset],
          (error, results) => {
            if (error) {
              console.error("Error al obtener publicaciones:", error);
              reject(new Response(JSON.stringify({ message: "Error al obtener publicaciones" }), { status: 500 }));
            } else {
              resolve(
                new Response(
                  JSON.stringify({
                    publicaciones: results,
                    totalPaginas,
                  }),
                  { status: 200 }
                )
              );
            }
          }
        );
      });
    });
  }

  return new Response(
    JSON.stringify({ message: "Tipo de solicitud inválido" }),
    { status: 400 }
  );
}
