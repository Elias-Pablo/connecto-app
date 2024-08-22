"use client";
import Header from "@/components/Header-em";
import Image from "next/image";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function Foro() {
  const categorias = [
    {
      nombre: "Marketing",
      icon: "/ad-circle.svg",
    },
    {
      nombre: "Finanzas",
      icon: "/businessplan.svg",
    },
    {
      nombre: "Legal",
      icon: "/gavel.svg",
    },
    {
      nombre: "Recursos Humanos",
      icon: "/man.svg",
    },
    {
      nombre: "Operaciones",
      icon: "/table-options.svg",
    },
    {
      nombre: "Desarrollo de Producto",
      icon: "/building-factory-2.svg",
    },
  ];
  const forosdestacados = [
    {
      title: "Como hacer un plan de marketing",
      category: "Marketing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl non dui fermentum aliquet. Nulla facilisi. Nullam nec odio nec elit.",
      image: "/marketing.webp",
      autor: "Juan Perez",
    },
    {
      title: "Necesito un proveedor de materiales de contruccion",
      category: "Operaciones",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl non dui fermentum aliquet. Nulla facilisi. Nullam nec odio nec elit.",
      autor: "Maria Lopez",
      image: "/90.jpeg.jpeg",
    },
    {
      title: "Necesito un proveedor de materiales de contruccion",
      category: "Operaciones",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl non dui fermentum aliquet. Nulla facilisi. Nullam nec odio nec elit.",
      autor: "Maria Lopez",
      image: "/90.jpeg.jpeg",
    },
    {
      title: "Necesito un proveedor de materiales de contruccion",
      category: "Operaciones",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl non dui fermentum aliquet. Nulla facilisi. Nullam nec odio nec elit.",
      autor: "Maria Lopez",
      image: "/90.jpeg.jpeg",
    },
    {
      title: "Necesito un proveedor de materiales de contruccion",
      category: "Operaciones",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl non dui fermentum aliquet. Nulla facilisi. Nullam nec odio nec elit.",
      autor: "Maria Lopez",
      image: "/90.jpeg.jpeg",
    },
  ];
  return (
    <>
      <Header />
      <div className="bg-sky-700 flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold text-white mt-4">
          Foro de Emprendedores
        </h1>
        <div className="w-full">
          <div className="bg-white p-4 rounded-lg m-4 shadow-lg">
            <div className="flex items-center justify-end gap-2">
              <button className="bg-green-500 font-semibold text-white text-sm  p-3 rounded-lg flex justify-center items-center gap-2">
                Crea una conversacion
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
              <button className="bg-blue-400 p-3 rounded-lg text-sm font-semibold text-white flex justify-center items-center gap-2">
                Administra tus conversaciones
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                  <path d="M13.5 6.5l4 4" />
                </svg>
              </button>
            </div>

            <h2 className="text-2xl text-black font-bold">Categorias</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {categorias.map((categoria, index) => (
                <div
                  key={index}
                  className="bg-fuchsia-700 p-3 flex items-center justify-center rounded-lg shadow-lg cursor-pointer hover:scale-95 duration-300 "
                >
                  <h3 className="text-xl font-semibold text-white mr-3">
                    {categoria.nombre}
                  </h3>
                  <Image
                    width={30}
                    height={30}
                    src={categoria.icon}
                    alt={categoria.nombre}
                  />
                </div>
              ))}
            </div>
            <h2 className="text-2xl text-black font-bold mt-3">
              Foros Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {forosdestacados.map((foro, index) => (
                <div
                  key={index}
                  className="bg-sky-300 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-95 duration-300 flex justify-between items-center"
                >
                  <Image src={foro.image} width={200} height={70} alt="" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mt-2 text-black">
                      {foro.title}
                    </h3>
                    <p className="text-sm text-black">{foro.description}</p>
                    <p className="text-xs text-black italic mt-4">
                      Autor: {foro.autor}
                    </p>
                  </div>
                  <ArrowRightCircleIcon className="h-20 w-20 ml-auto text-black hover:text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
