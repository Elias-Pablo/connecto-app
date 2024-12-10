import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const router = useRouter();
  const [unreadMessages, setUnreadMessages] = useState(0); // Mensajes no leídos
  const [profilePicture, setProfilePicture] = useState("/avatar.jpg");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para manejar el logout del usuario
  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; Path=/;";
    setUser(null);
    router.push("/");
  };

  // Obtener el token de usuario y decodificarlo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Fetch de la imagen del usuario si está logueado
  useEffect(() => {
    if (user) {
      const fetchUserAvatar = async () => {
        try {
          const response = await fetch("/api/userAvatar");
          if (response.ok) {
            const data = await response.json();
            setProfilePicture(data.usuario_imagen || "/avatar.jpg");
          } else {
            console.error("Error al obtener la imagen de perfil");
          }
        } catch (error) {
          console.error("Error en la solicitud de imagen de perfil:", error);
        }
      };
      fetchUserAvatar();
    }
  }, [user]);

  // Función para redirigir a la lista de chats
  const handleViewMessages = () => {
    router.push("/emprendedores/mensajes");
  };

  // Función para abrir/cerrar el menú de usuario
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-zinc-800 px-6 h-20 shadow-lg w-full flex items-center justify-between">
      {/* Sección Izquierda - Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/ConnecTo-logo-horizontal2.png"
            alt="ConnecTo Logo"
            width={150}
            height={50}
          />
        </Link>
      </div>

      {/* Sección Central - Navegación */}
      <nav className="flex items-center justify-center space-x-6">
        <Link
          className="px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white hover:text-sky-400 transition-colors duration-300 ease-in-out"
          href="/"
        >
          Home
        </Link>
        <Link
          className="px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white hover:text-sky-400 transition-colors duration-300 ease-in-out"
          href="/emprendedores/foro"
        >
          Foro de Emprendedores
        </Link>
        <Link
          className="px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-yellow-300 hover:text-sky-400 transition-colors duration-300 ease-in-out"
          href="/emprendedores/subscripcion"
        >
          Suscríbete
        </Link>
      </nav>

      {/* Sección Derecha - Perfil del Usuario */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Imagen y Nombre de Usuario */}
            <Link
              href="/user/profile"
              className="flex justify-center items-center gap-2"
            >
              <img
                src={profilePicture || "/avatar.jpg"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
              <span className="text-white font-semibold">
                {user?.username || "Usuario"}
              </span>
            </Link>

            {/* Botón para Cerrar Sesión */}
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              Cerrar Sesión
            </button>

            {/* Botón para Mensajes */}
            <button
              className="relative flex items-center justify-center py-2 px-4 rounded-xl bg-yellow-500 hover:bg-yellow-700 transition"
              onClick={handleViewMessages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
              </svg>
              {unreadMessages > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {unreadMessages}
                </span>
              )}
            </button>

            {/* Menú de Hamburguesa */}
            <button
              onClick={toggleMenu}
              className="text-white ml-4 p-2 rounded-md hover:bg-fuchsia-700 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute top-16 right-6 bg-white rounded-md shadow-lg p-4 w-40 z-20">
                <Link href="/emprendedores/ventas">
                  <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                    Ventas
                  </p>
                </Link>
                <Link href="/user/orders">
                  <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                    Pedidos
                  </p>
                </Link>
                <Link href="/user/favorites">
                  <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                    Favoritos
                  </p>
                </Link>
                <Link href="/user/profile">
                  <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                    Perfil
                  </p>
                </Link>
              </div>
            )}
          </>
        ) : (
          <Link
            href="/auth/login"
            className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
}
