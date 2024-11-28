"use client";
import { CartProvider } from "@/app/context/CartContext";
import Header from "@/components/Header-us";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]); // Productos favoritos
  const [favoriteEntrepreneurs, setFavoriteEntrepreneurs] = useState([]); // Emprendedores favoritos
  const [userId, setUserId] = useState(null);
  const [entrepreneurPictures, setEntrepreneurPictures] = useState({}); // Imágenes de perfil de emprendedores

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

  // Fetch favoritos de productos
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

  // Fetch favoritos de emprendedores
  useEffect(() => {
    const fetchEntrepreneurFavorites = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/user/emfavorito?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setFavoriteEntrepreneurs(data.favorites);

          // Fetchear imágenes de perfil para cada emprendedor
          const pictures = {};
          for (const entrepreneur of data.favorites) {
            try {
              const avatarResponse = await fetch(
                `/api/empAvatar?id_perfil=${entrepreneur.id_perfil}`
              );
              if (avatarResponse.ok) {
                const { usuario_imagen } = await avatarResponse.json();
                pictures[entrepreneur.id_perfil] =
                  usuario_imagen || "/placeholder.webp";
              } else {
                pictures[entrepreneur.id_perfil] = "/placeholder.webp";
              }
            } catch (error) {
              console.error(
                `Error al cargar la imagen de perfil para el emprendedor ${entrepreneur.id_perfil}:`,
                error
              );
              pictures[entrepreneur.id_perfil] = "/placeholder.webp";
            }
          }
          setEntrepreneurPictures(pictures);
        } else {
          console.error("Error al obtener los emprendedores favoritos");
        }
      } catch (error) {
        console.error(
          "Error en la solicitud para obtener emprendedores favoritos:",
          error
        );
      }
    };

    fetchEntrepreneurFavorites();
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

  const handleRemoveFromEntrepreneurs = async (idFavorito) => {
    setFavoriteEntrepreneurs((prevFavorites) =>
      prevFavorites.filter((item) => item.id_favorito !== idFavorito)
    );

    try {
      const response = await fetch(
        `/api/user/emfavorito?id_favorito=${idFavorito}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.error(
          "Error al eliminar el emprendedor de favoritos en la base de datos"
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

        {favorites.length === 0 && favoriteEntrepreneurs.length === 0 ? (
          <p className="text-gray-600">
            No tienes productos o emprendedores en tu lista de favoritos.
          </p>
        ) : (
          <div className="space-y-12">
            {/* Productos favoritos */}
            {favorites.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Productos</h2>
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
                      <h2 className="text-lg font-semibold">
                        {product.nombre}
                      </h2>
                      <p className="text-gray-500">
                        {formatPrice(product.precio)}
                      </p>
                      <button
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                        onClick={() =>
                          handleRemoveFromFavorites(product.id_favorito)
                        }
                      >
                        Quitar de Favoritos
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emprendedores favoritos */}
            {favoriteEntrepreneurs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Emprendedores</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {favoriteEntrepreneurs.map((entrepreneur) => (
                    <div
                      key={entrepreneur.id_favorito}
                      className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-around"
                    >
                      <img
                        src={
                          entrepreneurPictures[entrepreneur.id_perfil] ||
                          "/placeholder.webp"
                        }
                        alt={entrepreneur.nombre_negocio}
                        className="w-24 h-24 object-cover rounded-full mb-4"
                      />
                      <h2 className="text-lg font-semibold">
                        {entrepreneur.nombre_negocio}
                      </h2>
                      <button
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                        onClick={() =>
                          handleRemoveFromEntrepreneurs(
                            entrepreneur.id_favorito
                          )
                        }
                      >
                        Quitar de Favoritos
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </CartProvider>
  );
}
