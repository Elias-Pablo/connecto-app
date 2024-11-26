"use client";
import { CartProvider, useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Checkout() {
  const { cartItems, calculateTotal, calculateSubtotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Compra exitosa:", data);

        // Redirigir a la página de confirmación
        router.push("/user/orders");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error en el proceso de pago");
      }
    } catch (err) {
      console.error("Error en el proceso de pago:", err);
      setError("Ocurrió un error al procesar el pago.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CartProvider>
        <div className="p-10">
          <h1 className="text-2xl font-bold mb-5">Revisar Compra</h1>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4 flex justify-between">
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>${calculateSubtotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Total:</p>
              <p>${calculateTotal().toFixed(2)}</p>
            </div>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <button
            onClick={handlePayment}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Proceder al Pago"}
          </button>
        </div>
      </CartProvider>
    </>
  );
}
