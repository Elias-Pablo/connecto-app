import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col justify-center items-center">
      <Image
        src="/ConnecTo-logo.png"
        alt="ConnecTo Logo"
        width={250}
        height={250}
        className="mb-10"
      />
      <div className="bg-fuchsia-600 w-full md:w-1/3 p-10 rounded-2xl shadow-md">
        <div className="flex flex-col items-center">
          <form className="w-full max-w-md mt-6">
            <label htmlFor="email" className="text-white">
              Correo
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full text-black"
            />
            <label htmlFor="password" className="text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full text-black"
            />
            <button
              type="submit"
              className="text-white bg-sky-400 hover:bg-sky-700 rounded-md p-2 mt-5 w-full"
            >
              Iniciar Sesión
            </button>
            <Link
              href="/recover"
              className="mt-3 block text-center underline hover:text-sky-300 text-sm"
            >
              ¿Has olvidado tus credenciales?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
