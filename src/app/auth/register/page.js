'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(null)

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmpassword) {
      return alert('Las contraseñas no coinciden')
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const errorData = await res.json()
        setApiError(errorData.message || 'Error al registrar usuario')
        return
      }

      setApiError(null)
      setApiSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.')
    } catch (error) {
      console.error('Error en la solicitud:', error)
      setApiError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.')
    }
  })

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

            {apiError && (
              <p className="text-red-400 text-center mb-4">{apiError}</p>
            )}
            {apiSuccess && (
              <p className="text-green-400 text-center mb-4">{apiSuccess}</p>
            )}

            <label htmlFor="name" className="text-white">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="name"
              placeholder="tuNombredeUsuario123"
              className="border border-gray-300 rounded-md p-2 mb-2 text-black placeholder:text-xs placeholder:italic placeholder:font-thin"
              {...register('username', {
                required: 'Este campo es obligatorio',
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
              {...register('email', {
                required: 'Este campo es obligatorio',
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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="********"
                className="border border-gray-300 rounded-md p-2 mb-2 text-black placeholder:text-xs placeholder:italic placeholder:font-thin w-full"
                {...register('password', {
                  required: 'Este campo es obligatorio',
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2"
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
            {errors.password && (
              <span className="text-red-300 text-xs">
                {errors.password.message}
              </span>
            )}

            <label htmlFor="passwordrevaliduser" className="text-white">
              Repetir Contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="********"
                id="passwordrevaliduser"
                className="border border-gray-300 rounded-md p-2 mb-2 text-black placeholder:text-xs placeholder:italic placeholder:font-thin w-full"
                {...register('confirmpassword', {
                  required: 'Este campo es obligatorio',
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2"
              >
                {showConfirmPassword ? (
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
            <Link
              href="/auth/login"
              className="underline text-center mt-4 text-white hover:text-sky-300 text-sm"
            >
              ¿Ya tienes una cuenta? Inicia sesión aquí.
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}
