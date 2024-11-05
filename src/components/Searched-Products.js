import Image from "next/image";
import { useCart } from "../../src/app/context/CartContext";

export default function SearchedProducts() {
  const { addToCart } = useCart();

  // Lista de productos con IDs únicos
  const products = [
    {
      id: 100,
      name: "Zapatos de Fútbol",
      price: 50.0,
      image: "/zapato.jpg",
      description: "Zapato para jugar a la pelota",
      seller: "Zapatos Ltda.",
      sizes: "5-10",
    },
    {
      id: 101,
      name: "Botines de Running",
      price: 60.0,
      image: "/zapato.jpg",
      description: "Botines para correr",
      seller: "Running Co.",
      sizes: "6-11",
    },
    {
      id: 102,
      name: "Sandalias de Playa",
      price: 25.0,
      image: "/zapato.jpg",
      description: "Sandalias para la playa",
      seller: "Beachwear Ltd.",
      sizes: "5-10",
    },
    {
      id: 103,
      name: "Zapatos Casual",
      price: 70.0,
      image: "/zapato.jpg",
      description: "Zapatos cómodos para el día a día",
      seller: "Casual Style",
      sizes: "7-12",
    },
  ];

  return (
    <div className="grid grid-cols-4 bg-fuchsia-400 gap-5 w-full p-8 mb-4 rounded-lg">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={product.image}
            alt={product.name}
            className="rounded-lg mb-4"
            width={250}
            height={250}
          />
          <div className="w-full text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Precio: ${product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Tallas: {product.sizes}
            </p>
            <p className="text-sm text-gray-600 mt-1 mb-4">
              Vendedor: {product.seller}
            </p>

            <div className="flex items-center justify-center flex-col">
              <button
                onClick={() => addToCart(product)}
                className="text-white bg-green-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-green-700"
              >
                Agregar al carro{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </button>
              <button className="text-sm mt-2 text-white bg-red-400 px-6 gap-3 py-3 flex justify-center items-center rounded-lg shadow-md hover:bg-red-700">
                Agregar a Favoritos{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
