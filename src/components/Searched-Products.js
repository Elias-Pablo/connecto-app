import Image from "next/image";
import { useCart } from "../../src/app/context/CartContext";

export default function SearchedProducts({ products }) {
  const { addToCart } = useCart();
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="mt-4 grid grid-cols-4 bg-fuchsia-400 gap-5 w-full p-8 mb-4 rounded-lg">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-105"
        >
          <img
            src={product.image || "/placeholder.jpg"}
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
              Precio: {formatPrice(product.price)}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Agregar al Carro
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
