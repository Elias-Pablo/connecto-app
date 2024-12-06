"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header-em";
import { HandThumbUpIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export default function Foro() {
  const [categorias, setCategorias] = useState([]);
  const [forosDestacados, setForosDestacados] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nuevoForo, setNuevoForo] = useState({
    titulo: "",
    descripcion: "",
    id_foro: "",
  });
  const [respuestaActiva, setRespuestaActiva] = useState(null);
  const [nuevaRespuesta, setNuevaRespuesta] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtroCategoria, setFiltroCategoria] = useState(null);

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
        const queryParams = new URLSearchParams({
          page: pagina,
          ...(filtroCategoria && { categoria: filtroCategoria }),
        }).toString();
        const response = await fetch(`/api/auth/foro?type=publicaciones&${queryParams}`);
        if (!response.ok) throw new Error("Error al cargar publicaciones");
        const data = await response.json();
        setForosDestacados(data.publicaciones || []);
        setTotalPaginas(data.totalPaginas || 1);
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
  const handleCrearForo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuario no autorizado. Faltan credenciales.");

      const response = await fetch("/api/auth/foro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: nuevoForo.titulo,
          descripcion: nuevoForo.descripcion,
          id_foro: filtroCategoria,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setForosDestacados([...forosDestacados, { ...nuevoForo, id: data.id }]);
        setMostrarFormulario(false);
        setNuevoForo({ titulo: "", descripcion: "", id_foro: "" });
      } else {
        console.error("Error al crear la publicación");
      }
    } catch (error) {
      console.error("Error en la solicitud de creación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener respuestas
  const fetchRespuestas = async (id_publicaciones) => {
    try {
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
      if (!token) throw new Error("Usuario no autorizado. Faltan credenciales.");

      const response = await fetch("/api/auth/foro/respuestas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_publicaciones, respuesta: nuevaRespuesta }),
      });

      if (response.ok) {
        await fetchRespuestas(id_publicaciones);
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
      if (!token) throw new Error("Usuario no autorizado. Faltan credenciales.");

      const response = await fetch("/api/auth/foro/reacciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_publicaciones, tipo }),
      });

      if (response.ok) {
        console.log("Reacción registrada exitosamente.");
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

  return (
    <>
      <Header />
      <div className="bg-sky-700 flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold text-white mt-4">Foro de Emprendedores</h1>
        <div className="w-full p-4">
            {/* Botón para abrir formulario de creación */}
            <button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="bg-green-500 text-white p-2 rounded-lg mb-4"
            >
              {mostrarFormulario ? "Cerrar Formulario" : "Crear Publicación"}
            </button>
            {/* Formulario para crear publicación */}
            {mostrarFormulario && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Nueva Publicación</h2>
                <input
                  type="text"
                  name="titulo"
                  placeholder="Título"
                  value={nuevoForo.titulo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-2"
                />
                <textarea
                  name="descripcion"
                  placeholder="Descripción"
                  value={nuevoForo.descripcion}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-2"
                ></textarea>
                <button
                  onClick={handleCrearForo}
                  className="bg-blue-500 text-white p-2 rounded-lg mt-4"
                >
                  Publicar
                </button>
              </div>
            )}
            {/* Filtros por categoría */}
            <h2 className="text-2xl text-white font-bold mt-8">Categorías</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <button
                onClick={() => setFiltroCategoria(null)}
                className={`cursor-pointer p-4 rounded-lg shadow-md text-center ${
                  !filtroCategoria ? "bg-green-500 text-white" : "bg-white text-sky-700"
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
            <h2 className="text-2xl text-white font-bold mt-8">Publicaciones Destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {forosDestacados.map((foro) => (
                <div key={foro.id_publicaciones} className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold">{foro.titulo}</h3>
                  <p className="text-gray-700">{foro.descripcion}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    {/* Reacciones */}
                    <button
                      onClick={() => handleReaccionar(foro.id_publicaciones, "me gusta")}
                      className="flex items-center text-blue-500"
                    >
                      <HandThumbUpIcon className="h-5 w-5" /> 
                      <span className="ml-1">{foro.meGusta || 0}</span>
                    </button>
                    <button
                      onClick={() => handleReaccionar(foro.id_publicaciones, "útil")}
                      className="flex items-center text-green-500"
                    >
                      <LightBulbIcon className="h-5 w-5" /> 
                      <span className="ml-1">{foro.util || 0}</span>
                    </button>
                    {/* Ver Respuestas */}
                    <button
                      onClick={() => fetchRespuestas(foro.id_publicaciones)}
                      className="bg-yellow-500 text-white p-2 rounded-lg"
                    >
                      Ver Respuestas ({foro.total_respuestas || 0})
                    </button>
                    {/* Responder */}
                    <button
                      onClick={() => setRespuestaActiva(foro.id_publicaciones)}
                      className="bg-yellow-500 text-white p-2 rounded-lg"
                    >
                      Responder
                    </button>
                  </div>
                  {/* Mostrar respuestas */}
                  {respuestas[foro.id_publicaciones] && (
                    <div className="mt-4">
                      {respuestas[foro.id_publicaciones].map((respuesta) => (
                        <div
                          key={respuesta.id_respuesta}
                          className="bg-gray-100 p-2 rounded-lg shadow-md"
                        >
                          <p className="text-gray-700">{respuesta.respuesta}</p>
                          <small className="text-gray-500">{respuesta.nombre_usuario}</small>
                        </div>
                      ))}
                    </div>
                  )}
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
                        onClick={() => handleCrearRespuesta(foro.id_publicaciones)}
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
            {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((num) => (
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
            ))}
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