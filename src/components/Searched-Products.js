import Image from "next/image";
export default function searchedProducts() {
  return (
    <div className="grid grid-cols-4 bg-fuchsia-400 gap-5 w-full p-8 mb-4 rounded-lg">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-105">
        <Image
          src="/zapato.jpg"
          alt="zapato"
          className="rounded-lg mb-4"
          width={250}
          height={250}
        />
        <div className="w-full text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Zapatos de Fútbol
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Zapato para jugar a la pelota
          </p>
          <p className="text-lg font-bold text-gray-800 mt-2">Precio: $50.00</p>
          <p className="text-sm text-gray-600 mt-1">Tallas: 5-10</p>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Vendedor: Zapatos Ltda.
          </p>
          <div className="flex flex-col justify-center items-center mb-4">
            <div className="flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>

              <p className="text-sm text-gray-500 ml-2">(4.0)</p>
              <p className="text-xs text-gray-500 italic">
                (Reseñas del vendedor)
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <button className="text-white bg-green-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-green-700">
                Agregar al carro{" "}
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </button>
              <button className=" text-sm mt-2 text-white bg-red-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-red-700">
                Agregar a Favoritos{" "}
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-heart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-105">
        <Image
          src="/zapato.jpg"
          alt="zapato"
          className="rounded-lg mb-4"
          width={250}
          height={250}
        />
        <div className="w-full text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Zapatos de Fútbol
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Zapato para jugar a la pelota
          </p>
          <p className="text-lg font-bold text-gray-800 mt-2">Precio: $50.00</p>
          <p className="text-sm text-gray-600 mt-1">Tallas: 5-10</p>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Vendedor: Zapatos Ltda.
          </p>
          <div className="flex flex-col justify-center items-center mb-4">
            <div className="flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>

              <p className="text-sm text-gray-500 ml-2">(4.0)</p>
              <p className="text-xs text-gray-500 italic">
                (Reseñas del vendedor)
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <button className="text-white bg-green-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-green-700">
                Agregar al carro{" "}
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </button>
              <button className=" text-sm mt-2 text-white bg-red-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-red-700">
                Agregar a Favoritos{" "}
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-heart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-105">
        <Image
          src="/zapato.jpg"
          alt="zapato"
          className="rounded-lg mb-4"
          width={250}
          height={250}
        />
        <div className="w-full text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Zapatos de Fútbol
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Zapato para jugar a la pelota
          </p>
          <p className="text-lg font-bold text-gray-800 mt-2">Precio: $50.00</p>
          <p className="text-sm text-gray-600 mt-1">Tallas: 5-10</p>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Vendedor: Zapatos Ltda.
          </p>
          <div className="flex flex-col justify-center items-center mb-4">
            <div className="flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>

              <p className="text-sm text-gray-500 ml-2">(4.0)</p>
              <p className="text-xs text-gray-500 italic">
                (Reseñas del vendedor)
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <button className="text-white bg-green-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-green-700">
                Agregar al carro{" "}
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </button>
              <button className=" text-sm mt-2 text-white bg-red-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-red-700">
                Agregar a Favoritos{" "}
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-heart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-105">
        <Image
          src="/zapato.jpg"
          alt="zapato"
          className="rounded-lg mb-4"
          width={250}
          height={250}
        />
        <div className="w-full text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Zapatos de Fútbol
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Zapato para jugar a la pelota
          </p>
          <p className="text-lg font-bold text-gray-800 mt-2">Precio: $50.00</p>
          <p className="text-sm text-gray-600 mt-1">Tallas: 5-10</p>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Vendedor: Zapatos Ltda.
          </p>
          <div className="flex flex-col justify-center items-center mb-4">
            <div className="flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354l1.763 3.572 3.946.575-2.854 2.779.673 3.923L12 13.78l-3.528 1.857.673-3.923-2.854-2.779 3.946-.575L12 4.354z"
                />
              </svg>

              <p className="text-sm text-gray-500 ml-2">(4.0)</p>
              <p className="text-xs text-gray-500 italic">
                (Reseñas del vendedor)
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <button className="text-white bg-green-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-green-700">
                Agregar al carro{" "}
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </button>
              <button className=" text-sm mt-2 text-white bg-red-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-red-700">
                Agregar a Favoritos{" "}
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-heart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
