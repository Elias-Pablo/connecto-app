"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header-em";

export default function SubscriptionPage() {
  const router = useRouter();

  const handleSubscribeClick = () => {
    router.push("/auth/emregister");
  };

  const plans = [
    {
      name: "Plan Free",
      price: "Gratis",
      color: "bg-zinc-800",
      items: [
        "Perfil básico de negocio",
        "Catálogo de productos limitado",
        "Redirección a la página del negocio",
        "Acceso a la red de Emprendedores",
        "Visibilidad básica en buscadores internos",
      ],
    },
    {
      name: "💎 Plan Premium 💎",
      price: "$9.990/mes",
      color: "bg-fuchsia-700",
      items: [
        "Perfil avanzado de negocio",
        "Catálogo de productos ilimitado",
        "Analíticas de interacciones",
        "Promociones destacadas",
        "Visibilidad mejorada en buscadores internos",
      ],
    },
  ];

  return (
    <>
      <Header />
      <section className="bg-fuchsia-700 w-full flex flex-col items-center justify-center py-20">
        <p className="text-white text-3xl font-bold pb-5 drop-shadow-lg">
          ¡Elige el Plan Perfecto para Ti!
        </p>
        <div className="flex flex-wrap justify-around w-full px-5">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`w-auto ${plan.color} text-white px-6 py-8 rounded-2xl shadow-xl mb-4 flex flex-col items-center transition-transform transform hover:scale-105 duration-300 ease-in-out`}
            >
              <p className="text-4xl m-4 font-bold">{plan.name}</p>
              <p className="text-xl font-semibold">{plan.price}</p>
              <ul className="text-sm font-light list-disc list-inside mt-4">
                {plan.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button
                onClick={handleSubscribeClick}
                className="mt-8 bg-white p-2 w-full rounded-xl shadow-lg font-bold text-fuchsia-700 hover:bg-fuchsia-700 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Suscríbete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sky-400 w-full flex flex-col items-center justify-center py-20">
        <p className="text-zinc-800 text-3xl font-bold pb-5 drop-shadow-lg">
          ¿Por Qué Elegir el Plan Premium?
        </p>
        <div className="flex flex-wrap justify-around w-full px-5 text-zinc-800">
          {[
            "Mayor visibilidad para tu negocio",
            "Herramientas avanzadas de análisis",
            "Promociones destacadas para tu catálogo",
          ].map((benefit, index) => (
            <div
              key={index}
              className="w-72 px-6 py-5 rounded-2xl shadow-xl mb-4 bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <p className="text-xl font-bold">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-fuchsia-700 w-full flex flex-col items-center justify-center py-20">
        <p className="text-white text-3xl font-bold pb-5 drop-shadow-lg">
          ¿Listo para Llevar tu Negocio al Siguiente Nivel?
        </p>
        <div className="flex flex-col items-center">
          <p className="text-white text-lg text-center">
            Únete a nuestra comunidad y empieza a disfrutar de los beneficios de
            nuestro plan premium.
          </p>
          <button
            className="mt-6 bg-white px-6 py-3 rounded-xl shadow-lg text-fuchsia-700 hover:bg-fuchsia-700 hover:text-white transition-colors duration-300 ease-in-out"
            onClick={handleSubscribeClick}
          >
            Suscríbete Ahora
          </button>
        </div>
      </section>
    </>
  );
}
