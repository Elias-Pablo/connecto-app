// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Almacenar el usuario decodificado en req para otras validaciones

      // Si el usuario intenta acceder a /emprendedores y no es "emprendedor", redirigir
      const url = req.nextUrl.clone();
      if (
        url.pathname.startsWith("/emprendedores") &&
        decoded.tipo_usuario !== "emprendedor"
      ) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    } catch (error) {
      console.error("Error de JWT:", error);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/perfil/:path*", "/dashboard/:path*", "/emprendedores/:path*"], // Agregar la ruta /emprendedores
};
