"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function MetricChart() {
  const [metricsData, setMetricsData] = useState([]);
  const [period, setPeriod] = useState("daily");

  useEffect(() => {
    const fetchMetricsData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token no encontrado");
          return;
        }

        const response = await fetch(`/api/metrics`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const { metrics } = await response.json();
          setMetricsData(metrics);
        } else {
          console.error("Error al obtener datos de métricas");
        }
      } catch (error) {
        console.error("Error al obtener métricas:", error);
      }
    };

    fetchMetricsData();
  }, []);

  const periodLabels = {
    daily: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    weekly: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    monthly: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  };

  const chartData = {
    labels: periodLabels[period],
    datasets: [
      {
        label: "Visitas",
        data: metricsData[period]?.visits || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Ventas",
        data: metricsData[period]?.sales || [],
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
      x: { title: { display: true, text: period === "daily" ? "Días" : period === "weekly" ? "Semanas" : "Meses" } },
      y: { title: { display: true, text: "Cantidad" } },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Selector de Período */}
      <div className="mb-4 flex justify-center space-x-4">
        {["daily", "weekly", "monthly"].map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-lg ${
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
