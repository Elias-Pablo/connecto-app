import { useState } from "react";

export default function ReseñasForm({ id, type }) {
  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/reviews/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [`id_${type}`]: id,
          comentario,
          calificacion,
        }),
      });
      if (response.ok) {
        alert("Reseña enviada exitosamente");
        setCalificacion(5);
        setComentario("");
      } else {
        alert("Error al enviar reseña");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6 w-full lg:w-2/3 mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-fuchsia-800">
        Deja tu Reseña
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Calificación:
        </label>
        <select
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Comentario:
        </label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="block w-full h-24 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-fuchsia-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-fuchsia-700 transition duration-300"
      >
        Enviar Reseña
      </button>
    </form>
  );
}
