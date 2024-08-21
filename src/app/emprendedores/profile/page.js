"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function EmprendedorProfile() {
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
      </div>
    </>
  );
}
