import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

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
        <footer className="bg-neutral-800 p-4 text-white text-center flex  justify-center items-center w-full h-auto">
          <Link href="/">
            <Image
              src="/ConnecTo-logo-horizontal2.png"
              alt="ConnecTo Logo"
              width={105}
              height={25}
            />
          </Link>
          &copy; 2024 ConnecTo. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
