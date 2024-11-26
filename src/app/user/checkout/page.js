"use client";
import { useEffect } from "react";
import { CartProvider, useCart } from "@/app/context/CartContext";

export default function Checkout() {
  const { cartItems, calculateTotal } = useCart();

  useEffect(() => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Redirigiendo a la tienda...");
      window.location.href = "/";
    }
  }, [cartItems]);

  const handleConfirmPurchase = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      if (response.ok) {
        alert("Compra realizada con éxito.");
        // Redirige a una página de confirmación o pedidos
        window.location.href = "/user/orders";
      } else {
        console.error("Error al procesar la compra");
      }
    } catch (error) {
      console.error("Error en la solicitud de compra:", error);
    }
  };

  return (
    <>
      <CartProvider>
        <div className="container mx-auto p-10">
          <h1 className="text-2xl font-bold mb-4">Página de Pago</h1>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-xl font-semibold">
              Total a pagar: ${calculateTotal().toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleConfirmPurchase}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Confirmar Compra
          </button>
        </div>
      </CartProvider>
    </>
  );
}
