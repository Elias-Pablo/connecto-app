import connection from "@/lib/db";
export const dynamic = "force-dynamic";

// Obtener el avatar de un negocio
export async function GET(req) {
  try {
    // Extraer `id_perfil` de los parámetros de consulta
    const url = new URL(req.url);
    const idPerfil = url.searchParams.get("id_perfil");

    if (!idPerfil) {
      return new Response(
        JSON.stringify({ message: "El parámetro id_perfil es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Obtener el `id_usuario` asociado al `id_perfil`
    const [perfilNegocio] = await connection
      .promise()
      .query("SELECT id_usuario FROM perfil_negocio WHERE id_perfil = ?", [
        idPerfil,
      ]);

    if (perfilNegocio.length === 0) {
      return new Response(
        JSON.stringify({ message: "Perfil de negocio no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const idUsuario = perfilNegocio[0].id_usuario;

    // Obtener la URL de la imagen de perfil desde la tabla `usuarios`
    const [user] = await connection
      .promise()
      .query("SELECT usuario_imagen FROM usuarios WHERE id_usuario = ?", [
        idUsuario,
      ]);

    if (user.length === 0) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(user[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener el avatar del negocio:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
