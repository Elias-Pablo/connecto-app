import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <div className="bg-neutral-900 w-full h-screen flex flex-col items-center justify-center">
        <Image
          src="/ConnecTo-logo.png"
          alt="ConnecTo Logo"
          width={250}
          height={250}
          className="mb-10"
        />
        <div className="flex flex-col md:flex-row justify-center items-center">
          <form className="bg-fuchsia-600 flex flex-col w-[500px] h-auto p-10 rounded-2xl shadow-md mb-8 md:mr-4">
            <h2 className="text-white text-center mb-4 text-xl font-bold">
              Registro para Usuarios
            </h2>
            <label htmlFor="name" className="text-white">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded-md p-2 mb-2 text-black"
            />
            <label htmlFor="email" className="text-white">
              Correo
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-md p-2 mb-2 text-black"
            />
            <label htmlFor="password" className="text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-md p-2 mb-2 text-black"
            />
            <label htmlFor="passwordrevaliduser" className="text-white">
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="passwordrevaliduser"
              className="border border-gray-300 rounded-md p-2 mb-2 text-black"
            />
            <button
              type="submit"
              className="text-white bg-sky-400 hover:bg-sky-700 rounded-md p-2 mt-5"
            >
              Registrarse como Usuario
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
