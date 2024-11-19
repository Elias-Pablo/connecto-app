"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header-us";
import { useCart, CartProvider } from "../../../context/CartContext";
import { ChatIcon } from "@heroicons/react/outline"; // Usa un icono de chat de Heroicons

export default function EmprendedorProfile() {
  const [emprendedorData, setEmprendedorData] = useState(null);
  const [productos, setProductos] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [showChat, setShowChat] = useState(false); // Estado para mostrar/ocultar el chat
  const [message, setMessage] = useState(""); // Mensaje actual
  const [messages, setMessages] = useState([]); // Lista de mensajes
  const searchParams = useSearchParams();
  const idPerfil = searchParams.get("id_perfil");
  const router = useRouter();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

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
          setResenas(data.resenas || []);
        } else {
          console.error("Error al cargar los datos del emprendedor");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProfileData();
  }, [idPerfil]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "User" }]); // Agrega el mensaje enviado
      setMessage(""); // Limpia el input
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
                onClick={() => setShowChat(true)} // Muestra el chat al hacer clic
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2-12H7a2 2 0 00-2 2v12l3.5-3.5h9.5a2 2 0 002-2V6a2 2 0 00-2-2z"
                  />
                </svg>
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
                        src={producto.url_imagen || "/placeholder.jpg"}
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
                      <button
                        onClick={() => addToCart(producto)}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Agregar al Carrito
                      </button>
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
                    Emprendedor: {emprendedorData.nombre_negocio}
                  </h2>
                  <button
                    onClick={() => setShowChat(false)} // Cierra el chat
                    className="text-white text-xl font-bold"
                  >
                    &times;
                  </button>
                </div>
                <div className="p-4 overflow-y-auto h-64">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        msg.sender === "User"
                          ? "text-right"
                          : "text-left text-gray-700"
                      }`}
                    >
                      <p className="inline-block px-4 py-2 rounded-lg bg-gray-200">
                        {msg.text}
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
