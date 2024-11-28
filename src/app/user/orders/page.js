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
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="mb-4 border-b pb-2">
                <p>
                  <strong>Pedido ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Productos:</strong>{" "}
                  {order.items
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(", ")}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
