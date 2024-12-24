'use client'
import Header from '@/components/Header-us'
import { useEffect, useState } from 'react'

export default function UserOrders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleDownloadPDF = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/pdf`, {
        method: 'GET',
      })
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `pedido_${orderId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        console.error('Error al generar el PDF')
      }
    } catch (err) {
      console.error('Error al descargar el PDF:', err)
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const data = await response.json()
          setOrders(data.orders)
        } else {
          console.error('Error al cargar los pedidos')
        }
      } catch (err) {
        console.error('Error en la solicitud:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-5">Mis Pedidos</h1>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-500 font-medium">
              Cargando tus registros de pedidos...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <p>No tienes pedidos registrados.</p>
        ) : (
          <ul className="space-y-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {orders.map((order) => (
              <li
                key={order.id_compra}
                className="border p-6 rounded-lg shadow-md bg-white "
              >
                <p className="font-bold text-lg mb-2">
                  Pedido ID: {order.id_compra}
                </p>
                <p className="mb-2">
                  <strong>Fecha:</strong>{' '}
                  {new Date(
                    order.fecha_creacion.replace(' ', 'T')
                  ).toLocaleDateString('es-CL', {
                    hour: 'numeric',
                    minute: 'numeric',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour12: false,
                  })}
                </p>

                <p className="mb-4">
                  <strong>Total:</strong> ${order.total}
                </p>
                <div>
                  <h3 className="font-semibold mb-2">Productos del pedido:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {order.items.map((item) => (
                      <li key={item.id_detalle}>
                        {item.nombre_producto} x {item.cantidad}
                        {' - '}
                        <span className="text-gray-600">
                          ${item.precio_unitario}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleDownloadPDF(order.id_compra)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Descargar PDF
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
