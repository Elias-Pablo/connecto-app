import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Convertimos la clave secreta en un Uint8Array
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value; // Obtenemos el token desde las cookies

  if (!token) {
    // Si no hay token, redirigimos al usuario a la página de inicio de sesión
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    // Verificamos y decodificamos el token con `jose`
    const { payload } = await jwtVerify(token, SECRET);

    // Agregamos información decodificada como parámetros de búsqueda
    const url = req.nextUrl.clone();
    url.searchParams.set("userId", payload.userId);
    url.searchParams.set("tipo_usuario", payload.tipo_usuario);

    // Validamos el acceso según el tipo de usuario
    if (
      url.pathname.startsWith("/emprendedores") &&
      payload.tipo_usuario !== "emprendedor"
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Si todo está bien, continuamos
    return NextResponse.next();
  } catch (error) {
    console.error("Error de JWT:", error.message);

    // Si el token es inválido, redirigimos al usuario a la página de inicio de sesión
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/perfil/:path*", "/dashboard/:path*", "/emprendedores/:path*"], // Rutas protegidas
};
