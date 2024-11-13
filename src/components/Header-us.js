import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { jwtDecode } from "jwt-decode"; // Cambiado a jwt_decode para evitar errores de importación
import { useRouter } from "next/navigation";
import { useCart } from "../../src/app/context/CartContext";

export default function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState("/avatar.jpg");

  const [cartVisible, setCartVisible] = useState(false);
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
  } = useCart();
  const toggleCart = () => setCartVisible(!cartVisible);

  // Efecto para recuperar y decodificar el token desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token recuperado:", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; Path=/;";
    setUser(null);
    router.push("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (user) {
      const fetchUserAvatar = async () => {
        try {
          const response = await fetch("/api/userAvatar");
          if (response.ok) {
            const data = await response.json();
            setProfilePicture(data.profilePicture || "/avatar.jpg");
          } else {
            console.error("Error al obtener la imagen de perfil");
          }
        } catch (error) {
          console.error("Error en la solicitud de imagen de perfil:", error);
        }
      };
      fetchUserAvatar();
    }
  }, [user]);

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
              className="drop-shadow-sm cursor-pointer"
            />
          </Link>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center">
                <Link
                  href="/user/profile"
                  className="flex justify-center items-center gap-2"
                  passHref
                >
                  <img
                    src={profilePicture || "/avatar.jpg"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />

                  <span className="text-white font-semibold mr-4">
                    {user.username}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Cerrar Sesión
                </button>

                {/* Menu de hamburguesa */}
                <button
                  onClick={toggleMenu}
                  className="text-white ml-4 p-2 rounded-md hover:bg-fuchsia-700 transition-colors duration-300"
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
                    className="feather feather-menu"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute top-16 right-6 bg-white rounded-md shadow-lg p-4 w-40 z-20">
                    <Link href="/user/orders" passHref>
                      <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                        Pedidos
                      </p>
                    </Link>
                    <Link href="/user/favorites" passHref>
                      <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                        Favoritos
                      </p>
                    </Link>
                    <Link href="/user/profile" passHref>
                      <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                        Perfil
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/emregister"
                  className="text-xs md:text-base text-sky-300 hover:text-sky-500 py-2 mr-4 font-bold"
                >
                  Registrar mi negocio
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-fuchsia-600 px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white mr-2 hover:bg-fuchsia-900 transition-colors"
                >
                  Regístrate
                </Link>
                <Link
                  href="/auth/login"
                  className="bg-sky-400 px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white hover:bg-sky-700 transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </>
            )}
            <button
              onClick={toggleCart}
              className="ml-2 bg-green-400 px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white hover:bg-green-700 transition-colors"
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
                className="icon icon-tabler icon-tabler-shopping-cart"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19a2 2 0 1 0 4 0 2 2 0 1 0 -4 0" />
                <path d="M17 19a2 2 0 1 0 4 0 2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {cartVisible && (
        <div className="fixed z-20 right-0 top-0 w-full sm:w-1/3 h-full bg-white shadow-lg p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform rounded-xl translate-x-0 border border-neutral-400">
          <h2 className="text-xl text-black font-bold mb-4 flex justify-center items-center gap-2">
            Carrito de Compras
          </h2>
          {cartItems.length > 0 ? (
            <ul className="text-black space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="mr-4"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Precio: ${item.price}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-gray-300 px-2 py-1 rounded"
                        >
                          +
                        </button>
                        <span className="bg-gray-100 px-4 py-1 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="bg-gray-300 px-2 py-1 rounded"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Tu carrito está vacío.</p>
          )}
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
          </div>
          <button className="mt-4 w-full bg-green-500 px-4 py-2 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out">
            Proceder al Pago
          </button>
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
