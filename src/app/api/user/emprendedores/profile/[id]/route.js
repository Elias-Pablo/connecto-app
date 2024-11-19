import connection from "@/lib/db";
export const dynamic = "force-dynamic"; // Forzar la generación dinámica para esta ruta

// Obtener datos completos del emprendedor por ID de perfil
export async function GET(req, { params }) {
  try {
    const profileId = params.id;

    if (!profileId) {
      return new Response(
        JSON.stringify({ message: "ID de perfil es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Obtener datos del emprendedor
    const emprendedorData = await obtenerDatosEmprendedor(profileId);

    if (!emprendedorData) {
      return new Response(
        JSON.stringify({ message: "Emprendedor no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Obtener productos del emprendedor
    const productos = await obtenerProductos(profileId);

    return new Response(JSON.stringify({ emprendedorData, productos }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener datos del emprendedor:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener datos del emprendedor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Función para obtener los datos del emprendedor
async function obtenerDatosEmprendedor(profileId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT e.nombre_negocio, e.descripcion, e.direccion, e.telefono, e.sitioweb_url, i.url_imagen
       FROM perfil_negocio e
       LEFT JOIN imagen_publicacion i ON e.id_imagen = i.id_imagen
       WHERE e.id_perfil = ?`,
      [profileId],
      (error, results) => {
        if (error) {
          console.error("Error al obtener datos del emprendedor:", error);
          reject(new Error("Error al obtener datos del emprendedor"));
        } else {
          resolve(results[0] || null);
        }
      }
    );
  });
}

// Función para obtener los productos del emprendedor
async function obtenerProductos(profileId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT p.id_producto, p.nombre AS producto_nombre, p.descripcion, p.precio, i.url_imagen
       FROM productos p
       LEFT JOIN imagen_publicacion i ON p.id_imagen = i.id_imagen
       WHERE p.id_perfil = ?`,
      [profileId],
      (error, results) => {
        if (error) {
          console.error("Error al obtener productos:", error);
          reject(new Error("Error al obtener productos"));
        } else {
          resolve(results);
        }
      }
    );
  });
}
