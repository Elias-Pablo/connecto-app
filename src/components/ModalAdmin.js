import { useState } from "react";
import { toast } from "react-toastify";

const ModalAdmin = ({ misPublicaciones, onClose, onEdit, onDelete }) => {
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null); // Publicación seleccionada para eliminar

  const abrirModalEditar = (pub) => {
    setPublicacionSeleccionada(pub);
    setTitulo(pub.titulo);
    setDescripcion(pub.descripcion);
  };

  const cerrarModalEditar = () => {
    setPublicacionSeleccionada(null);
    setTitulo("");
    setDescripcion("");
  };

  const handleGuardarCambios = () => {
    if (!titulo || !descripcion) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    // Verificar si realmente hay cambios
    if (
      titulo === publicacionSeleccionada.titulo &&
      descripcion === publicacionSeleccionada.descripcion
    ) {
      toast.info("No se detectaron cambios en la publicación.");
      cerrarModalEditar();
      return;
    }

    onEdit({
      id_publicaciones: publicacionSeleccionada.id_publicaciones,
      titulo,
      descripcion,
    });

    toast.success("Publicación actualizada exitosamente.");
    cerrarModalEditar(); // Cierra el modal después de guardar
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      onDelete(confirmDelete); // Llamar a la función de eliminación
      toast.success("Publicación eliminada exitosamente.");
      setConfirmDelete(null); // Cerrar el modal de confirmación
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
        <h2 className="text-xl font-bold mb-4">Administrar Publicaciones</h2>
        <button
          onClick={onClose}
          className="bg-red-500 text-white p-2 rounded-lg absolute top-4 right-4"
        >
          ✕
        </button>
        {misPublicaciones.length === 0 ? (
          <p className="text-gray-500">No tienes publicaciones aún.</p>
        ) : (
          <ul className="space-y-4">
            {misPublicaciones.map((pub) => (
              <li
                key={pub.id_publicaciones}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{pub.titulo}</h3>
                  <p>{pub.descripcion}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => abrirModalEditar(pub)}
                    className="bg-green-500 text-white p-2 rounded-lg flex items-center"
                  >
                    🖉 Editar
                  </button>
                  <button
                    onClick={() => setConfirmDelete(pub.id_publicaciones)}
                    className="bg-red-500 text-white p-2 rounded-lg flex items-center"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Modal de confirmación para eliminar */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
              <h3 className="text-xl font-bold mb-4">Confirmar Eliminación</h3>
              <p className="mb-4">¿Estás seguro de que deseas eliminar esta publicación?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  Sí, Eliminar
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="bg-gray-500 text-white p-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de edición */}
        {publicacionSeleccionada && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
              <button
                onClick={cerrarModalEditar}
                className="bg-red-500 text-white p-2 rounded-lg absolute top-4 right-4"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Editar Publicación</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nuevo título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Nueva descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleGuardarCambios}
                  className="bg-green-500 text-white p-2 rounded-lg"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={cerrarModalEditar}
                  className="bg-gray-500 text-white p-2 rounded-lg ml-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalAdmin;
