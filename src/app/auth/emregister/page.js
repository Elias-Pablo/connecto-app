"use client";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function Register() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("/api/auth/registerem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error al registrar emprendedor");
    }
  };

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
            onSubmit={handleSubmit}
            className="bg-blue-600 flex flex-col w-[400px] h-auto p-10 rounded-2xl shadow-md mb-8 md:ml-4"
          >
            <h2 className="text-white text-center mb-4 font-bold text-xl">
              Registro para Emprendedores
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <label htmlFor="businessName" className="text-white">
              Nombre del Negocio
            </label>
            <input
              type="text"
              id="businessName"
              className="border border-gray-300 rounded-md p-1 mb-2 text-black"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />

            <label htmlFor="emailEmp" className="text-white">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="emailEmp"
              className="border border-gray-300 rounded-md p-1 mb-2 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="passwordEmp" className="text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="passwordEmp"
              className="border border-gray-300 rounded-md p-1 mb-2 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="passwordrevalid" className="text-white">
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="passwordrevalid"
              className="border border-gray-300 rounded-md p-1 mb-2 text-black"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button
              type="submit"
              className="text-white bg-green-400 hover:bg-green-700 rounded-md p-4 mt-5"
            >
              Registrarse como Emprendedor
            </button>
            <Link
              href="/auth/login"
              className="underline text-white text-center hover:text-sky-300 text-sm"
            >
              ¿Ya tienes una cuenta? Inicia sesión aquí.
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
