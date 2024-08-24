import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Producto 1",
      price: 10.0,
      quantity: 1,
      image: "/zapato.jpg",
    },
    {
      id: 2,
      name: "Producto 2",
      price: 20.0,
      quantity: 1,
      image: "/zapato.jpg",
    },
    {
      id: 3,
      name: "Producto 3",
      price: 30.0,
      quantity: 1,
      image: "/zapato.jpg",
    },
  ]);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.19; // Assuming a 10% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <>
      <header className="bg-fuchsia-800 px-6 flex items-center justify-center">
        <div className="flex h-20 items-center justify-between w-full">
          <Link href="/">
            <Image
              src="/ConnecTo-logo-horizontal2.png"
              alt="ConnecTo Logo"
              width={250}
              height={50}
              className="drop-shadow-sm"
            />
          </Link>
          <div className="flex items-center">
            <Link
              className="px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white mr-2 hover:text-sky-400 transition-colors duration-300 ease-in-out"
              href="/emprendedores"
            >
              Registrar mi negocio
            </Link>
            <Link
              className="bg-fuchsia-600 px-4 text-xs md:text-base py-2 rounded-xl font-semibold text-white mr-2 hover:bg-fuchsia-900 transition-colors duration-300 ease-in-out"
              href="/auth/register"
            >
              Regístrate
            </Link>
            <Link
              className="bg-sky-400 px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white hover:bg-sky-700 transition-colors duration-300 ease-in-out"
              href="/auth/login"
            >
              Iniciar Sesión
            </Link>
            <button
              onClick={toggleCart}
              className="ml-2 bg-green-400 px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white hover:bg-sky-700 transition-colors duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Carrito de compras */}
      {cartVisible && (
        <div className="fixed z-20 right-0 top-0 w-full sm:w-1/3 h-full bg-white shadow-lg p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform rounded-xl translate-x-0 border border-neutral-400">
          <h2 className="text-xl text-black font-bold mb-4 flex justify-center items-center gap-2">
            Carrito de Compras{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>
          </h2>
          {cartItems.length > 0 ? (
            <ul className="text-black space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="mr-4"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Precio: ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="bg-gray-300 px-2 py-1 rounded-l"
                        >
                          -
                        </button>
                        <span className="bg-gray-100 px-4 py-1 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="bg-gray-300 px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Tu carrito está vacío.</p>
          )}

          {cartItems.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal:</p>
                <p className="font-semibold text-black">
                  ${calculateSubtotal().toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">Impuesto (19%):</p>
                <p className="font-semibold text-black">
                  ${calculateTax().toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xl font-bold text-black">Total:</p>
                <p className="text-xl font-bold text-black">
                  ${calculateTotal().toFixed(2)}
                </p>
              </div>
              <button className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out">
                Proceder al Pago
              </button>
            </div>
          )}

          <button
            onClick={toggleCart}
            className="mt-4 w-full bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out"
          >
            Cerrar
          </button>
        </div>
      )}
    </>
  );
}
