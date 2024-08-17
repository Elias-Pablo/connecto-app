"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/components/Searchbar";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  const handleRegisterClick = () => {
    router.push("/auth/register");
  };

  const handleRegisterEmprendedorClick = () => {
    router.push("/emprendedores");
  };

  const handleFAQClick = () => {
    router.push("/faq");
  };

  const products = [
    { image: "/imagenpromo.jpeg", name: "Producto 1", description: "Descripción 1" },
    { image: "/imagenpromo.jpeg", name: "Producto 2", description: "Descripción 2" },
    { image: "/imagenpromo.jpeg", name: "Producto 3", description: "Descripción 3" },
    { image: "/imagenpromo.jpeg", name: "Producto 4", description: "Descripción 4" },
  ];

  const profiles = [
    { image: "/imagenpromo.jpeg", name: "Nombre 1", profession: "Profesión 1" },
    { image: "/imagenpromo.jpeg", name: "Nombre 2", profession: "Profesión 2" },
    { image: "/imagenpromo.jpeg", name: "Nombre 3", profession: "Profesión 3" },
    { image: "/imagenpromo.jpeg", name: "Nombre 4", profession: "Profesión 4" },
  ];

  const faqs = [
    {
      question: "¿Qué es ConnecTo y cómo funciona?",
      answer: "ConnecTo es una plataforma que facilita la conexión entre emprendedores y clientes mediante perfiles personalizados, productos destacados y planes de suscripción. La plataforma ofrece una interfaz intuitiva para explorar productos, conocer emprendedores y optar por diferentes planes según las necesidades del negocio."
    },
    {
      question: "¿Es ConnecTo fácil de usar?",
      answer: "Sí, ConnecTo está diseñado para ser accesible y fácil de usar. La plataforma proporciona una navegación sencilla con secciones claramente definidas para explorar productos, perfiles de emprendedores y planes de suscripción, asegurando una experiencia de usuario fluida y agradable."
    },
    {
      question: "¿Qué diferencia a ConnecTo de otras plataformas similares?",
      answer: "ConnecTo se destaca por su enfoque en la integración de perfiles de emprendedores y productos destacados dentro de una misma plataforma. Además, ofrece planes de suscripción adaptados a diferentes niveles de necesidad empresarial, con un diseño atractivo y funcionalidades que facilitan la visibilidad y el crecimiento de los negocios."
    },
    {
      question: "¿Es ConnecTo adecuado para mi negocio?",
      answer: "ConnecTo es adecuado para una amplia gama de negocios, especialmente aquellos que buscan aumentar su visibilidad en línea y conectar con clientes potenciales. La plataforma es ideal si estás buscando una solución que combine la promoción de productos, la visibilidad de emprendedores y opciones de suscripción para mejorar tu presencia en el mercado."
    },
  ];

  const ProductSection = () => (
    <section className="bg-blue-800 p-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-5 text-center text-white">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-fuchsia-700 active:bg-violet-400 p-5 rounded-lg shadow-lg text-center transform hover:-translate-y-1 cursor-pointer"
            >
              <Image
                src={product.image}
                width={350}
                height={200}
                alt=""
                layout="responsive"
                objectFit="cover"
              />
              <h3 className="text-lg font-semibold mt-2 text-white">{product.name}</h3>
              <p className="text-sm text-black">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  const ProfileSection = () => (
    <section className="p-10 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-5 text-center text-white">
          Perfiles de Emprendedores
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="cursor-pointer hover:opacity-80 transition-opacity duration-300 inline-block">
                <div className="w-32 h-32 mx-auto rounded-full shadow-lg overflow-hidden">
                  <Image
                    src={profile.image}
                    width={128}
                    height={128}
                    alt=""
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mt-2">{profile.name}</h3>
                <p className="text-sm text-gray-300">{profile.profession}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const FAQSection = () => {
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const handleToggleAnswer = (index) => {
      setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    return (
      <section className="p-10 bg-gray-700">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-5 text-center text-white">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-500 pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleToggleAnswer(index)}
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <button
                    className="text-white text-xl"
                    aria-expanded={expandedQuestion === index}
                  >
                    {expandedQuestion === index ? "-" : "+"}
                  </button>
                </div>
                {expandedQuestion === index && (
                  <p className="text-sm text-gray-300 mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-sky-400 text-white px-6 py-2 rounded-lg hover:bg-sky-500 transition-colors"
              onClick={handleFAQClick}
            >
              Ver Más
            </button>
          </div>
        </div>
      </section>
    );
  };

  //const Footer = () => (
  //);

  return (
    <>
      <div className="bg-zinc-800 w-full min-h-screen">
        <header className="bg-zinc-800 px-6 shadow-lg flex items-center justify-center">
          <div className="flex h-20 items-center justify-between w-full">
            <Link href="/">
              <Image
                src="/ConnecTo-logo-horizontal2.png"
                alt="ConnecTo Logo"
                width={250}
                height={50}
              />
            </Link>
            <div className="flex items-center">
              <button
                className="px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white mr-2 hover:text-sky-400 transition-colors duration-300 ease-in-out"
                onClick={handleRegisterEmprendedorClick}
              >
                Registrar mi negocio
              </button>
              <button
                className="bg-fuchsia-700 px-4 text-xs md:text-base py-2 rounded-xl font-semibold text-zinc-800 mr-2 hover:bg-sky-400 hover:text-fuchsia-700 transition-colors duration-300 ease-in-out"
                onClick={handleRegisterClick}
              >
                Registrarse
              </button>
              <button
                className="bg-sky-400 px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-zinc-800 hover:bg-fuchsia-700 hover:text-sky-400 transition-colors duration-300 ease-in-out"
                onClick={handleLoginClick}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </header>
        <section className="w-full h-full flex flex-col items-center justify-center bg-fuchsia-700 p-5">
          <h1 className="p-5 text-2xl font-semibold text-white">
            Busca lo que quieres de nuestros emprendedores...
          </h1>
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>
        </section>

        <>
          <ProductSection/>
          <ProfileSection/>
          <FAQSection/>
        </>
      </div>
    </>
  );
}
