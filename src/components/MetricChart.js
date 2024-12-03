"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jwt from "jsonwebtoken";

export default function MetricChart() {
  const [metrics, setMetrics] = useState({
    daily: { views: [], purchases: [] },
    weekly: { views: [], purchases: [] },
    monthly: { views: [], purchases: [] },
  });
  const [period, setPeriod] = useState("daily");
  const [idPerfil, setIdPerfil] = useState(null);

  // Obtener el token JWT y decodificarlo
  useEffect(() => {
    const token = localStorage.getItem("token"); // Leer el token desde localStorage (como en otros lugares de tu proyecto)
    if (token) {
      try {
        const decoded = jwt.decode(token); // Decodificar el payload del token
        if (decoded && decoded.id_perfil) {
          setIdPerfil(decoded.id_perfil); // Extraer el id_perfil
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

  // Fetch metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      const token = localStorage.getItem("token"); // Leer el token desde localStorage
      if (!idPerfil) return; // Esperar a que el id_perfil esté disponible

      try {
        const response = await fetch(
          `/api/metrics?period=${period}&id_perfil=${idPerfil}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Enviar el token como header de autorización
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMetrics(data.metrics);
        } else {
          console.error("Error al obtener métricas");
        }
      } catch (error) {
        console.error("Error en la solicitud de métricas:", error);
      }
    };

    fetchMetrics();
  }, [period, idPerfil]);

  const periodLabels = {
    daily: metrics.daily.views.map((data) => data.fecha),
    weekly: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    monthly: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ],
  };
  
  const chartData = {
    labels: periodLabels[period],
    datasets: [
      {
        label: "Visitas al Perfil",
        data: metrics[period]?.views.map((item) => item.total) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Compras de Productos",
        data: metrics[period]?.purchases.map((item) => item.total) || [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: period === "daily" ? "Días" : period === "weekly" ? "Semanas" : "Meses",
        },
      },
      y: { title: { display: true, text: "Cantidad" } },
    },
  };

  if (!idPerfil) {
    return <p>Cargando métricas...</p>; // Mostrar un mensaje mientras se obtiene el id_perfil
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Selector de Período */}
      <div className="mb-4 flex justify-center space-x-4">
        {["daily", "weekly", "monthly"].map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-lg transition ${
              period === key
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setPeriod(key)}
          >
            {key === "daily" ? "Diario" : key === "weekly" ? "Semanal" : "Mensual"}
          </button>
        ))}
      </div>
      {/* Gráfico */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
