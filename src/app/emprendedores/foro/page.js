"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header-em";
import { HandThumbUpIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ModalAdmin from "@/components/ModalAdmin";
import ModalPublicacion from "@/components/ModalPublicacion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Foro() {
  const [categorias, setCategorias] = useState([]);
  const [forosDestacados, setForosDestacados] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nuevoForo, setNuevoForo] = useState({
    titulo: "", // Inicializar con un string vacío
    descripcion: "", // Inicializar con un string vacío
    id_foro: "", // Inicializar con un string vacío
    url_imagen: "", // Inicializar con un string vacío
  });
  const [respuestaActiva, setRespuestaActiva] = useState(null);
  const [nuevaRespuesta, setNuevaRespuesta] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [respuestasVisibles, setRespuestasVisibles] = useState({});
  const [mostrarAdmin, setMostrarAdmin] = useState(false); // Mostrar o no la interfaz de administración
  const [misPublicaciones, setMisPublicaciones] = useState([]); // Publicaciones del usuario actual
  const [mostrarCrear, setMostrarCrear] = useState(false);

  // Obtener categorías y publicaciones
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/api/auth/foro?type=categorias");
        if (!response.ok) throw new Error("Error al cargar categorías");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setCategorias([]);
      }
    };

    const fetchForosDestacados = async () => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
          page: pagina,
          ...(filtroCategoria && { categoria: filtroCategoria }),
        }).toString();
        const response = await fetch(
          `/api/auth/foro?type=publicaciones&${queryParams}`
        );
        if (!response.ok) throw new Error("Error al cargar publicaciones");
        const data = await response.json();
        setForosDestacados(data.publicaciones || []);
        setTotalPaginas(data.totalPaginas || 1);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener publicaciones destacadas:", error);
        setForosDestacados([]);
      }
    };

    fetchCategorias();
    fetchForosDestacados();
  }, [pagina, filtroCategoria]);

  // Manejar el cambio en el formulario de creación
  const handleChange = (e) => {
    setNuevoForo({
      ...nuevoForo,
      [e.target.name]: e.target.value,
    });
  };

  // Crear nueva publicación
  const handleCrearForo = async (nuevoForo) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("Usuario no autorizado. Faltan credenciales.");

      const response = await fetch("/api/auth/foro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoForo),
      });

      if (response.ok) {
        const data = await response.json();
        setForosDestacados([...forosDestacados, { ...nuevoForo, id: data.id }]);
        setIsLoading(false);
      } else {
        console.error("Error al crear la publicación");
      }
    } catch (error) {
      console.error("Error en la solicitud de creación:", error);
    }
  };

  // Obtener respuestas
  const fetchRespuestas = async (id_publicaciones) => {
    try {
      // Si ya está visible, al hacer clic de nuevo, se oculta
      if (respuestasVisibles[id_publicaciones]) {
        setRespuestasVisibles((prev) => ({
          ...prev,
          [id_publicaciones]: false,
        }));
        return; // No hace la llamada si ya están visibles
      }

      setIsLoading(true);

      const response = await fetch(
        `/api/auth/foro/respuestas?id_publicaciones=${id_publicaciones}`
      );
      if (!response.ok) throw new Error("Error al cargar respuestas");
      const data = await response.json();

      setRespuestas((prev) => ({
        ...prev,
        [id_publicaciones]: data,
      }));

      setRespuestasVisibles((prev) => ({
        ...prev,
        [id_publicaciones]: true,
      }));
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Crear nueva respuesta
  const handleCrearRespuesta = async (id_publicaciones) => {
    try {
      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("Usuario no autorizado. Faltan credenciales.");

      const response = await fetch("/api/auth/foro/respuestas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_publicaciones, respuesta: nuevaRespuesta }),
      });

      if (response.ok) {
        await fetchRespuestas(id_publicaciones); // Actualizar las respuestas
        setNuevaRespuesta("");
        setRespuestaActiva(null);
      } else {
        console.error("Error al crear la respuesta");
      }
    } catch (error) {
      console.error("Error en la solicitud de creación de respuesta:", error);
    }
  };

  // Manejar reacciones
  const handleReaccionar = async (id_publicaciones, tipo) => {
    try {
      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("Usuario no autorizado. Faltan credenciales.");

      const response = await fetch("/api/auth/foro/reacciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_publicaciones, tipo }),
      });

      if (response.ok) {
        // Actualizar los conteos localmente
        setForosDestacados((prevForos) =>
          prevForos.map((foro) => {
            if (foro.id_publicaciones === id_publicaciones) {
              const countKey = tipo === "me gusta" ? "meGusta" : "util";
              const isAddingReaction = response.status === 201;

              return {
                ...foro,
                [countKey]: isAddingReaction
                  ? foro[countKey] + 1
                  : foro[countKey] - 1,
              };
            }
            return foro;
          })
        );
      } else {
        console.error("Error al registrar la reacción");
      }
    } catch (error) {
      console.error("Error en la solicitud de reacción:", error);
    }
  };

  const handlePaginaClick = (nuevaPagina) => {
    if (nuevaPagina > 0 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  };

  // Función para alternar respuestas
  const toggleRespuestas = async (id_publicaciones) => {
    if (respuestasVisibles[id_publicaciones]) {
      // Si las respuestas están visibles, oculta
      setRespuestasVisibles((prev) => ({
        ...prev,
        [id_publicaciones]: false,
      }));
    } else {
      // Si las respuestas no están visibles, intenta cargar desde la API
      try {
        const response = await fetch(
          `/api/auth/foro/respuestas?id_publicaciones=${id_publicaciones}`
        );
        if (!response.ok) throw new Error("Error al cargar respuestas");
        const data = await response.json();

        // Actualiza las respuestas y hazlas visibles
        setRespuestas((prev) => ({
          ...prev,
          [id_publicaciones]: data,
        }));
        setRespuestasVisibles((prev) => ({
          ...prev,
          [id_publicaciones]: true,
        }));
      } catch (error) {
        console.error("Error al obtener respuestas:", error);
      }
    }
  };

  const handleEditar = async (publicacion) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuario no autorizado.");

      await fetch("/api/auth/foro/publicaciones", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_publicaciones: publicacion.id_publicaciones,
          titulo: publicacion.titulo,
          descripcion: publicacion.descripcion,
        }),
      });

      fetchMisPublicaciones(); // Refresca las publicaciones
    } catch (error) {
      console.error("Error al editar publicación:", error);
    }
  };

  const handleEliminar = async (id_publicaciones) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `/api/auth/foro/publicaciones?id_publicaciones=${id_publicaciones}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchMisPublicaciones(); // Refresca las publicaciones
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
    }
  };

  const fetchMisPublicaciones = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/foro/publicaciones/id", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLoading(false);
      if (!response.ok) throw new Error("Error al cargar publicaciones");
      const data = await response.json();
      setMisPublicaciones(data);
    } catch (error) {
      console.error("Error al obtener publicaciones del usuario:", error);
    }
  };
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-500 font-medium">Cargando Foros...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="bg-sky-700 flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold text-white mt-4">
          Foro de Emprendedores
        </h1>
        <div className="w-full p-4">
          <button
            onClick={() => setMostrarCrear(true)}
            className="bg-green-500 text-white p-2 rounded-lg mb-4 mr-4" // Agrega 'mr-4' para margen derecho
          >
            Crear Publicación
          </button>
          {mostrarCrear && (
            <ModalPublicacion
              onClose={() => setMostrarCrear(false)}
              categorias={categorias} // Pasar las categorías disponibles
              onSubmit={(nuevoForo) => handleCrearForo(nuevoForo)} // Función de creación
            />
          )}
          <button
            onClick={() => {
              setMostrarAdmin(true);
              fetchMisPublicaciones();
            }}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Administrar Publicaciones
          </button>
          {mostrarAdmin && (
            <ModalAdmin
              misPublicaciones={misPublicaciones}
              onClose={() => setMostrarAdmin(false)}
              onEdit={handleEditar}
              onDelete={handleEliminar}
            />
          )}
          {/* Filtros por categoría */}
          <h2 className="text-2xl text-white font-bold mt-8">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <button
              onClick={() => setFiltroCategoria(null)}
              className={`cursor-pointer p-4 rounded-lg shadow-md text-center ${
                !filtroCategoria
                  ? "bg-green-500 text-white"
                  : "bg-white text-sky-700"
              }`}
            >
              Todas las Categorías
            </button>
            {categorias.map((categoria) => (
              <button
                key={categoria.id_foro}
                onClick={() => setFiltroCategoria(categoria.id_foro)}
                className={`cursor-pointer p-4 rounded-lg shadow-md text-center ${
                  filtroCategoria === categoria.id_foro
                    ? "bg-green-500 text-white"
                    : "bg-white text-sky-700"
                }`}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
          {/* Publicaciones */}
          <h2 className="text-2xl text-white font-bold mt-8">
            Publicaciones Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {forosDestacados.map((foro, index) => (
              <div
                key={foro.id_publicaciones || `foro-${index}`}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                {/* Mostrar el autor */}
                <p className="text-sm text-gray-600">
                  Autor: {foro.nombre_negocio || "Anónimo"}
                </p>

                {/* Imagen o Placeholder */}
                <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-md">
                  {foro.url_imagen?.startsWith("http") ? (
                    <img
                      src={foro.url_imagen}
                      alt={foro.titulo}
                      layout="fill"
                      objectfit="cover"
                      className="transition-opacity duration-300 hover:opacity-90"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <span className="text-lg font-bold">Sin Imagen</span>
                    </div>
                  )}
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold mt-4 text-gray-800">
                  {foro.titulo}
                </h3>

                {/* Descripción */}
                <p className="text-gray-700 mt-2">{foro.descripcion}</p>

                {/* Botones de acciones */}
                <div className="flex items-center mt-4 space-x-4">
                  {/* Reacciones */}
                  <button
                    onClick={() =>
                      handleReaccionar(foro.id_publicaciones, "me gusta")
                    }
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <HandThumbUpIcon className="h-5 w-5" />
                    <span className="ml-1">{foro.meGusta || 0}</span>
                  </button>
                  <button
                    onClick={() =>
                      handleReaccionar(foro.id_publicaciones, "útil")
                    }
                    className="flex items-center text-green-500 hover:underline"
                  >
                    <LightBulbIcon className="h-5 w-5" />
                    <span className="ml-1">{foro.util || 0}</span>
                  </button>
                  {/* Botón de Ver/Esconder Respuestas */}
                  <button
                    onClick={() => toggleRespuestas(foro.id_publicaciones)}
                    className="bg-yellow-500 text-white p-2 rounded-lg"
                  >
                    {respuestasVisibles[foro.id_publicaciones]
                      ? "Ocultar Respuestas"
                      : `Ver Respuestas (${foro.total_respuestas || 0})`}
                  </button>
                  {/* Mostrar respuestas o mensaje */}
                  {respuestasVisibles[foro.id_publicaciones] ? (
                    Array.isArray(respuestas[foro.id_publicaciones]) &&
                    respuestas[foro.id_publicaciones].length > 0 ? (
                      respuestas[foro.id_publicaciones].map((respuesta) => (
                        <div
                          key={respuesta.id_respuesta}
                          className="bg-gray-100 p-4 rounded-lg shadow-md mt-4"
                        >
                          <p className="text-gray-700">{respuesta.respuesta}</p>
                          <div className="flex justify-between mt-2">
                            <small className="text-gray-500">
                              Por: {respuesta.nombre_negocio}
                            </small>
                            <small className="text-gray-500">
                              {new Date(
                                respuesta.tiempo_creacion
                              ).toLocaleString()}
                            </small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 mt-4">
                        No hay respuestas aún.
                      </p> // Mensaje si no hay respuestas cargadas
                    )
                  ) : null}{" "}
                  {/* Oculta las respuestas cuando no están visibles */}
                  {/* Responder */}
                  <button
                    onClick={() => setRespuestaActiva(foro.id_publicaciones)}
                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                  >
                    Responder
                  </button>
                </div>
                {/* Formulario para responder */}
                {respuestaActiva === foro.id_publicaciones && (
                  <div className="mt-4">
                    <textarea
                      value={nuevaRespuesta}
                      onChange={(e) => setNuevaRespuesta(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="w-full p-2 border rounded"
                    ></textarea>
                    <button
                      onClick={() =>
                        handleCrearRespuesta(foro.id_publicaciones)
                      }
                      className="bg-green-500 text-white p-2 rounded-lg mt-2"
                    >
                      Enviar Respuesta
                    </button>
                    <button
                      onClick={() => setRespuestaActiva(null)}
                      className="bg-red-500 text-white p-2 rounded-lg mt-2 ml-2"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Paginación */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePaginaClick(1)}
              disabled={pagina === 1}
              className="bg-sky-500 text-white p-2 rounded-lg"
            >
              Primera
            </button>
            <button
              onClick={() => handlePaginaClick(pagina - 1)}
              disabled={pagina === 1}
              className="bg-sky-500 text-white p-2 rounded-lg"
            >
              Anterior
            </button>
            {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(
              (num) => (
                <button
                  key={num}
                  onClick={() => handlePaginaClick(num)}
                  className={`p-2 rounded-lg ${
                    num === pagina
                      ? "bg-green-500 text-white"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  }`}
                >
                  {num}
                </button>
              )
            )}
            <button
              onClick={() => handlePaginaClick(pagina + 1)}
              disabled={pagina === totalPaginas}
              className="bg-sky-500 text-white p-2 rounded-lg"
            >
              Siguiente
            </button>
            <button
              onClick={() => handlePaginaClick(totalPaginas)}
              disabled={pagina === totalPaginas}
              className="bg-sky-500 text-white p-2 rounded-lg"
            >
              Última
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
