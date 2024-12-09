import { useState } from "react";
import { toast } from "react-toastify";

const ModalCrearPublicacion = ({ onClose, categorias, onSubmit }) => {
  const [nuevoForo, setNuevoForo] = useState({
    titulo: "",
    descripcion: "",
    id_foro: "",
    url_imagen: "",
  });

  const handleChange = (e) => {
    setNuevoForo({
      ...nuevoForo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!nuevoForo.titulo || !nuevoForo.descripcion || !nuevoForo.id_foro) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }
    onSubmit(nuevoForo); // Enviar datos al padre
    toast.success("Publicación creada exitosamente.");
    setNuevoForo({ titulo: "", descripcion: "", id_foro: "", url_imagen: "" });
    onClose(); // Cerrar modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
        <button
          onClick={onClose}
          className="bg-red-500 text-white p-2 rounded-lg absolute top-4 right-4"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Crear Nueva Publicación</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="titulo"
            placeholder="Título de la publicación"
            value={nuevoForo.titulo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={nuevoForo.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
          <select
            name="id_foro"
            value={nuevoForo.id_foro}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_foro} value={categoria.id_foro}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="url_imagen"
            placeholder="URL de la imagen (opcional)"
            value={nuevoForo.url_imagen}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2 rounded-lg"
          >
            Publicar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded-lg ml-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearPublicacion;
