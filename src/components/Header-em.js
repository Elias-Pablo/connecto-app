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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"
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
      </div>
    </header>
  );
}
