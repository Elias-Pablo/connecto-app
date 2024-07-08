"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("emprendedores/register");
  };

  return (
    <>
      <div className="bg-zinc-800 w-full min-h-screen">
        <header className="bg-zinc-800 px-6 shadow-lg">
          <div className="flex h-20 items-center justify-between w-full">
            <Image
              src="/ConnecTo-logo-horizontal2.png"
              alt="ConnecTo Logo"
              width={250}
              height={50}
            />
            <div className="flex items-center">
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

        <section className="bg-fuchsia-500 w-full flex items-center justify-center py-20">
          <div className="w-4/5 rounded-3xl bg-zinc-800 p-10 m-5 text-sky-400 shadow-xl transition transform hover:scale-105 duration-300 ease-in-out flex  justify-center items-center">
            <div className="flex flex-col items-center">
              <p className="text-4xl">
                Tu plataforma ideal para gestionar tu negocio y aumentar tu
                visibilidad.
              </p>
              <p className="text-sm pt-6">
                En ConnecTo, entendemos la importancia de visibilizar tu
                proyecto y encontrar las oportunidades adecuadas para crecer.
                Nuestra plataforma te ofrece una experiencia única y
                personalizada, diseñada para potenciar tus conexiones y ayudarte
                a alcanzar tus metas.
              </p>

              <button
                className="mt-10 bg-white p-4 w-80 rounded-xl shadow-lg font-bold text-xl text-fuchsia-700 hover:bg-fuchsia-700 hover:text-zinc-900 transition-colors duration-300 ease-in-out"
                onClick={handleRegisterClick}
              >
                Regístrate Gratis
              </button>
            </div>
            <div>
              <Image
                src="/imagenpromo.jpeg"
                alt="connecto-emprendedores"
                width={1500}
                height={1500}
                className="rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </section>

        <section className="bg-zinc-800 w-full flex flex-col items-center justify-center py-20">
          <p className="text-fuchsia-700 font-extrabold text-3xl pb-7 drop-shadow-lg">
            ¿Qué ofrecemos?
          </p>
          <div className="flex flex-wrap justify-around w-full px-5">
            {[
              "Networking Efectivo",
              "Recomendaciones Personalizadas",
              "Gestión de Proyectos y Publicaciones",
              "Comunicación Directa",
            ].map((title, index) => (
              <div
                key={index}
                className="w-72 bg-sky-300 text-zinc-800 px-6 py-5 rounded-2xl shadow-xl mb-4 hover:text-white cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                <p className="text-xl font-bold">{title}</p>
                <p className="text-sm">
                  {/* Add corresponding descriptions here */}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-sky-400 w-full flex flex-col items-center justify-center py-20">
          <p className="text-zinc-800 text-3xl font-bold pb-5 drop-shadow-lg">
            Elige el Plan Perfecto para Ti
          </p>
          <div className="flex flex-wrap justify-around w-full px-5">
            {[
              {
                name: "Free",
                color: "bg-zinc-800",
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
                name: "💎 Premium 💎",
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

        <section className="bg-fuchsia-700 w-full flex flex-col items-center justify-center py-20">
          <p className="text-white text-3xl font-bold pb-5 drop-shadow-lg">
            ¿Por Qué Elegirnos?
          </p>
          <div className="flex flex-wrap justify-around w-full px-5 text-sky-400">
            {[
              "Herramientas Avanzadas para Negocios",
              "Conexión con Emprendedores",
              "Gestión Eficiente de Redes Sociales",
              "Análisis y Estadísticas Precisas",
            ].map((reason, index) => (
              <div
                key={index}
                className="w-72 px-6 py-5 rounded-2xl shadow-xl mb-4 bg-zinc-800 transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                <p className="text-xl font-bold">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-600 w-full flex flex-col items-center justify-center py-20">
          <p className="text-white font-extrabold text-3xl pb-7 drop-shadow-lg">
            ¿Listo para Empezar?
          </p>
          <div className="flex flex-col items-center">
            <p className="text-white text-lg text-center">
              Únete a nuestra plataforma hoy mismo y lleva tu negocio al
              siguiente nivel.
            </p>
            <button
              className="mt-4 bg-white px-6 py-2 rounded-xl shadow-lg text-fuchsia-700 hover:bg-fuchsia-700 hover:text-zinc-900 transition-colors duration-300 ease-in-out"
              onClick={handleRegisterClick}
            >
              Regístrate Gratis
            </button>
            <button
              className="mt-4 bg-white px-6 py-2 rounded-xl shadow-lg text-fuchsia-700 hover:bg-fuchsia-700 hover:text-zinc-900 transition-colors duration-300 ease-in-out"
              onClick={handleLoginClick}
            >
              Contacta con Nosotros
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
