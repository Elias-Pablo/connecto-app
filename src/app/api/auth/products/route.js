import connection from "@/lib/db";
import jwt from "jsonwebtoken";

// Inserción de productos
export async function POST(req) {
  try {
    const { id_perfil, name, description, price, stock, id_imagen } =
      await req.json();

    if (!id_perfil || !name || !description || !price || stock === undefined) {
      return new Response(
        JSON.stringify({ message: "Todos los campos son obligatorios" }),
        {
          status: 400,
        }
      );
    }

    return new Promise((resolve, reject) => {
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

    // Consulta para obtener el id_perfil basado en el id_usuario
    const [profileResult] = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT id_perfil FROM perfil_negocio WHERE id_usuario = ?",
        [userId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });

    if (!profileResult) {
      return new Response(
        JSON.stringify({ message: "Perfil no encontrado para el usuario" }),
        { status: 404 }
      );
    }

    const perfilId = profileResult.id_perfil;

    // Consulta para obtener productos de este perfil
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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response(
      JSON.stringify({
        message: "ID del producto es requerido",
      }),
      { status: 400 }
    );
  }

  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM productos WHERE id_producto = ?",
      [id],
      (error, results) => {
        if (error) {
          console.error("Error al eliminar producto:", error);
          reject(
            new Response(
              JSON.stringify({
                message: "Error al eliminar producto",
              }),
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
}
