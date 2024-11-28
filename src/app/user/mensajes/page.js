"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "@/components/Header-us";
import { set } from "react-hook-form";
import { useCart, CartProvider } from "@/app/context/CartContext";

export default function Mensajes() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  // Obtener el userId del JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
      setUsername(decoded.username);
    }
  }, []);

  // Fetch chats con mensajes no leídos
  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró el token JWT");
        return;
      }

      try {
        const response = await fetch("/api/chat/unread", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setChats(data.chats || []);
        } else {
          console.error("Error al obtener los chats");
        }
      } catch (error) {
        console.error("Error al fetchear chats:", error);
      }
    };

    fetchChats();
  }, []);

  // Fetch mensajes del chat seleccionado
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;

      try {
        const response = await fetch(
          `/api/chat/get?id_conversacion=${selectedChat.id_conversacion}`
        );

        if (response.ok) {
          const data = await response.json();
          setMessages(data.mensajes || []);
        } else {
          console.error("Error al obtener mensajes del chat");
        }
      } catch (error) {
        console.error("Error al fetchear mensajes:", error);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // Enviar mensaje
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) {
      console.error("No se puede enviar el mensaje sin seleccionar un chat.");
      return;
    }

    // Asignar el destinatario correcto
    const idDestinatario = selectedChat.id_usuario2 || selectedChat.id_usuario1;
    if (!idDestinatario) {
      console.error("El destinatario no está definido.");
      return;
    }

    console.log("Enviando mensaje:", {
      id_remitente: userId,
      id_destinatario: idDestinatario,
      id_conversacion: selectedChat.id_conversacion,
      contenido: newMessage.trim(),
    });

    try {
      const response = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_remitente: userId,
          id_destinatario: idDestinatario,
          id_conversacion: selectedChat.id_conversacion,
          contenido: newMessage.trim(),
        }),
      });

      if (response.ok) {
        const newMsg = {
          contenido: newMessage,
          remitente: username,
          fecha_envio: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMsg]);
        setNewMessage(""); // Limpiar el input
      } else {
        console.error("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <>
      <CartProvider>
        <Header />
        <div className="flex h-[calc(100vh-80px)] overflow-hidden">
          {" "}
          {/* Ajusta la altura */}
          {/* Sidebar de chats */}
          <aside className="w-1/3 bg-fuchsia-500 border-r overflow-y-auto">
            <h2 className="text-lg font-semibold p-4 border-b">Tus Chats</h2>
            {chats.length > 0 ? (
              chats.map((chat) => (
                <div
                  key={chat.id_conversacion}
                  className={`p-4 cursor-pointer border-b hover:bg-sky-500 ${
                    selectedChat?.id_conversacion === chat.id_conversacion
                      ? "bg-sky-300"
                      : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <p className="font-semibold">
                    {chat.nombre_usuario || chat.nombre_conversacion}
                  </p>
                  {chat.unread_count > 0 && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {chat.unread_count}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="p-4 text-gray-600">No tienes chats aún.</p>
            )}
          </aside>
          {/* Ventana de mensajes */}
          <main className="w-2/3 flex flex-col">
            {selectedChat ? (
              <>
                {/* Header del chat */}
                <header className="p-4 bg-fuchsia-400 border-b flex justify-between items-center">
                  <h2 className="font-semibold">
                    {selectedChat.nombre_usuario ||
                      selectedChat.nombre_conversacion}
                  </h2>
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setSelectedChat(null)}
                  >
                    Volver a la lista
                  </button>
                </header>

                {/* Mensajes */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        msg.remitente === username ? "text-right" : "text-left"
                      }`}
                    >
                      <p
                        className={`inline-block px-4 py-2 rounded-lg ${
                          msg.remitente === username
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-black"
                        }`}
                      >
                        {msg.contenido}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.fecha_envio).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Input de mensaje */}
                <footer className="p-4 bg-gray-100 border-t flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    className="flex-grow border rounded-l-lg p-2"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleSendMessage}
                  >
                    Enviar
                  </button>
                </footer>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">
                  Selecciona un chat para ver los mensajes
                </p>
              </div>
            )}
          </main>
        </div>
      </CartProvider>
    </>
  );
}
