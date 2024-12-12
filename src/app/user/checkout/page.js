"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header-us";

export default function Checkout() {
  const {
    cartItems,
    setCartItems, // <-- Importamos setCartItems
    calculateTotal,
    removeFromCart,
    decreaseQuantity,
    addToCart,
  } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Sincronizar el carrito desde localStorage al cargar la página
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart); // Sincronizamos el carrito con los datos del storage
      setIsLoading(false);
    } else {
      setIsLoading(false); // No hay carrito almacenado
    }
  }, [setCartItems]);

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      alert("Tu carrito está vacío. Redirigiendo a la tienda...");
      router.push("/");
    }
  }, [cartItems, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
        <style jsx>{`
          .loader {
            border: 8px solid #f3f3f3;
            border-radius: 50%;
            border-top: 8px solid #3498db;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  const handleConfirmPurchase = async () => {
    try {
      router.push("/user/secure/payment");
    } catch (error) {
      console.error("Error en la confirmación de la compra:", error);
    }
  };

  const handleRemoveItem = (productId) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("¿Estás seguro de que deseas eliminar este producto?")
    ) {
      removeFromCart(productId);
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
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Carrito de Compras
        </h1>
        <div className="flex lg:flex-row gap-8">
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow mb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images[0] || "/placeholder.webp"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
            <button
              onClick={handleConfirmPurchase}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Ir a pagar →
            </button>
            <button
              onClick={() => router.push("/")}
              className="mt-2 w-full text-blue-500 py-2 rounded hover:underline"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
