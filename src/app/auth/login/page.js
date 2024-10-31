"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Importar decodificador de JWT

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidad
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        // Guardar el token en localStorage
        localStorage.setItem("token", data.token);

        // Decodificar el token para obtener el tipo de usuario
        const decoded = jwtDecode(data.token);

        // Redirigir según el tipo de usuario
        if (decoded.tipo_usuario === "emprendedor") {
          router.push("/emprendedores/profile");
        } else {
          router.push("/"); // Página para usuarios regulares
        }

        router.refresh();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error de conexión.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 p-5">
      <Link href="/">
        <Image
          src="/ConnecTo-logo.png"
          alt="ConnecTo Logo"
          width={250}
          height={250}
          className="mb-10"
        />
      </Link>
      <form
        onSubmit={handleLogin}
        className="bg-fuchsia-600 w-full max-w-md p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl text-center font-bold text-white mb-6">
          Iniciar Sesión
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div className="mb-6 relative ">
          <label htmlFor="password" className="block text-white mb-2">
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"} // Cambia el tipo de input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
            placeholder="********"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Alterna visibilidad
            className="absolute right-3 top-10"
          >
            {showPassword ? (
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                <path d="M3 3l18 18" />
              </svg>
            ) : (
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-eye"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
              </svg>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-sky-400 hover:bg-sky-700 text-white font-semibold rounded-md transition-colors"
        >
          Iniciar Sesión
        </button>
        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
      </form>
    </div>
  );
}
