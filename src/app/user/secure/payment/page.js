"use client";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Header from "@/components/Header-us";

export default function PaymentPage() {
  const { cartItems, calculateTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit"); // Método predeterminado
  const [shippingMethod, setShippingMethod] = useState("standard"); // Método de envío predeterminado
  const router = useRouter();

  const handlePayment = async () => {
    const total = calculateTotal();

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          paymentDetails: { method: paymentMethod, total },
          shippingDetails: { method: shippingMethod },
        }),
      });

      if (response.ok) {
        alert("Pago realizado con éxito.");
        router.push("/user/orders");
      } else {
        alert("Error al procesar el pago.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Ocurrió un error al procesar el pago.");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-10 px-4 lg:px-20">
        <h1 className="text-2xl font-bold mb-8">Formulario de Pago</h1>
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Información de contacto y envío */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Información de contacto</h2>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full border p-3 rounded mb-2"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Información de envío</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border p-3 rounded"
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  className="border p-3 rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Dirección"
                className="w-full border p-3 rounded mt-2"
              />
              <input
                type="text"
                placeholder="Ciudad"
                className="w-full border p-3 rounded mt-2"
              />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <input
                  type="text"
                  placeholder="Código postal"
                  className="border p-3 rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Teléfono"
                className="w-full border p-3 rounded mt-2"
              />
            </div>

            {/* Método de entrega */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Método de entrega</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`border p-3 rounded ${
                    shippingMethod === "standard" ? "border-blue-500" : ""
                  }`}
                  onClick={() => setShippingMethod("standard")}
                >
                  Estándar (4-10 días) - {formatPrice(4000)}
                </button>
                <button
                  className={`border p-3 rounded ${
                    shippingMethod === "express" ? "border-blue-500" : ""
                  }`}
                  onClick={() => setShippingMethod("express")}
                >
                  Exprés (2-5 días) - {formatPrice(6000)}
                </button>
              </div>
            </div>

            {/* Método de pago */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Método de pago</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`border p-3 rounded ${
                    paymentMethod === "debit" ? "border-blue-500 bg-blue-100" : ""
                  }`}
                  onClick={() => setPaymentMethod("debit")}
                >
                  Débito
                </button>
                <button
                  className={`border p-3 rounded ${
                    paymentMethod === "credit" ? "border-blue-500 bg-blue-100" : ""
                  }`}
                  onClick={() => setPaymentMethod("credit")}
                >
                  Crédito
                </button>
              </div>

              {/* Inputs de tarjeta */}
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Número de tarjeta"
                  className="w-full border p-3 rounded"
                />
                <input
                  type="text"
                  placeholder="Nombre en la tarjeta"
                  className="w-full border p-3 rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Fecha de expiración (MM/YY)"
                    className="border p-3 rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="border p-3 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border p-4 rounded">
              <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
              <ul className="space-y-3">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(Number(item.price))} x {item.quantity}
                      </p>
                    </div>
                    <p>{formatPrice(Number(item.price) * item.quantity)}</p>
                  </li>
                ))}
              </ul>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p>{formatPrice(calculateTotal())}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Envío</p>
                  <p>
                    {shippingMethod === "standard"
                      ? formatPrice(4000)
                      : formatPrice(6000)}
                  </p>
                </div>
                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>
                    {formatPrice(
                      calculateTotal() +
                        (shippingMethod === "standard" ? 4000 : 6000)
                    )}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
            >
              Confirmar pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
