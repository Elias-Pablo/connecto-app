"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Agregado useSearchParams
import Header from "@/components/Header-us";
import { useCart, CartProvider } from "../../../context/CartContext";
import { jwtDecode } from "jwt-decode";
import Slider from "react-slick"; // Importación del carrusel de react-slick
import "slick-carousel/slick/slick.css"; // Importar estilos de slick-carousel
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function EmprendedorProfile() {
  const searchParams = useSearchParams();
  const idPerfil = searchParams ? searchParams.get("id_perfil") : null;

  const [emprendedorData, setEmprendedorData] = useState(null);
  const [productos, setProductos] = useState([]);
  const [favorites, setFavorites] = useState([]); // Para manejar los favoritos
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [idConversacion, setIdConversacion] = useState(null); // Nuevo estado para id_conversacion
  const [reviews, setReviews] = useState([]); // Nuevo estado para las reseñas
  const [newReview, setNewReview] = useState({
    comentario: "",
    calificacion: 0,
  });
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [idDestinatario, setIdDestinatario] = useState(null);
  const [idRemitente, setIdRemitente] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const lastMessageRef = useRef(null);

  const isFavorite = favorites.some(
    (fav) => fav.id_perfil === parseInt(idPerfil, 10)
  );

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

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
          setIdDestinatario(data.emprendedorData.id_usuario);
        } else {
          console.error("Error al cargar los datos del emprendedor");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProfileData();
  }, [idPerfil]);

  // Obtener las reseñas del emprendedor
  useEffect(() => {
    const fetchReviews = async () => {
      if (!idPerfil) return;
      try {
        const response = await fetch(`/api/reviews/emprendedor/${idPerfil}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        } else {
          console.error("Error al obtener las reseñas");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchReviews();
  }, [idPerfil]);

  // Manejar agregar a favoritos
  const handleAddToFavorites = async () => {
    try {
      const response = await fetch(`/api/user/emfavorito`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_perfil: idPerfil }),
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites((prevFavorites) => [
          ...prevFavorites,
          { id_favorito: data.id, id_perfil: parseInt(idPerfil, 10) },
        ]);
        console.log("Emprendedor agregado a favoritos");
        toast.success("Emprendedor agregado a favoritos");
      } else {
        console.error("Error al agregar emprendedor a favoritos");
      }
    } catch (error) {
      console.error("Error al intentar agregar a favoritos:", error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    const favorite = favorites.find(
      (fav) => fav.id_perfil === parseInt(idPerfil, 10)
    );

    if (!favorite) return;

    try {
      const response = await fetch(
        `/api/user/emfavorito?id_favorito=${favorite.id_favorito}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter(
            (fav) => fav.id_favorito !== favorite.id_favorito
          )
        );
        console.log("Emprendedor eliminado de favoritos");
        toast.info("Emprendedor eliminado de favoritos");
      } else {
        console.error("Error al eliminar emprendedor de favoritos");
      }
    } catch (error) {
      console.error("Error al intentar eliminar de favoritos:", error);
    }
  };

  // Cargar favoritos al iniciar
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/user/emfavorito`);
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favorites || []);
        } else {
          console.error("Error al cargar favoritos");
        }
      } catch (error) {
        console.error("Error en la solicitud de favoritos:", error);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(`/api/empAvatar?id_perfil=${idPerfil}`);
        if (response.ok) {
          const picProfile = await response.json();
          setProfilePicture(picProfile.usuario_imagen || "/placeholder.webp");
        } else {
          console.error("Error al cargar la imagen de perfil");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    if (idPerfil) {
      fetchProfilePicture();
    }
  }, [idPerfil]); // Dependencia correcta para llamar cuando idPerfil cambie

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
        const newMessage = {
          contenido: message,
          remitente: username,
          fecha_envio: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
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
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/reviews/emprendedor/${idPerfil}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        setReviews([...reviews, { ...newReview, fecha_creacion: new Date() }]);
        setNewReview({ comentario: "", calificacion: 0 }); // Limpiar el formulario
      } else {
        console.error("Error al agregar reseña");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
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
                src={profilePicture || "/placeholder.webp"}
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
              <button
                className="py-2 px-4 my-4 text-white rounded-lg bg-red-500 hover:bg-red-600"
                onClick={
                  isFavorite ? handleRemoveFromFavorites : handleAddToFavorites
                }
              >
                {isFavorite ? (
                  <GoHeartFill className="text-white w-8 h-8 " />
                ) : (
                  <GoHeart className="text-white w-8 h-8 " />
                )}
              </button>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => setShowChat(true)}
              >
                Chat
              </button>
            </div>

            {/* Sección de reseñas */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Reseñas</h3>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="border-b py-4">
                    <p className="flex">
                      <strong>{review.nombre_usuario}</strong> -{" "}
                      {renderStars(review.calificacion)}
                    </p>
                    <p>{review.comentario}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.fecha_creacion).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No hay reseñas para este producto.</p>
              )}

              <h3 className="text-xl font-semibold mt-6">Agregar una reseña</h3>
              <form onSubmit={handleReviewSubmit}>
                <textarea
                  name="comentario"
                  value={newReview.comentario}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comentario: e.target.value })
                  }
                  placeholder="Escribe tu comentario"
                  className="w-full p-2 border rounded mb-4"
                  required
                />
                <div className="mb-4">
                  <label className="mr-2">Calificación:</label>
                  <select
                    name="calificacion"
                    value={newReview.calificacion}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        calificacion: parseInt(e.target.value),
                      })
                    }
                    className="p-2 border rounded"
                    required
                  >
                    <option value="0">Seleccionar calificación</option>
                    <option value="1" className="text-center">
                      ⭐
                    </option>
                    <option value="2" className="text-center">
                      ⭐⭐
                    </option>
                    <option value="3" className="text-center">
                      ⭐⭐⭐
                    </option>
                    <option value="4" className="text-center">
                      ⭐⭐⭐⭐
                    </option>
                    <option value="5" className="text-center">
                      ⭐⭐⭐⭐⭐
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Enviar Reseña
                </button>
              </form>
            </div>

            {/* Productos */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Productos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productos.length > 0 ? (
                  productos.map((producto) => (
                    <div
                      key={producto.id}
                      className="text-center p-5 bg-gray-200 w-auto rounded-lg shadow-lg"
                    >
                      {producto.images && producto.images.length > 0 ? (
                        <Slider {...sliderSettings}>
                          {producto.images.map((img, index) => (
                            <div key={index}>
                              <img
                                src={img || "/placeholder.webp"}
                                alt={`Producto ${index + 1}`}
                                width={200}
                                height={150}
                                className="rounded-lg mb-2 w-full h-64 object-cover"
                              />
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        <img
                          src="/placeholder.webp"
                          alt="Sin imagen"
                          className="rounded-lg mb-2 w-full h-64 object-cover"
                        />
                      )}
                      <h3 className="text-lg font-bold text-black mt-6">
                        {producto.name}
                      </h3>
                      <p className="text-sm mb-2 text-black">
                        {producto.description}
                      </p>
                      <p className="text-blue-500 font-semibold">
                        {formatPrice(producto.price)}
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
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-500 font-medium">
              Cargando Perfil...
            </p>
          </div>
        )}
      </Suspense>
    </CartProvider>
  );
}
