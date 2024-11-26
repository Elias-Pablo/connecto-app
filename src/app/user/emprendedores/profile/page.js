"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header-us";
import { useCart, CartProvider } from "../../../context/CartContext";
import { jwtDecode } from "jwt-decode";

export default function EmprendedorProfile() {
  const [emprendedorData, setEmprendedorData] = useState(null);
  const [productos, setProductos] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [idConversacion, setIdConversacion] = useState(null); // Nuevo estado para id_conversacion
  const searchParams = useSearchParams();
  const idPerfil = searchParams.get("id_perfil");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [idDestinatario, setIdDestinatario] = useState(null);
  const [idRemitente, setIdRemitente] = useState(null);

  const lastMessageRef = useRef(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Obtener `id_usuario` del cliente desde el token JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setIdRemitente(decoded.userId);
      setUsername(decoded.username);
    }
  }, []);

  // Obtener los datos del emprendedor y su `id_usuario` a partir de `id_perfil`
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!idPerfil) {
        console.error("ID de perfil no proporcionado");
        return;
      }
      try {
        const response = await fetch(
          `/api/user/emprendedores/profile/${idPerfil}`
        );
        if (response.ok) {
          const data = await response.json();
          setEmprendedorData(data.emprendedorData || {});
          setProductos(data.productos || []);
          setIdDestinatario(data.emprendedorData.id_usuario); // Obtener el `id_usuario` del emprendedor
        } else {
          console.error("Error al cargar los datos del emprendedor");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProfileData();
  }, [idPerfil]);

  // Obtener o crear la conversación y cargar mensajes
  // Obtener o crear la conversación y cargar mensajes
  useEffect(() => {
    const fetchOrCreateConversation = async () => {
      if (idRemitente && idDestinatario) {
        try {
          const response = await fetch("/api/chat/conversation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_remitente: idRemitente,
              id_destinatario: idDestinatario,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setIdConversacion(data.id_conversacion);

            // Cargar mensajes de la conversación
            const messagesResponse = await fetch(
              `/api/chat/get?id_conversacion=${data.id_conversacion}`
            );

            if (messagesResponse.ok) {
              const messagesData = await messagesResponse.json();
              setMessages(messagesData.mensajes || []);
              setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 0);
            } else {
              console.error("Error al cargar los mensajes");
            }
          } else {
            console.error("Error al obtener o crear la conversación");
          }
        } catch (error) {
          console.error("Error al obtener o crear la conversación:", error);
        }
      }
    };

    fetchOrCreateConversation();
  }, [idRemitente, idDestinatario]);

  const handleSendMessage = async () => {
    if (!idConversacion) {
      console.error(
        "No se puede enviar el mensaje sin una conversación activa"
      );
      return;
    }

    console.log("Enviando mensaje:", {
      idRemitente,
      idDestinatario,
      idConversacion,
      message,
    });

    try {
      const response = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_remitente: idRemitente,
          id_destinatario: idDestinatario,
          id_conversacion: idConversacion,
          contenido: message,
        }),
      });

      if (response.ok) {
        // Construir el mensaje con el formato correcto
        const newMessage = {
          contenido: message, // El texto del mensaje enviado
          remitente: username, // Usuario actual que envió el mensaje
          fecha_envio: new Date().toISOString(), // Fecha y hora actuales
        };

        // Agregar el nuevo mensaje al estado
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Limpia el campo de entrada
        setMessage("");
        setTimeout(() => {
          lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
      } else {
        console.error("Error al enviar el mensaje al servidor");
      }
    } catch (error) {
      console.error("Error al intentar enviar el mensaje:", error);
    }
  };

  return (
    <CartProvider>
      <Header />
      <Suspense
        fallback={<p className="text-center text-gray-500">Cargando...</p>}
      >
        {emprendedorData ? (
          <section className="p-10">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src={emprendedorData.url_imagen || "/placeholder.webp"}
                alt={emprendedorData.nombre_negocio || "Emprendedor"}
                width={150}
                height={150}
                className="mx-auto rounded-full mb-4"
              />
              <h1 className="text-2xl font-bold mb-2 text-black">
                {emprendedorData.nombre_negocio}
              </h1>
              <p className="text-sm mb-2 text-black">
                Dirección: {emprendedorData.direccion || "No disponible"}
              </p>
              <p className="text-sm mb-2 text-black">
                Teléfono: {emprendedorData.telefono || "No disponible"}
              </p>
              {emprendedorData.sitio_web ? (
                <a
                  href={emprendedorData.sitio_web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {emprendedorData.sitio_web}
                </a>
              ) : (
                <p className="text-sm text-gray-500">Sitio web no disponible</p>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => setShowChat(true)}
              >
                Chat
              </button>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Productos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productos.length > 0 ? (
                  productos.map((producto) => (
                    <div
                      key={producto.id_producto}
                      className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-around"
                    >
                      <img
                        src={producto.url_imagen || "/placeholder.webp"}
                        alt={producto.producto_nombre}
                        width={200}
                        height={150}
                        className="rounded-lg mb-2"
                      />
                      <h3 className="text-lg font-bold text-black">
                        {producto.producto_nombre}
                      </h3>
                      <p className="text-sm mb-2 text-black">
                        {producto.descripcion}
                      </p>
                      <p className="text-blue-500 font-semibold">
                        {formatPrice(producto.precio)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No hay productos disponibles.
                  </p>
                )}
              </div>
            </div>

            {showChat && (
              <div className="fixed bottom-0 right-0 w-full md:w-1/3 bg-white border-t shadow-lg">
                <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Chat con {emprendedorData.nombre_negocio}
                  </h2>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-white text-xl font-bold"
                  >
                    &times;
                  </button>
                </div>
                <div className="p-4 overflow-y-auto h-64">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      ref={
                        index === messages.length - 1 ? lastMessageRef : null
                      } // Referencia al último mensaje
                      className={`mb-4 ${
                        msg.remitente === username
                          ? "text-right"
                          : "text-left text-gray-700"
                      }`}
                    >
                      <p className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-black">
                        {msg.contenido}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="text-black p-4 flex">
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    className="flex-grow border rounded-l-lg p-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 rounded-r-lg"
                    onClick={handleSendMessage}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          <p className="text-center text-gray-500">
            No se encontró información del emprendedor.
          </p>
        )}
      </Suspense>
    </CartProvider>
  );
}
