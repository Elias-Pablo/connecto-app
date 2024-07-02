"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div className="bg-slate-200 w-full h-full">
      <header className="bg-violet-500 px-6 shadow">
        <div className="flex h-20 items-center justify-between bg-violet-500 w-full">
          <strong className="text-4xl text-white">ConnecTo</strong>
          <div>
            <button
              className="bg-violet-800 px-2 py-1 rounded-xl border shadow text-white mr-2 hover:bg-white hover:text-violet-800"
              onClick={handleRegisterClick}
            >
              Registrarse
            </button>
            <button
              className="bg-white px-2 py-1 rounded-xl border shadow text-violet-800 hover:bg-violet-800 hover:text-white"
              onClick={handleLoginClick}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>

      <section className="bg-violet-400 w-full flex items-center justify-center">
        <div className="w-4/5 rounded-3xl bg-white bg-opacity-90 p-10 m-5 text-violet-800 shadow-xl">
          <p className="text-4xl">
            Tu plataforma ideal para gestionar tu negocio y aumentar tu
            visibilidad.
          </p>
          <p className="text-base pt-6">
            En ConnecTo, entendemos la importancia de visibilizar tu proyecto y
            encontrar las oportunidades adecuadas para crecer. Nuestra
            plataforma te ofrece una experiencia única y personalizada, diseñada
            para potenciar tus conexiones y ayudarte a alcanzar tus metas.
          </p>
        </div>
      </section>

      <section className="bg-white w-full flex flex-col items-center justify-center py-10">
        <p className="text-violet-800 text-3xl p-3 drop-shadow">
          ¿Qué ofrecemos?
        </p>
        <div className="flex flex-wrap justify-around w-full px-5">
          <div className="w-72 bg-violet-400 text-white px-6 py-5 rounded-2xl shadow-xl mb-4 hover:bg-sky-400 hover:text-white cursor-pointer hover:shadow-2xl">
            <p className="text-xl">
              <strong>Networking Efectivo</strong>
            </p>
            <p className="text-sm">
              Conéctate con tus clientes potenciales, colaboradores y socios de
              manera rápida y sencilla.
            </p>
          </div>
          <div className="w-72 bg-violet-400 text-white px-6 py-5 rounded-2xl shadow-xl mb-4 hover:bg-sky-400 hover:text-white cursor-pointer hover:shadow-2xl">
            <p className="text-xl">
              <strong>Recomendaciones Personalizadas</strong>
            </p>
            <p className="text-sm">
              Gracias a nuestros avanzados algoritmos de inteligencia
              artificial, recibirás sugerencias de contactos y oportunidades
              adaptadas a tus intereses y necesidades.
            </p>
          </div>
          <div className="w-72 bg-violet-400 text-white px-6 py-5 rounded-2xl shadow-xl mb-4 hover:bg-sky-400 hover:text-white cursor-pointer hover:shadow-2xl">
            <p className="text-xl">
              <strong>Gestión de Proyectos y Publicaciones</strong>
            </p>
            <p className="text-sm">
              Crea y gestiona tus proyectos, publica artículos, y destaca tu
              trabajo ante una audiencia relevante.
            </p>
          </div>
          <div className="w-72 bg-violet-400 text-white px-6 py-5 rounded-2xl shadow-xl mb-4 hover:bg-sky-400 hover:text-white cursor-pointer hover:shadow-2xl">
            <p className="text-xl">
              <strong>Comunicación Directa</strong>
            </p>
            <p className="text-sm">
              Interactúa fácilmente con los medios a través de nuestro sistema
              de mensajería interna, facilitando colaboraciones y entrevistas.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white w-full flex flex-col items-center justify-center py-10">
        <p className="text-violet-800 text-3xl p-3 drop-shadow">
          Elige el Plan Perfecto para Ti
        </p>
        <div className="flex flex-wrap justify-around w-full px-5">
          <div className="w-72 bg-orange-400 text-white px-6 py-5 rounded-2xl shadow-xl mb-4">
            <p className="text-xl">
              <strong>Free</strong>
            </p>
            <ul className="text-sm list-disc list-inside">
              <li>Perfil básico de negocio</li>
              <li>Catálogo de productos limitado</li>
              <li>Redirección a la página del negocio</li>
              <li>Acceso a la red de Emprendedores</li>
              <li>Gestor de redes sociales básico</li>
              <li>Visibilidad Básica en buscadores internos</li>
            </ul>
          </div>
          <div className="w-72 bg-green-500 text-white px-6 py-5 rounded-2xl shadow-xl mb-4">
            <p className="text-xl">
              <strong>Premium</strong>
            </p>
            <ul className="text-sm list-disc list-inside">
              <li>Perfil avanzado de negocio</li>
              <li>Catálogo de productos ilimitado</li>
              <li>Analíticas de interacciones</li>
              <li>Gestor de redes sociales con IA</li>
              <li>Promociones destacadas</li>
              <li>Visibilidad Mejorada en buscadores internos</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-violet-500 w-full flex flex-col items-center justify-center py-10">
        <p className="text-white text-3xl p-3 drop-shadow">
          ¿Por Qué Elegirnos?
        </p>
        <div className="flex flex-wrap justify-around w-full px-5 text-white ">
          <div className="w-72 px-6 py-5 rounded-2xl shadow-xl mb-4 bg-violet-400">
            <p className="text-xl">
              <strong>Herramientas Avanzadas para Negocios</strong>
            </p>
          </div>
          <div className="w-72 px-6 py-5 rounded-2xl shadow-xl mb-4 bg-violet-400">
            <p className="text-xl">
              <strong>Conexión con Emprendedores</strong>
            </p>
          </div>
          <div className="w-72 px-6 py-5 rounded-2xl shadow-xl mb-4 bg-violet-400">
            <p className="text-xl">
              <strong>Gestión Eficiente de Redes Sociales</strong>
            </p>
          </div>
          <div className="w-72 px-6 py-5 rounded-2xl shadow-xl mb-4 bg-violet-400">
            <p className="text-xl">
              <strong>Análisis y Estadísticas Precisas</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-violet-600 w-full flex flex-col items-center justify-center py-10">
        <p className="text-white text-3xl p-3 drop-shadow">
          ¿Listo para Empezar?
        </p>
        <div className="flex flex-col items-center">
          <p className="text-white text-lg text-center">
            Únete a nuestra plataforma hoy mismo y lleva tu negocio al siguiente
            nivel.
          </p>
          <button
            className="mt-4 bg-white px-6 py-2 rounded-xl shadow text-violet-800 hover:bg-violet-800 hover:text-white"
            onClick={handleRegisterClick}
          >
            Regístrate Gratis
          </button>
          <button
            className="mt-4 bg-white px-6 py-2 rounded-xl shadow text-violet-800 hover:bg-violet-800 hover:text-white"
            onClick={handleLoginClick}
          >
            Contacta con Nosotros
          </button>
        </div>
      </section>
    </div>
  );
}
