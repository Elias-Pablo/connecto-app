'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Register() {
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      const response = await fetch('/api/auth/registerem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        alert(data.message)
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Error al registrar emprendedor')
    }
  }

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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="passwordEmp"
                className="border border-gray-300 rounded-md p-1 mb-2 text-black w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2"
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
                    className="icon icon-tabler icon-tabler-eye-off"
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
                    className="icon icon-tabler icon-tabler-eye"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                  </svg>
                )}
              </button>
            </div>

            <label htmlFor="passwordrevalid" className="text-white">
              Repetir Contraseña
            </label>
            <div className="relative">
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                id="passwordrevalid"
                className="border border-gray-300 rounded-md p-1 mb-2 text-black w-full"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-2 top-2"
              >
                {showPasswordConfirm ? (
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
                    className="icon icon-tabler icon-tabler-eye-off"
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
                    className="icon icon-tabler icon-tabler-eye"
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
  )
}
