"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/components/Searchbar";
import Header from "@/components/Header-us";
import SearchedProducts from "@/components/Searched-Products";
import { useCart, CartProvider } from "../../src/app/context/CartContext";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const router = useRouter();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token recuperado:", token);

    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const userId = user?.userId;

  const handleFAQClick = () => {
    router.push("/emprendedores/faq");
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/products?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setSearchedProducts(data.products);
      } else {
        console.error("Error al buscar productos");
      }
    } catch (error) {
      console.error("Error en la solicitud de búsqueda:", error);
    }
  };

  const handleAddToFavorites = async (product) => {
    // Añadir a los favoritos en el estado
    setFavorites((prevFavorites) => [...prevFavorites, product]);

    // Enviar la solicitud para guardar el producto en la base de datos
    try {
      const response = await fetch(`/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: product.id }),
      });

      if (!response.ok) {
        console.error(
          "Error al agregar producto a favoritos en la base de datos"
        );
      }
    } catch (error) {
      console.error("Error en la solicitud de agregar a favoritos:", error);
    }
  };

  const handleRemoveFromFavorites = async (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId)
    );

    // Enviar la solicitud para eliminar el producto de favoritos en la base de datos
    try {
      const response = await fetch(
        `/api/favorites/${productId}?userId=${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.error(
          "Error al eliminar el producto de favoritos en la base de datos"
        );
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminar de favoritos:", error);
    }
  };

  const profiles = [
    { image: "/imagenpromo.jpeg", name: "Nombre 1", profession: "Profesión 1" },
    { image: "/imagenpromo.jpeg", name: "Nombre 2", profession: "Profesión 2" },
    { image: "/imagenpromo.jpeg", name: "Nombre 3", profession: "Profesión 3" },
    { image: "/imagenpromo.jpeg", name: "Nombre 4", profession: "Profesión 4" },
  ];

  const FAQ = [
    {
      question: "¿Qué es ConnecTo y cómo funciona?",
      answer:
        "ConnecTo es una plataforma que facilita la conexión entre emprendedores y clientes mediante perfiles personalizados, productos destacados y planes de suscripción.",
    },
    {
      question: "¿Es ConnecTo fácil de usar?",
      answer:
        "Sí, ConnecTo está diseñado para ser accesible y fácil de usar. La plataforma proporciona una navegación sencilla con secciones claramente definidas.",
    },
  ];

  const ProductSection = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch("/api/products");
          if (response.ok) {
            const data = await response.json();
            setProducts(data.products);
          } else {
            console.error("Error al cargar productos");
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      };

      fetchProducts();
    }, []);

    const formatPrice = (price) => {
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
      }).format(price);
    };

    const handleInteraction = async (type, id_perfil, id_producto) => {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Decodificar el token para extraer el `userId`
      const { userId } = jwtDecode(token);

      try {
        await fetch("/api/interactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId, // Incluye el usuario que realiza la interacción
            tipo_interaccion: type,
            id_perfil,
            id_producto,
          }),
        });
        console.log(`Interacción de tipo ${type} registrada con éxito.`);
      } catch (error) {
        console.error("Error al registrar la interacción:", error);
      }
    };

    return (
      <section className="bg-white p-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-5 text-center text-black">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-300 p-5 rounded-lg shadow-lg text-center flex flex-col items-center justify-around"
              >
                <img
                  src={product.image || "/placeholder.webp"}
                  width={250}
                  height={100}
                  className="rounded-lg drop-shadow-md"
                  alt={product.name}
                />
                <h3 className="text-lg font-semibold mt-2 text-black">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {formatPrice(product.price)}
                </p>

                <p className="text-sm text-black">{product.description}</p>
                <div className="flex flex-col space-y-2 mt-2">
                  <p className="text-xs text-gray-500 my-2">
                    Vendedor:{" "}
                    <Link
                      href={`/user/emprendedores/profile?id_perfil=${product.id_perfil}`}
                      className="text-sky-500"
                      onClick={() =>
                        handleInteraction("View", product.id_perfil, null)
                      }
                    >
                      {product.businessName}
                    </Link>
                  </p>
                  <button
                    onClick={() => {
                      handleInteraction("Click", product.id_perfil, product.id); // Registrar interacción
                      addToCart(product);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Agregar al Carrito
                  </button>
                  <button
                    onClick={() =>
                      favorites.some((fav) => fav.id === product.id)
                        ? handleRemoveFromFavorites(product.id)
                        : handleAddToFavorites(product)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    {favorites.some((fav) => fav.id === product.id)
                      ? "Eliminar de Favoritos"
                      : "Agregar a Favoritos"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const ProfileSection = () => {
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
      const fetchProfiles = async () => {
        try {
          const response = await fetch(`/api/user/emprendedores`);
          if (response.ok) {
            const data = await response.json();
            console.log("Datos de los perfiles recibidos:", data);
            setProfileData(data.perfiles); // Guardamos todos los perfiles
          } else {
            console.error("Error al cargar los perfiles de emprendedores");
          }
        } catch (error) {
          console.error("Error en la solicitud de los perfiles:", error);
        }
      };

      fetchProfiles();
    }, []);

    return (
      <section className="p-10 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-5 text-center text-black">
            Perfiles de Emprendedores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {profileData.map((profile) => (
              <div
                key={profile.id}
                className="text-center p-5 bg-gray-100 rounded-lg shadow-md"
              >
                <div className="cursor-pointer hover:opacity-80 transition-opacity duration-300 inline-block">
                  <div className="w-32 h-32 mx-auto rounded-full shadow-lg overflow-hidden hover:scale-105 duration-300">
                    <img
                      src={profile.idImagen || "/placeholder.webp"}
                      width={128}
                      height={128}
                      alt={profile.nombreNegocio}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-black mt-2">
                    {profile.nombreNegocio}
                  </h3>
                  <p className="text-sm text-black">{profile.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  const FAQSection = () => {
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const handleToggleAnswer = (index) => {
      setExpandedQuestion(expandedQuestion === index ? null : index);
    };
  };
  return (
    <CartProvider>
      <Header />
      <section className="w-full h-full flex flex-col items-center justify-center p-5 bg-sky-400">
        <h1 className="p-5 text-2xl font-semibold text-white text-center">
          Busca lo que quieres de nuestros emprendedores...
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar onSearch={handleSearch} />
        </Suspense>
        {searchedProducts.length > 0 && (
          <SearchedProducts products={searchedProducts} />
        )}
      </section>
      <ProductSection />
      <ProfileSection />
      <FAQSection />
    </CartProvider>
  );
}
