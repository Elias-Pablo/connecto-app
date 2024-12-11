"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Image from "next/image";
import Header from "@/components/Header-em";
import { AiOutlineFileText } from "react-icons/ai";

export default function VentasPage() {
  const [sales, setSales] = useState([]);
  const [idPerfil, setIdPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener el token y extraer `id_perfil`
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded && decoded.id_perfil) {
          setIdPerfil(decoded.id_perfil);
        } else {
          console.error("El token no contiene un id_perfil válido.");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } else {
      console.error("No se encontró el token en localStorage.");
    }
  }, []);

  // Obtener ventas del backend
  useEffect(() => {
    const fetchSales = async () => {
      if (!idPerfil) return;

      try {
        const response = await fetch(
          `/api/emprendedores/ventas?id_perfil=${idPerfil}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSales(data.ventas);
        } else {
          console.error("Error al obtener las ventas:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud de ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [idPerfil]);

  const getBorderColor = (total) => {
    if (total > 5000) return "border-green-500"; // Ventas altas
    if (total > 2000) return "border-yellow-500"; // Ventas medias
    return "border-red-500"; // Ventas bajas
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-500 font-medium">
          Cargando tus registros de ventas...
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
      <nav className="text-sm text-gray-600 mb-4">
          {" "}
          <a href="/emprendedores/profile" className="hover:underline">
            Emprendedor
          </a>{" "}
          &gt; Ventas
        </nav>
        <h1 className="text-3xl font-bold mb-6 text-center">Registro de Ventas</h1>

        {sales.length === 0 ? (
          <p className="text-center text-gray-500">
            No se encontraron ventas registradas.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sales.map((sale, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-gray-100 to-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:scale-100 duration-300 border-l-4 ${getBorderColor(
                  sale.total
                )}`}
              >
                <div className="flex items-center space-x-4 mb-4">
                <AiOutlineFileText className="text-gray-600 w-8 h-8" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {sale.producto}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  Fecha:{" "}
                  <span className="font-medium">
                    {new Date(sale.fecha).toLocaleDateString("es-ES")}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Cantidad:{" "}
                  <span className="font-medium">{sale.cantidad}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Total:{" "}
                  <span className="font-medium text-green-600">
                    {formatPrice(sale.total)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
