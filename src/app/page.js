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
    {
      image: "/producto1.jpg",
      name: "Producto 1",
      description: "Descripción del producto 1",
    },
    {
      image: "/producto2.jpg",
      name: "Producto 2",
      description: "Descripción del producto 2",
    },
    {
      image: "/producto3.jpg",
      name: "Producto 3",
      description: "Descripción del producto 3",
    },
    {
      image: "/producto4.jpg",
      name: "Producto 4",
      description: "Descripción del producto 4",
    },
  ];
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
        <section className="p-10">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-5 text-center">
              Productos destacados
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="bg-violet-300 active:bg-violet-400 p-5 rounded-lg shadow-lg text-center transform hover:-translate-y-1 hover:scale-scale-105 cursor-pointer"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={350}
                    height={200}
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-black">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>        
      </div>
    </>
  );
}
