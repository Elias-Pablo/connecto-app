"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/components/Searchbar";
import { Suspense } from "react";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("user/register");
  };
  const handleRegisterEmprendedorClick = () => {
    router.push("/emprendedores");
  };

  return (
    <>
      <div className="bg-zinc-800 w-full min-h-screen">
        <header className="bg-zinc-800 px-6 shadow-lg flex items-center justify-center">
          <div className="flex h-20 items-center justify-between w-full">
            <Image
              src="/ConnecTo-logo-horizontal2.png"
              alt="ConnecTo Logo"
              width={250}
              height={50}
            />
            <div className="flex items-center">
              <button
                className=" px-4 py-2 rounded-xl font-semibold text-white mr-2  hover:text-sky-400 transition-colors duration-300 ease-in-out"
                onClick={handleRegisterEmprendedorClick}
              >
                Registrar mi negocio
              </button>
              <button
                className="bg-fuchsia-700 px-4 py-2 rounded-xl font-semibold text-zinc-800 mr-2 hover:bg-sky-400 hover:text-fuchsia-700 transition-colors duration-300 ease-in-out"
                onClick={handleRegisterClick}
              >
                Registrarse
              </button>
              <button
                className="bg-sky-400 px-4 py-2 rounded-xl font-semibold text-zinc-800 hover:bg-fuchsia-700 hover:text-sky-400 transition-colors duration-300 ease-in-out"
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
      </div>
    </>
  );
}
