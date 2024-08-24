"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header-em";
import { useState } from "react";
import MetricChart from "@/components/MetricChart";

export default function EmprendedorProfile() {
  const [selectedMetric, setSelectedMetric] = useState("weekly");

  const metricData = {
    daily: {
      visits: [50, 70, 80, 90, 60, 75, 85],
      sales: [10, 15, 12, 18, 20, 22, 25],
    },
    weekly: {
      visits: [300, 450, 600, 700, 500, 550, 700],
      sales: [50, 70, 80, 90, 100, 110, 120],
    },
    monthly: {
      visits: [1000, 1200, 1500, 1400, 1300, 1700, 1800],
      sales: [150, 170, 200, 220, 240, 260, 280],
    },
  };

  const mostViewedProduct = {
    image: '/zapato.jpg', // Cambia esta ruta a una ruta válida para tus imágenes
    name: 'Producto Ejemplo',
    views: 1234,
    price: '$19.99'
  };

  return (
    <>
      <Header />
      <div className="p-10 ">
        <div className="flex justify-end items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg  flex">
            Editar Perfil
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill=""
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-edit"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </button>
        </div>
        <div className="text-center">
          <Image
            src="/avatar.jpg"
            alt="avatar"
            width={128}
            height={128}
            className="rounded-full mx-auto"
          />
          <h2 className="text-2xl font-semibold mt-4">Avatar</h2>
          <p className="text-gray-500">Lorem ipsum</p>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              key="{index}"
              href="{red.url}"
              className="text-blue-500 hover:underline"
            >
              hola
            </a>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex">
            <h3 className="text-xl font-semibold mb-5">Productos Publicados</h3>
            <button className="bg-green-500 text-white px-4 py-2 mb-5 rounded-lg ml-auto flex">
              Agregar Producto
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-5 bg-gray-200 rounded-lg shadow-lg">
              <Image
                src="/productos.jpeg"
                alt="{producto.nombre}"
                width={200}
                height={150}
                className="mx-auto"
              />
              <h4 className="text-lg font-semibold mt-3">Avatar</h4>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-blue-500 font-semibold mt-2">$10.000</p>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                Ver más
              </a>
              <div>
                <button className="bg-blue-500 mr-3 text-white px-4 py-2 rounded-lg mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M9 12l6 0" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-center p-5 bg-gray-200 rounded-lg shadow-lg">
              <Image
                src="/productos.jpeg"
                alt="{producto.nombre}"
                width={200}
                height={150}
                className="mx-auto"
              />
              <h4 className="text-lg font-semibold mt-3">Avatar</h4>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. sunt
                in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-blue-500 font-semibold mt-2">$10.000</p>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                Ver más
              </a>
              <div>
                <button className="bg-blue-500 mr-3 text-white px-4 py-2 rounded-lg mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M9 12l6 0" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-center p-5 bg-gray-200 rounded-lg shadow-lg">
              <Image
                src="/productos.jpeg"
                alt="{producto.nombre}"
                width={200}
                height={150}
                className="mx-auto"
              />
              <h4 className="text-lg font-semibold mt-3">Avatar</h4>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aut
              </p>
              <p className="text-blue-500 font-semibold mt-2">$10.000</p>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                Ver más
              </a>
              <div>
                <button className="bg-blue-500 mr-3 text-white px-4 py-2 rounded-lg mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M9 12l6 0" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-center p-5 bg-gray-200 rounded-lg shadow-lg">
              <Image
                src="/productos.jpeg"
                alt="{producto.nombre}"
                width={200}
                height={150}
                className="mx-auto"
              />
              <h4 className="text-lg font-semibold mt-3">Avatar</h4>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-blue-500 font-semibold mt-2">$10.000</p>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                Ver más
              </a>
              <div>
                <button className="bg-blue-500 mr-3 text-white px-4 py-2 rounded-lg mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M9 12l6 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
          /* Sección de métricas y estadísticas */
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-5">Métricas y Estadísticas</h3>
            <div>
              {/* Botones para cambiar la métrica */}
              <div className="flex justify-center space-x-4 mb-5">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    selectedMetric === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedMetric("daily")}
                >
                  Diario
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    selectedMetric === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedMetric("weekly")}
                >
                  Semanal
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    selectedMetric === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedMetric("monthly")}
                >
                  Mensual
                </button>
              </div>

              {/* Renderizar el gráfico */}
              <MetricChart data={metricData[selectedMetric]} />
            </div>
          </div>

          {/* Sección del producto más visto */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-5">Producto Más Visto</h3>
            <div className="text-center p-5 bg-gray-100 rounded-lg shadow-lg">
              <Image
                src={mostViewedProduct.image}
                alt={mostViewedProduct.name}
                width={200}
                height={150}
                className="mx-auto"
              />
              <h4 className="text-lg font-semibold mt-3 text-black">{mostViewedProduct.name}</h4>
              <p className="text-black">Vistas: {mostViewedProduct.views}</p>
              <p className="text-black font-semibold mt-2">{mostViewedProduct.price}</p>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                Ver más
              </a>
            </div>
          </div>
      </div>
    </>
  );
}
