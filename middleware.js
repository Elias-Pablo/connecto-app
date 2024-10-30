// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Puedes usar este valor para validaciones adicionales si es necesario
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
  matcher: ["/perfil/:path*", "/dashboard/:path*"], // Rutas protegidas
};
