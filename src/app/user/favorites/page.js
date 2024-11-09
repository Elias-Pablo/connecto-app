"use client"
import { CartProvider } from "@/app/context/CartContext";
import Header from "@/components/Header-us";
import React, { useState, useEffect } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/user/favorites");
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favorites); // Los datos de los favoritos se actualizan desde la base de datos
        } else {
          console.error("Error al obtener los productos favoritos");
        }
      } catch (error) {
        console.error("Error en la solicitud para obtener favoritos:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFromFavorites = async (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId)
    );

    // Enviar la solicitud para eliminar el producto de favoritos en la base de datos
    try {
      const response = await fetch(`/api/user/favorites/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Error al eliminar el producto de favoritos en la base de datos");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminar de favoritos:", error);
    }
  };

  return (
    <CartProvider>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen text-center">
        <h1 className="text-2xl font-bold mb-4 text-black">Mis Favoritos</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-600">No tienes productos en tu lista de favoritos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">${product.price}</p>
                <button
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => handleRemoveFromFavorites(product.id)}
                >
                  Quitar de Favoritos
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </CartProvider>
  );
};

export default FavoritesPage;
