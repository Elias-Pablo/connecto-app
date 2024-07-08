import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ConnecTo",
  description:
    "Tu plataforma ideal para gestionar tu negocio y aumentar tu visibilidad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <footer className="bg-neutral-800 p-4 text-white text-center  w-full h-full">
          &copy; 2024 ConnecTo. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
