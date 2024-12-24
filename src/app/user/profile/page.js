'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header-us'
import { CartProvider } from '@/app/context/CartContext'

export default function HeaderUser() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    profilePicture: '/avatar.jpg', // Ruta predeterminada para la foto de perfil
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const data = await response.json()
          setUserInfo({
            name: data?.name,
            email: data?.email,
            profilePicture: data?.profilePicture || '/avatar.jpg',
          })
        } else {
          console.error('Error al cargar los datos del usuario')
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      })

      if (response.ok) {
        setIsEditing(false)
      } else {
        console.error('Error al actualizar los datos del usuario')
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }
  if (!userInfo) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-500 font-medium">
          Cargando tu perfil...
        </p>
      </div>
    )
  }

  return (
    <CartProvider>
      <Header />
      <section className="user-profile flex flex-col items-center justify-center py-10">
        <div className="user-profile-principal bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-lg flex flex-col items-center ">
          <div className="user-profile-principal-image mx-auto mb-4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-fuchsia-700 shadow-lg">
              <img src={userInfo.profilePicture} alt="User Profile" />
            </div>
          </div>
          <div className="user-profile-principal-info text-black">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="border  border-gray-700 p-2 rounded mb-2 w-full"
                  placeholder="Nombre de usuario"
                />
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="border border-gray-700 p-2 rounded mb-2 w-full"
                  placeholder="Correo electrónico"
                />
                <input
                  type="text"
                  name="profilePicture"
                  value={userInfo.profilePicture}
                  onChange={handleInputChange}
                  className="border border-gray-700 p-2 rounded mb-2 w-full"
                  placeholder="URL de la foto de perfil"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2 gap-2">
                  <span className="font-semibold text-zinc-600 text-base">
                    Nombre de usuario:{' '}
                  </span>
                  {userInfo.name}
                </h1>
                <p className="text-sm gap-2">
                  <span className="text-zinc-600 text-base ">Correo:{''}</span>
                  {userInfo.email}
                </p>
              </>
            )}
          </div>
          <div className="user-profile-info-buttons mt-6 flex justify-center space-x-4">
            <button
              onClick={isEditing ? handleSave : handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              {isEditing ? 'Guardar' : 'Editar'}
            </button>
          </div>
        </div>
      </section>
    </CartProvider>
  )
}
