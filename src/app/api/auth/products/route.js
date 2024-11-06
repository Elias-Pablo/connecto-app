import connection from "@/lib/db";
import jwt from "jsonwebtoken";

// Función auxiliar para obtener el id_perfil basado en el userId
async function getPerfilId(userId) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT id_perfil FROM perfil_negocio WHERE id_usuario = ?",
      [userId],
      (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return reject("Perfil no encontrado");
        resolve(results[0].id_perfil);
      }
    );
  });
}

// Inserción de productos
export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const id_perfil = await getPerfilId(userId); // Obtener id_perfil basado en el userId

    const { name, description, price, stock, url_imagen } = await req.json();
    if (!name || !description || !price || stock === undefined) {
      return new Response(
        JSON.stringify({ message: "Todos los campos son obligatorios" }),
        { status: 400 }
      );
    }

    return new Promise((resolve, reject) => {
      // Insertar la URL de la imagen en la tabla imagen_publicacion y obtener id_imagen
      connection.query(
        "INSERT INTO imagen_publicacion (url_imagen) VALUES (?)",
        [url_imagen],
        (error, results) => {
          if (error) {
            console.error("Error al insertar imagen:", error);
            return reject(
              new Response(
                JSON.stringify({
                  message: "Error al insertar imagen",
                  error: error.message,
                }),
                { status: 500 }
              )
            );
          }

          const id_imagen = results.insertId;

          // Insertar el producto en la tabla productos usando el id_imagen y id_perfil
          connection.query(
            "INSERT INTO productos (id_perfil, nombre, descripcion, precio, stock, tiempo_creacion, id_imagen) VALUES (?, ?, ?, ?, ?, NOW(), ?)",
            [id_perfil, name, description, price, stock, id_imagen],
            (error, results) => {
              if (error) {
                console.error("Error al insertar el producto:", error);
                reject(
                  new Response(
                    JSON.stringify({
                      message: "Error al insertar el producto",
                      error: error.message,
                    }),
                    { status: 500 }
                  )
                );
              } else {
                resolve(
                  new Response(
                    JSON.stringify({
                      message: "Producto agregado exitosamente",
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
    console.error("Error al insertar el producto:", error);
    return new Response(
      JSON.stringify({
        message: "Error al insertar el producto",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// Obtener productos filtrados por usuario autenticado
export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const perfilId = await getPerfilId(userId);

    const products = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock, i.url_imagen
         FROM productos p
         LEFT JOIN imagen_publicacion i ON p.id_imagen = i.id_imagen
         WHERE p.id_perfil = ?`,
        [perfilId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });

    const formattedProducts = products.map((product) => ({
      id: product.id_producto,
      name: product.nombre,
      description: product.descripcion,
      price: product.precio,
      stock: product.stock,
      image: product.url_imagen,
    }));

    return new Response(JSON.stringify({ products: formattedProducts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return new Response(
      JSON.stringify({
        message: "Error al cargar productos",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// Eliminar productos
export async function DELETE(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ message: "Token no encontrado" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const perfilId = await getPerfilId(userId); // Obtener id_perfil basado en el userId

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(
        JSON.stringify({ message: "ID del producto es requerido" }),
        { status: 400 }
      );
    }

    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM productos WHERE id_producto = ? AND id_perfil = ?",
        [id, perfilId], // Verificar que el producto pertenece al perfil
        (error, results) => {
          if (error) {
            console.error("Error al eliminar producto:", error);
            reject(
              new Response(
                JSON.stringify({ message: "Error al eliminar producto" }),
                { status: 500 }
              )
            );
          } else {
            resolve(
              new Response(
                JSON.stringify({
                  message: "Producto eliminado exitosamente",
                }),
                { status: 200 }
              )
            );
          }
        }
      );
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return new Response(
      JSON.stringify({
        message: "Error al eliminar el producto",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
