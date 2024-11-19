import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Usamos `jose` en lugar de `jsonwebtoken`

// Convertimos la clave secreta en un Uint8Array
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value; // Aseguramos que obtenemos solo el valor del token

  if (token) {
    try {
      // Verificamos y decodificamos el token con `jose`
      const { payload } = await jwtVerify(token, SECRET);

      // Guardamos la información del usuario decodificado en req
      req.user = payload;

      // Validamos las rutas protegidas
      const url = req.nextUrl.clone();
      if (
        url.pathname.startsWith("/emprendedores") &&
        payload.tipo_usuario !== "emprendedor"
      ) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    } catch (error) {
      console.error("Error de JWT:", error.message);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } else {
    // Si no hay token, redirigimos al usuario
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Si todo está bien, continuamos
  return NextResponse.next();
}

export const config = {
  matcher: ["/perfil/:path*", "/dashboard/:path*", "/emprendedores/:path*"], // Rutas protegidas
};
