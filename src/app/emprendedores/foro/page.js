"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header-em";
import Image from "next/image";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function Foro() {
  const [categorias, setCategorias] = useState([]);
  const [forosDestacados, setForosDestacados] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoForo, setNuevoForo] = useState({
    titulo: "",
    descripcion: "",
    id_foro: "",
    id_usuario: 1, // Ajusta según el usuario actual
    url_imagen: "", // Añadimos el campo de URL de la imagen
  });

  // Obtener categorías desde la tabla `foro`
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/api/auth/foro?type=categorias");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Obtener publicaciones del foro
  useEffect(() => {
    const fetchForosDestacados = async () => {
      try {
        const response = await fetch("/api/auth/foro?type=publicaciones");
        const data = await response.json();
        setForosDestacados(data);
      } catch (error) {
        console.error("Error al obtener publicaciones destacadas:", error);
      }
    };

    fetchForosDestacados();
  }, []);

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
    }
  };

  return (
    <>
      <Header />
      <div className="bg-sky-700 flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold text-white mt-4">
          Foro de Emprendedores
        </h1>
        <div className="w-full">
          <div className="bg-white p-4 rounded-lg m-4 shadow-lg">
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                className="bg-green-500 font-semibold text-white text-sm p-3 rounded-lg flex justify-center items-center gap-2 hover:scale-105 duration-300"
              >
                Crea una conversación
                <ArrowRightCircleIcon className="h-6 w-6 ml-2" />
              </button>
              <button className="bg-blue-400 p-3 rounded-lg text-sm font-semibold text-white flex justify-center hover:scale-105 duration-300 items-center gap-2">
                Administra tus conversaciones
                <ArrowRightCircleIcon className="h-6 w-6 ml-2" />
              </button>
            </div>

            {mostrarFormulario && (
              <div className="bg-blue-500 p-4 rounded-lg mt-4">
                <h3 className="text-xl font-bold mb-2">Nueva Publicación</h3>
                <input
                  type="text"
                  name="titulo"
                  placeholder="Título"
                  value={nuevoForo.titulo}
                  onChange={handleChange}
                  className="bg-white text-black border p-2 w-full mb-2"
                />
                <textarea
                  name="descripcion"
                  placeholder="Descripción"
                  value={nuevoForo.descripcion}
                  onChange={handleChange}
                  className="bg-white text-black border p-2 w-full mb-2"
                ></textarea>
                <select
                  name="id_foro"
                  value={nuevoForo.id_foro}
                  onChange={handleChange}
                  className="bg-white text-black border p-2 w-full mb-2"
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id_foro} value={categoria.id_foro}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="url_imagen" // Campo para la URL de la imagen
                  placeholder="URL de la imagen"
                  value={nuevoForo.url_imagen}
                  onChange={handleChange}
                  className="bg-white text-black border p-2 w-full mb-2"
                />
                <button
                  onClick={handleCrearForo}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                >
                  Publicar
                </button>
              </div>
            )}

            <h2 className="text-2xl text-black font-bold mt-4">Categorías</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {categorias.map((categoria) => (
                <div
                  key={categoria.id_foro}
                  className="bg-fuchsia-700 p-3 flex items-center justify-center rounded-lg shadow-lg cursor-pointer hover:scale-95 duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mr-3">
                    {categoria.nombre}
                  </h3>
                </div>
              ))}
            </div>

            <h2 className="text-2xl text-black font-bold mt-4">
              Publicaciones Destacadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {forosDestacados.map((foro) => (
                <div
                  key={foro.id_publicaciones}
                  className="bg-sky-300 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-sky-400 duration-300 flex justify-between items-center"
                >
                  <img
                    src={foro.url_imagen || "/placeholder.webp"}
                    width={200}
                    height={70}
                    alt={foro.titulo}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mt-2 text-black">
                      {foro.titulo}
                    </h3>
                    <p className="text-sm text-black">{foro.descripcion}</p>
                    <p className="text-xs text-black italic mt-4">
                      Autor: {foro.id_usuario}
                    </p>
                  </div>
                  <ArrowRightCircleIcon className="h-20 w-20 ml-auto text-black hover:text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
