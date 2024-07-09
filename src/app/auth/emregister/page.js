import Image from "next/image";
import Link from "next/link";
export default function Register() {
  return (
    <>
      <div className="bg-neutral-900 w-full h-screen flex flex-col items-center justify-center">
        <Link href="/">
          <Image
            src="/ConnecTo-logo.png"
            alt="ConnecTo Logo"
            width={250}
            height={250}
            className="mb-10"
          />
        </Link>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <form className="bg-blue-600 flex flex-col w-[400px] h-auto p-10 rounded-2xl shadow-md mb-8 md:ml-4">
            <h2 className="text-white text-center mb-4 font-bold text-xl">
              Registro para Emprendedores
            </h2>
            <label htmlFor="businessName" className="text-white">
              Nombre del Negocio
            </label>
            <input
              type="text"
              id="businessName"
              className="border border-gray-300 rounded-md p-1 mb-2 text-black"
            />
            <label htmlFor="bussinessUser" className="text-white"></label>
            Nombre del Propietario/a o Representante Legal
            <input
              type="text"
              id="bussinessUser"
              className="border border-gray-300 rounded-md p-1 mb-2 text-black"
            ></input>
            <label htmlFor="emailEmp" className="text-white">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="emailEmp"
              className="border border-gray-300 rounded-md p-1 mb-2 text-black"
            />
            <label htmlFor="passwordEmp" className="text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="passwordEmp"
              className="border border-gray-300 rounded-md p-1 mb-2 text-black"
            />
            <label htmlFor="passwordrevalid" className="text-white">
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="passwordrevalid"
              className="border border-gray-300 rounded-md p-1 mb-2 text-black"
            />
            <button
              type="submit"
              className="text-white bg-green-400 hover:bg-green-700 rounded-md p-4 mt-5"
            >
              Registrarse como Emprendedor
            </button>
          </form>
        </div>

        {/* Enlace a la página de inicio de sesión */}
        <Link href="/login" className="underline hover:text-sky-300 text-sm">
          ¿Ya tienes una cuenta? Inicia sesión aquí.
        </Link>
      </div>
    </>
  );
}
