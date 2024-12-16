import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { CartProvider } from "@/app/context/CartContext"; // Importa el CartProvider
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        {/* Envuelve el contenido con CartProvider */}
        <CartProvider>
          {children}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        <footer className="bg-primary text-accent-cream text-center flex  justify-center items-center w-full h-auto">
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
        </CartProvider>
      </body>
    </html>
  );
}
