"use client";
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

  const products = [
    { image: "/imagenpromo.jpeg", name: "Producto 1", description: "Descripción 1" },
    { image: "/product2.jpg", name: "Producto 2", description: "Descripción 2" },
    { image: "/product3.jpg", name: "Producto 3", description: "Descripción 3" },
    { image: "/product4.jpg", name: "Producto 4", description: "Descripción 4" },
  ];

  const profiles = [
    { image: "/imagenpromo.jpeg", name: "Nombre 1", profession: "Profesión 1" },
    { image: "/profile2.jpg", name: "Nombre 2", profession: "Profesión 2" },
    { image: "/profile3.jpg", name: "Nombre 3", profession: "Profesión 3" },
    { image: "/profile4.jpg", name: "Nombre 4", profession: "Profesión 4" },
  ];
  
  const ProductSection = () => (
    <section className="p-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-5 text-center">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-fuchsia-700 active:bg-violet-400 p-5 rounded-lg shadow-lg text-center transform hover:-translate-y-1 hover:scale-scale-105 cursor-pointer"
            >
              <Image
                src={product.image}
                width={350}
                height={200}
                alt=""
                layout="responsive"
                objectFit="cover"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-black">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const ProfileSection = () => (
    <section className="p-10 flex justify-center items-center">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-5 text-center">
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
  
  const SubscriptionPlans = () => (
    <section className="w-full flex flex-col items-center justify-center py-20">
          <p className="text-white text-3xl font-bold pb-5 drop-shadow-lg">
            Planes de Suscripcion
          </p>
          <div className="flex flex-wrap justify-around w-full px-5">
            {[
                {
                  name: "Free",
                  color: "bg-sky-400",
                  items: [
                    "Perfil básico de negocio",
                    "Catálogo de productos limitado",
                    "Redirección a la página del negocio",
                    "Acceso a la red de Emprendedores",
                    "Gestor de redes sociales básico",
                    "Visibilidad Básica en buscadores internos",
                  ],
                },
                {
                  name: "Premium",
                  color: "bg-fuchsia-700",
                  items: [
                    "Perfil avanzado de negocio",
                    "Catálogo de productos ilimitado",
                    "Analíticas de interacciones",
                    "Gestor de redes sociales con IA",
                    "Promociones destacadas",
                    "Visibilidad Mejorada en buscadores internos",
                  ],
                },
              ].map((plan, index) => (
              <div
                key={index}
                  className={`w-auto ${plan.color} text-white px-6 py-5 rounded-2xl shadow-xl mb-4 flex flex-col items-center transition-transform transform hover:scale-105 duration-300 ease-in-out`}
                >
                <p className="text-4xl m-4 font-bold">{plan.name}</p>
                <ul className="text-sm font-light list-disc list-inside">
                  {plan.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
    </section>
  );
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
                className=" px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white mr-2  hover:text-sky-400 transition-colors duration-300 ease-in-out"
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
                className="bg-sky-400 px-4 py-2  text-xs md:text-base rounded-xl font-semibold text-zinc-800 hover:bg-fuchsia-700 hover:text-sky-400 transition-colors duration-300 ease-in-out"
                onClick={handleLoginClick}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </header>
        <section className="w-full h-full flex flex-col items-center justify-center  bg-fuchsia-700 p-5">
          <h1 className="p-5 text-2xl font-semibold">
            Busca lo que quieres de nuestros emprendedores...
          </h1>
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>
        </section>
        <>
          <ProductSection/>
          <ProfileSection/> 
          <SubscriptionPlans/>
        </>
      </div>
    </>
  );
}
