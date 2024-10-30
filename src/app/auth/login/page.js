"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        document.cookie = `token=${data.token}; path=/; max-age=3600`;

        localStorage.setItem("token", data.token);
        router.push("/");
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
      <h1 className="text-2xl font-bold text-white mb-6">Iniciar Sesión</h1>
      <form
        onSubmit={handleLogin}
        className="bg-fuchsia-600 w-full max-w-md p-8 rounded-lg shadow-lg"
      >
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
        <div className="mb-6">
          <label htmlFor="password" className="block text-white mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
            placeholder="********"
            required
          />
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
