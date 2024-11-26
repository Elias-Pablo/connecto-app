import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [unreadMessages, setUnreadMessages] = useState(0); // Mensajes no leídos
  const [chats, setChats] = useState([]); // Chats con clientes

  // Fetch inicial para obtener chats y mensajes no leídos
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const response = await fetch("/api/chat/unread"); // Endpoint para obtener mensajes no leídos
        if (response.ok) {
          const data = await response.json();
          setUnreadMessages(data.totalUnread || 0);
          setChats(data.chats || []);
        } else {
          console.error("Error al obtener mensajes no leídos");
        }
      } catch (error) {
        console.error("Error al fetchear mensajes no leídos:", error);
      }
    };

    fetchUnreadMessages();
  }, []);

  // Función para redirigir a la lista de chats
  const handleViewMessages = () => {
    router.push("/emprendedores/mensajes"); // Página que muestra los chats
  };

  return (
    <header className="bg-zinc-800 px-6 h-20 shadow-lg w-full flex items-center">
      <div className="flex w-1/3">
        <Link href="/" className="flex items-center">
          <Image
            src="/ConnecTo-logo-horizontal2.png"
            alt="ConnecTo Logo"
            width={250}
            height={50}
          />
        </Link>
      </div>
      <div className="flex w-1/3 justify-center">
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
      </div>
      <div className="flex w-1/3 justify-end items-center relative">
        <button
          className="relative flex items-center justify-center p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
          onClick={handleViewMessages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8h10M7 12h4m1 8h7a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v9a2 2 0 002 2h3l4 4z"
            />
          </svg>
          {unreadMessages > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {unreadMessages}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
