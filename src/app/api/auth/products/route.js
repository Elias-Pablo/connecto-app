import connection from "@/lib/db";

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

export async function GET(req) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock, i.url_imagen
       FROM productos p
       LEFT JOIN imagen_publicacion i ON p.id_imagen = i.id_imagen`,
      (error, results) => {
        if (error) {
          console.error("Error al cargar productos:", error);
          reject(
            new Response(
              JSON.stringify({
                message: "Error al cargar productos",
              }),
              { status: 500 }
            )
          );
        } else {
          const products = results.map((product) => ({
            id: product.id_producto,
            name: product.nombre,
            description: product.descripcion,
            price: product.precio,
            stock: product.stock,
            image: product.url_imagen,
          }));
          resolve(new Response(JSON.stringify({ products }), { status: 200 }));
        }
      }
    );
  });
}

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
