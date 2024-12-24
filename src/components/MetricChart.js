'use client'

import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import jwt from 'jsonwebtoken'

export default function MetricChart() {
  const [metrics, setMetrics] = useState([])
  const [period, setPeriod] = useState('daily')
  const [idPerfil, setIdPerfil] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwt.decode(token)
        if (decoded && decoded.id_perfil) {
          setIdPerfil(decoded.id_perfil)
        } else {
          console.error('El token no contiene un id_perfil válido.')
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error)
      }
    } else {
      console.error('No se encontró el token en localStorage.')
    }
  }, [])

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!idPerfil) return

      const url = `/api/metrics?period=${period}&id_perfil=${idPerfil}&page=${currentPage}`
      try {
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          console.log('Datos obtenidos:', data) // Añade este console.log
          if (period === 'daily') {
            setMetrics(data.metrics.daily)
            setTotalPages(data.totalPages)
          } else {
            setMetrics(data.metrics[period]) // Semanal y mensual
          }
        } else {
          console.error('Error al obtener métricas')
        }
      } catch (error) {
        console.error('Error en la solicitud de métricas:', error)
      }
    }

    fetchMetrics()
  }, [period, idPerfil, currentPage])

  const chartData = {
    labels: metrics.map((data) => data.fecha),
    datasets: [
      {
        label: 'Visitas al Perfil',
        data: metrics.map((item) => item.views),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Compras de Productos',
        data: metrics.map((item) => item.purchases),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        title: {
          display: true,
          text:
            period === 'daily'
              ? 'Días'
              : period === 'weekly'
                ? 'Semanas'
                : 'Meses',
        },
      },
      y: {
        title: { display: true, text: 'Cantidad' },
      },
    },
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Selector de Período */}
      <div className="mb-4 flex justify-center space-x-4">
        {['daily', 'weekly', 'monthly'].map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-lg transition ${
              period === key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => {
              setPeriod(key)
              setCurrentPage(1) // Reiniciar la página al cambiar el periodo
            }}
          >
            {key === 'daily'
              ? 'Diario'
              : key === 'weekly'
                ? 'Semanal'
                : 'Mensual'}
          </button>
        ))}
      </div>

      {/* Paginación solo para diarios */}
      {period === 'daily' && (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>
          <p>
            Página {currentPage} de {totalPages}
          </p>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Gráfico */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}
