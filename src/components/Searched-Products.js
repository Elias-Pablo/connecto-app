import Image from "next/image";
export default function searchedProducts() {
  return (
    <div className="grid grid-cols-3 bg-gray-400 gap-5 w-full p-4 mb-4 rounded-lg">
      <div className="bg-fuchsia-300 active:bg-sky-400 p-5 rounded-lg shadow-lg text-center cursor-pointer hover:scale-105 duration-300 flex flex-col justify-center items-center">
        <h3 className="text-lg font-semibold mt-2 text-white">
          <Image
            src="/zapato.jpg"
            alt="zapato"
            className="rounded-lg shadow-lg"
            width={200}
            height={200}
          />
          Zapatos Deportivos
        </h3>
        <p className="text-sm text-black">Zapato cómodo Lindo y barato</p>
        <p className="text-sm text-black">Precio: $50.00</p>
        <p className="text-sm text-black">Tallas: 5-10</p>
        <p className="text-sm text-black">Zapatos Ltda.</p>
      </div>
      <div className="bg-fuchsia-300 active:bg-sky-400 p-5 rounded-lg shadow-lg text-center cursor-pointer hover:scale-105 duration-300">
        <h3 className="text-lg font-semibold mt-2 text-white">
          Productos Destacados
        </h3>
        <p className="text-sm text-black">Descripcion del producto</p>
      </div>
      <div className="bg-fuchsia-300 active:bg-sky-400 p-5 rounded-lg shadow-lg text-center cursor-pointer hover:scale-105 duration-300">
        <h3 className="text-lg font-semibold mt-2 text-white">
          Productos Destacados
        </h3>
        <p className="text-sm text-black">Descripcion del producto</p>
      </div>
    </div>
  );
}
