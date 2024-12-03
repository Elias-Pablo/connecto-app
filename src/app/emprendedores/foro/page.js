"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header-em";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function Foro() {
  const [categorias, setCategorias] = useState([]);
  const [forosDestacados, setForosDestacados] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Indicador de carga
  const [nuevoForo, setNuevoForo] = useState({
    titulo: "",
    descripcion: "",
    id_foro: "",
    url_imagen: "",
  });
  const [respuestaActiva, setRespuestaActiva] = useState(null);
  const [nuevaRespuesta, setNuevaRespuesta] = useState("");
  const [pagina, setPagina] = useState(1); // Para paginación
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtroCategoria, setFiltroCategoria] = useState(null); // Filtrado por categoría

  // Obtener categorías desde la tabla `foro`
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/foro?type=categorias");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  // Obtener publicaciones del foro con paginación y filtrado
  useEffect(() => {
    const fetchForosDestacados = async () => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
          page: pagina,
          ...(filtroCategoria && { categoria: filtroCategoria }),
        }).toString();
        const response = await fetch(`/api/auth/foro?type=publicaciones&${queryParams}`);
        const data = await response.json();
        setForosDestacados(data.publicaciones || []); // Aseguramos que sea un array
        setTotalPaginas(data.totalPaginas || 1); // Default: 1 página
      } catch (error) {
        console.error("Error al obtener publicaciones destacadas:", error);
        setForosDestacados([]); // Asignar un array vacío si hay error
      } finally {
        setIsLoading(false);
      }
    };

    fetchForosDestacados();
  }, [pagina, filtroCategoria]);

  // Manejar el cambio en el formulario de creación
  const handleChange = (e) => {
    setNuevoForo({
      ...nuevoForo,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar nueva publicación al backend
  const handleCrearForo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/foro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoForo),
      });

      if (response.ok) {
        const data = await response.json();
        setForosDestacados([...forosDestacados, { ...nuevoForo, id: data.id }]);
        setMostrarFormulario(false); // Ocultar el formulario después de crear
      } else {
        console.error("Error al crear la publicación");
      }
    } catch (error) {
      console.error("Error en la solicitud de creación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener respuestas de una publicación
  const fetchRespuestas = async (id_publicaciones) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/auth/foro/respuestas?id_publicaciones=${id_publicaciones}`
      );
      const data = await response.json();
      setRespuestas((prev) => ({
        ...prev,
        [id_publicaciones]: data,
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
      setIsLoading(true);
      const response = await fetch("/api/auth/foro/respuestas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id_publicaciones, respuesta: nuevaRespuesta }),
      });

      if (response.ok) {
        fetchRespuestas(id_publicaciones); // Refrescar las respuestas
        setNuevaRespuesta("");
        setRespuestaActiva(null);
      } else {
        console.error("Error al crear la respuesta");
      }
    } catch (error) {
      console.error("Error en la solicitud de creación de respuesta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-sky-700 flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold text-white mt-4">
          Foro de Emprendedores
        </h1>
        <div className="w-full p-4">
          {/* Botón Crear Conversación */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMostrarFormulario(true)}
              className="bg-green-500 font-semibold text-white text-sm p-3 rounded-lg flex justify-center items-center gap-2 hover:scale-105 duration-300"
            >
              Crea una conversación
              <ArrowRightCircleIcon className="h-6 w-6 ml-2" />
            </button>
          </div>

          {/* Modal para crear publicación */}
          {mostrarFormulario && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h3 className="text-xl font-bold mb-2">Nueva Publicación</h3>
                <input
                  type="text"
                  name="titulo"
                  placeholder="Título"
                  value={nuevoForo.titulo}
                  onChange={handleChange}
                  className="bg-gray-100 text-black border p-2 w-full mb-2 rounded"
                />
                <textarea
                  name="descripcion"
                  placeholder="Descripción"
                  value={nuevoForo.descripcion}
                  onChange={handleChange}
                  className="bg-gray-100 text-black border p-2 w-full mb-2 rounded"
                ></textarea>
                <input
                  type="text"
                  name="url_imagen"
                  placeholder="URL de la imagen"
                  value={nuevoForo.url_imagen}
                  onChange={handleChange}
                  className="bg-gray-100 text-black border p-2 w-full mb-2 rounded"
                />
                <button
                  onClick={handleCrearForo}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                >
                  Publicar
                </button>
                <button
                  onClick={() => setMostrarFormulario(false)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 ml-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Categorías */}
          <h2 className="text-2xl text-white font-bold mt-4">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {categorias.map((categoria) => (
              <div
                key={categoria.id_foro}
                onClick={() => setFiltroCategoria(categoria.id_foro)}
                className="cursor-pointer bg-white p-4 rounded-lg shadow-md text-center hover:scale-105 transform transition"
              >
                <h3 className="text-lg font-bold text-sky-700">
                  {categoria.nombre}
                </h3>
              </div>
            ))}
          </div>

          {/* Publicaciones */}
          <h2 className="text-2xl text-white font-bold mt-8">
            Publicaciones Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {isLoading ? (
              <p className="text-white text-center">Cargando publicaciones...</p>
            ) : forosDestacados?.length > 0 ? (
              forosDestacados.map((foro) => (
                <div
                  key={foro.id_publicaciones}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
                >
                  <h3 className="text-lg font-bold">{foro.titulo}</h3>
                  <p className="text-gray-700">{foro.descripcion}</p>
                  <button
                    onClick={() => fetchRespuestas
                      (foro.id_publicaciones)}
                      className="bg-blue-500 text-white p-2 rounded-lg mt-2"
                    >
                      Ver Respuestas ({respuestas[foro.id_publicaciones]?.length || 0})
                    </button>
                    <button
                      onClick={() =>
                        setRespuestaActiva(
                          respuestaActiva === foro.id_publicaciones
                            ? null
                            : foro.id_publicaciones
                        )
                      }
                      className="bg-green-500 text-white p-2 rounded-lg mt-2"
                    >
                      {respuestaActiva === foro.id_publicaciones
                        ? "Ocultar Respuesta"
                        : "Responder"}
                    </button>
  
                    {respuestaActiva === foro.id_publicaciones && (
                      <>
                        <textarea
                          placeholder="Escribe tu respuesta"
                          value={nuevaRespuesta}
                          onChange={(e) => setNuevaRespuesta(e.target.value)}
                          className="bg-gray-100 text-black border p-2 w-full mt-2 rounded"
                        ></textarea>
                        <button
                          onClick={() =>
                            handleCrearRespuesta(foro.id_publicaciones)
                          }
                          className="bg-blue-500 text-white p-2 rounded-lg mt-2"
                        >
                          Enviar Respuesta
                        </button>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-white text-center">No hay publicaciones disponibles</p>
              )}
            </div>
  
            {/* Paginación */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
                disabled={pagina === 1}
                className="bg-sky-500 text-white p-2 rounded-lg mr-2"
              >
                Anterior
              </button>
              <span className="text-white mx-2">Página {pagina}</span>
              <button
                onClick={() => setPagina((prev) => prev + 1)}
                disabled={pagina === totalPaginas}
                className="bg-sky-500 text-white p-2 rounded-lg ml-2"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  