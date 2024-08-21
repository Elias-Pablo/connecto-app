"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmpassword) {
      return alert("Las contraseñas no coinciden");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJSON = await res.json();
    console.log(resJSON);
  });
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
          <form
            onSubmit={onSubmit}
            className="bg-fuchsia-600 flex flex-col w-[500px] h-auto p-10 rounded-2xl shadow-md mb-8 md:mr-4"
          >
            <h2 className="text-white text-center mb-4 text-xl font-bold">
              Regístrate en ConnecTo
            </h2>
            <label htmlFor="name" className="text-white">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="name"
              placeholder="tuNombredeUsuario123"
              className="border border-gray-300 rounded-md p-2 mb-2 text-black placeholder:text-xs placeholder:italic placeholder:font-thin"
              {...register("username", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            />
            {errors.username && (
              <span className="text-red-300 text-xs">
                {errors.username.message}
              </span>
            )}
            <label htmlFor="email" className="text-white">
              Correo
            </label>
            <input
              type="email"
              id="email"
              placeholder="tucorreo@email.com"
              className="border border-gray-300 rounded-md p-2 mb-2 text-black placeholder:text-xs placeholder:italic placeholder:font-thin"
              {...register("email", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-300 text-xs">
                {errors.email.message}
              </span>
            )}

            <label htmlFor="password" className="text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="border border-gray-300 rounded-md p-2 mb-2 text-black placeholder:text-xs placeholder:italic placeholder:font-thin"
              {...register("password", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-300 text-xs">
                {errors.password.message}
              </span>
            )}
            <label htmlFor="passwordrevaliduser" className="text-white">
              Repetir Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              id="passwordrevaliduser"
              className="border border-gray-300 rounded-md p-2 mb-2 text-black placeholder:text-xs placeholder:italic placeholder:font-thin"
              {...register("confirmpassword", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            />
            {errors.confirmpassword && (
              <span className="text-red-300 text-xs">
                {errors.confirmpassword.message}
              </span>
            )}
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
