import connection from "@/lib/db";

// Obtener el avatar de un negocio
export async function GET(req) {
  try {
    // Obtener el `id_perfil` de los parámetros de consulta
    const url = new URL(req.url);
    const idPerfil = url.searchParams.get("id_perfil");

    if (!idPerfil) {
      return new Response(
        JSON.stringify({ message: "id_perfil es requerido" }),
        { status: 400 }
      );
    }

    // Consultar la tabla `perfil_negocio` para obtener el `id_usuario`
    const [perfilNegocio] = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT id_usuario FROM perfil_negocio WHERE id_perfil = ?",
        [idPerfil],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    if (!perfilNegocio) {
      return new Response(
        JSON.stringify({ message: "Perfil de negocio no encontrado" }),
        { status: 404 }
      );
    }

    const idUsuario = perfilNegocio.id_usuario;

    // Consultar la tabla `usuarios` para obtener la URL de la imagen de perfil
    const [user] = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT usuario_imagen FROM usuarios WHERE id_usuario = ?",
        [idUsuario],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener el avatar del negocio:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener el avatar del negocio" }),
      { status: 500 }
    );
  }
}
