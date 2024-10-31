// app/page.js
"use client";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/components/Searchbar";
import Header from "@/components/Header-us";
import SearchedProducts from "@/components/Searched-Products";
import { useCart, CartProvider } from '../../src/app/context/CartContext';

export default function Home() {
  const router = useRouter();

  const handleFAQClick = () => {
    router.push("/emprendedores/faq");
  };

  // Datos de productos
  const products = [
    {
      image: "/imagenpromo.jpeg",
      name: "Producto 1",
      description: "Descripción 1",
      price: 10.0,
      id: 1,
    },
    {
      image: "/imagenpromo.jpeg",
      name: "Producto 2",
      description: "Descripción 2",
      price: 20.0,
      id: 2,
    },
    {
      image: "/imagenpromo.jpeg",
      name: "Producto 3",
      description: "Descripción 3",
      price: 30.0,
      id: 3,
    },
    {
      image: "/imagenpromo.jpeg",
      name: "Producto 4",
      description: "Descripción 4",
      price: 40.0,
      id: 4,
    },
  ];

  // Datos de perfiles de emprendedores
  const profiles = [
    { image: "/imagenpromo.jpeg", name: "Nombre 1", profession: "Profesión 1" },
    { image: "/imagenpromo.jpeg", name: "Nombre 2", profession: "Profesión 2" },
    { image: "/imagenpromo.jpeg", name: "Nombre 3", profession: "Profesión 3" },
    { image: "/imagenpromo.jpeg", name: "Nombre 4", profession: "Profesión 4" },
  ];

  // Datos de preguntas frecuentes
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
    // Agrega más preguntas aquí...
  ];

  // Componente de Productos Destacados con carrito de compras
  const ProductSection = () => {
    const { addToCart } = useCart();

    return (
      <section className="bg-white p-10">
        <div className="container mx-auto">
          <div className="flex ">
            <SearchedProducts />
          </div>
          <h2 className="text-2xl font-semibold mb-5 text-center text-black">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-5 rounded-lg shadow-lg text-center"
              >
                <Image
                  src={product.image}
                  width={350}
                  height={200}
                  alt={product.name}
                  layout="responsive"
                />
                <h3 className="text-lg font-semibold mt-2 text-black">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">${product.price}</p>
                <p className="text-sm text-black">{product.description}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Agregar al Carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Componente de Perfiles de Emprendedores
  const ProfileSection = () => (
    <section className="p-10 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-5 text-center text-black">
          Perfiles de Emprendedores
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profiles.map((profile, index) => (
            <div key={index} className="text-center">
              <div className="cursor-pointer hover:opacity-80 transition-opacity duration-300 inline-block">
                <div className="w-32 h-32 mx-auto rounded-full shadow-lg overflow-hidden hover:scale-105 duration-300">
                  <Image
                    src={profile.image}
                    width={128}
                    height={128}
                    alt={profile.name}
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-black mt-2">
                  {profile.name}
                </h3>
                <p className="text-sm text-black">{profile.profession}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Componente de Preguntas Frecuentes
  const FAQSection = () => {
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const handleToggleAnswer = (index) => {
      setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    return (
      <section className="p-10 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-5 text-center text-black">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {FAQ.map((faq, index) => (
              <div key={index} className="border-b border-gray-500 pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleToggleAnswer(index)}
                >
                  <h3 className="text-lg font-semibold text-black">
                    {faq.question}
                  </h3>
                  <button
                    className="text-black text-xl"
                    aria-expanded={expandedQuestion === index}
                  >
                    {expandedQuestion === index ? "-" : "+"}
                  </button>
                </div>
                {expandedQuestion === index && (
                  <p className="text-sm text-black mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-sky-400 text-white px-6 py-2 rounded-lg hover:bg-sky-500 transition-colors hover:scale-105 duration-500"
              onClick={handleFAQClick}
            >
              Ver Más
            </button>
          </div>
        </div>
      </section>
    );
  };

  return (
    <CartProvider>
      <Header />
      <section className="w-full h-full flex flex-col items-center justify-center p-5 bg-sky-400">
        <h1 className="p-5 text-2xl font-semibold text-white text-center">
          Busca lo que quieres de nuestros emprendedores...
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>
      </section>
      <ProductSection />
      <ProfileSection />
      <FAQSection />
    </CartProvider>
  );
}
