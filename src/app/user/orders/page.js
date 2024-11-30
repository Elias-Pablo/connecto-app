"use client";
import Header from "@/components/Header-us";
import { useEffect, useState } from "react";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          console.error("Error al cargar los pedidos");
        }
      } catch (err) {
        console.error("Error en la solicitud:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-5">Mis Pedidos</h1>
        {isLoading ? (
          <p>Cargando pedidos...</p>
        ) : orders.length === 0 ? (
          <p>No tienes pedidos registrados.</p>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => (
              <li
                key={order.id_compra}
                className="border p-6 rounded-lg shadow-md bg-white"
              >
                <p className="font-bold text-lg mb-2">
                  Pedido ID: {order.id_compra}
                </p>
                <p className="mb-2">
                  <strong>Fecha:</strong>{" "}
                  {new Date(
                    order.fecha_creacion.replace(" ", "T")
                  ).toLocaleDateString("es-CL", {
                    hour: "numeric",
                    minute: "numeric",
                    year: "numeric",
                    month: "long",
                    day: "numeric",

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
                        {" - "}
                        <span className="text-gray-600">
                          ${item.precio_unitario}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
