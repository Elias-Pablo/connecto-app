"use client";
import { CartProvider } from "@/app/context/CartContext";
import Header from "@/components/Header-us";
import React, { useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null); // Nuevo estado para almacenar userId

  useEffect(() => {
    // Obtener userId desde el token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } else {
      console.error("Token no encontrado");
    }
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/favorites?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favorites);
        } else {
          console.error("Error al obtener los productos favoritos");
        }
      } catch (error) {
        console.error("Error en la solicitud para obtener favoritos:", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleRemoveFromFavorites = async (idFavorito) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id_favorito !== idFavorito)
    );

    try {
      const response = await fetch(`/api/favorites/${idFavorito}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(
          "Error al eliminar el producto de favoritos en la base de datos"
        );
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
          <p className="text-gray-600">
            No tienes productos en tu lista de favoritos.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div
                key={product.id_favorito}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-around"
              >
                <img
                  src={product.image}
                  alt={product.nombre}
                  className="w-full h-auto object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold">{product.nombre}</h2>
                <p className="text-gray-500">{formatPrice(product.precio)}</p>
                <button
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => handleRemoveFromFavorites(product.id_favorito)}
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
