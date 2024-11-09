import connection from "@/lib/db";

// Crear una nueva publicación en el foro (POST)
export async function POST(req) {
  try {
    const { titulo, descripcion, id_foro, id_usuario, url_imagen } =
      await req.json();

    if (!titulo || !descripcion || !id_foro || !id_usuario || !url_imagen) {
      return new Response(
        JSON.stringify({ message: "Todos los campos son obligatorios" }),
        {
          status: 400,
        }
      );
    }

    return new Promise((resolve, reject) => {
      // Insertar la URL de la imagen en la tabla imagen_publicacion
      connection.query(
        "INSERT INTO imagen_publicacion (url_imagen) VALUES (?)",
        [url_imagen],
        (error, results) => {
          if (error) {
            console.error("Error al insertar la imagen:", error);
            reject(
              new Response(
                JSON.stringify({ message: "Error al insertar la imagen" }),
                { status: 500 }
              )
            );
            return;
          }

          const id_imagen = results.insertId;

          // Insertar la publicación en la tabla publicaciones_foro utilizando el id_imagen
          connection.query(
            "INSERT INTO publicaciones_foro (titulo, descripcion, id_foro, id_usuario, id_imagen, tiempo_creacion) VALUES (?, ?, ?, ?, ?, NOW())",
            [titulo, descripcion, id_foro, id_usuario, id_imagen],
            (error, results) => {
              if (error) {
                console.error(
                  "Error al crear la publicación en el foro:",
                  error
                );
                reject(
                  new Response(
                    JSON.stringify({
                      message: "Error al crear la publicación",
                    }),
                    { status: 500 }
                  )
                );
              } else {
                resolve(
                  new Response(
                    JSON.stringify({
                      message: "Publicación creada exitosamente",
                      id: results.insertId,
                    }),
                    { status: 201 }
                  )
                );
              }
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ message: "Error al procesar la solicitud" }),
      { status: 500 }
    );
  }
}

// Obtener todas las categorías desde la tabla `foro`
// Obtener todas las categorías desde la tabla `foro` o publicaciones con imágenes
export async function GET(req) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  return new Promise((resolve, reject) => {
    if (type === "categorias") {
      connection.query("SELECT * FROM foro", (error, results) => {
        if (error) {
          console.error("Error al obtener categorías:", error);
          reject(
            new Response(
              JSON.stringify({ message: "Error al obtener categorías" }),
              { status: 500 }
            )
          );
        } else {
          resolve(new Response(JSON.stringify(results), { status: 200 }));
        }
      });
    } else if (type === "publicaciones") {
      // Realizar un JOIN para obtener la url_imagen
      connection.query(
        `SELECT pf.id_publicaciones, pf.titulo, pf.descripcion, pf.id_foro, pf.id_usuario, pf.tiempo_creacion, ip.url_imagen 
         FROM publicaciones_foro pf
         LEFT JOIN imagen_publicacion ip ON pf.id_imagen = ip.id_imagen`,
        (error, results) => {
          if (error) {
            console.error("Error al obtener publicaciones del foro:", error);
            reject(
              new Response(
                JSON.stringify({ message: "Error al obtener publicaciones" }),
                { status: 500 }
              )
            );
          } else {
            resolve(new Response(JSON.stringify(results), { status: 200 }));
          }
        }
      );
    } else {
      reject(
        new Response(
          JSON.stringify({ message: "Tipo de solicitud inválido" }),
          { status: 400 }
        )
      );
    }
  });
}
