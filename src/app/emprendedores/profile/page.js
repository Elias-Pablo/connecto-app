"use client";
import Image from 'next/image';

const EmprendedorProfile = ({ emprendedor }) => (
  <div className="p-10">
    <div className="text-center">
      <Image
        src={emprendedor.foto}
        alt={emprendedor.nombre}
        width={128}
        height={128}
        className="rounded-full mx-auto"
      />
      <h2 className="text-2xl font-semibold mt-4">{emprendedor.nombre}</h2>
      <p className="text-gray-500">{emprendedor.profesion}</p>
      <p className="mt-2">{emprendedor.biografia}</p>
      <div className="flex justify-center space-x-4 mt-4">
        {emprendedor.redes.map((red, index) => (
          <a key={index} href={red.enlace} className="text-blue-500 hover:underline">
            {red.nombre}
          </a>
        ))}
      </div>
    </div>
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-5">Productos Publicados</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {emprendedor.productos.map((producto, index) => (
          <div key={index} className="text-center p-5 bg-gray-200 rounded-lg shadow-lg">
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              width={200}
              height={150}
              className="mx-auto"
            />
            <h4 className="text-lg font-semibold mt-3">{producto.nombre}</h4>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-blue-500 font-semibold mt-2">{producto.precio}</p>
            <a href={producto.enlace} className="text-sm text-blue-500 hover:underline mt-2 inline-block">
              Ver más
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EmprendedorProfile;
