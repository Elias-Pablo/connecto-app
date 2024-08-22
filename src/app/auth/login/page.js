import Image from "next/image";
import Link from "next/link";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Login() {
  return (
    <div className="bg-neutral-900 p-14 flex flex-col justify-center items-center">
      <Link href="/">
        <Image
          src="/ConnecTo-logo.png"
          alt="ConnecTo Logo"
          width={250}
          height={250}
          className="mb-10"
        />
      </Link>
      <div className="bg-fuchsia-600 w-[400px] md:w-2/4  p-10 rounded-2xl shadow-md">
        <div className="flex flex-col items-center">
          <form className="  w-3/4   mt-6">
            <label htmlFor="email" className="text-white">
              Correo
            </label>
            <input
              type="email"
              id="email"
              placeholder="tucorreo@email.com"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full text-black placeholder:text-xs placeholder:italic placeholder:font-thin"
            />
            <label htmlFor="password" className="text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full text-black placeholder:text-xs placeholder:italic placeholder:font-thin"
            />
            <button
              type="submit"
              className="text-white bg-sky-400 hover:bg-sky-700 rounded-md p-4 mt-5 w-full flex items-center justify-center"
            >
              <ArrowRightEndOnRectangleIcon className="h-6 w-6 inline-block mr-2" />
              Iniciar Sesión
            </button>
            <Link
              href="/auth/recover"
              className="mt-3 block text-center underline hover:text-sky-300 text-sm"
            >
              ¿Has olvidado tus credenciales?
            </Link>
            <Link
              href="/auth/register"
              className="mt-3 block text-center underline hover:text-sky-300 text-sm"
            >
              ¿No tienes cuenta?
              <span className="ml-2 text-sky-300 font-bold">Regístrate</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
