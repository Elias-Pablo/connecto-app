import { useState, useEffect } from "react";

export default function Reseñas({ id, type }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/${type}?id_${type}=${id}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews);
        } else {
          console.error("Error al obtener reseñas");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    fetchReviews();
  }, [id, type]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8 w-full lg:w-2/3 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-fuchsia-800">Reseñas</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.id_review}
            className="bg-white p-4 mb-4 rounded-lg shadow-md"
          >
            <p className="text-sm text-gray-600">
              Usuario:{" "}
              <span className="font-semibold text-black">
                {review.username}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Fecha:{" "}
              <span className="font-semibold text-black">
                {new Date(review.fecha_creacion).toLocaleDateString()}
              </span>
            </p>
            <p className="mt-2 text-yellow-500">
              {Array.from({ length: review.calificacion }).map((_, index) => (
                <span key={index}>&#9733;</span>
              ))}
            </p>
            <p className="mt-4 text-gray-700">{review.comentario}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">No hay reseñas disponibles.</p>
      )}
    </div>
  );
}
