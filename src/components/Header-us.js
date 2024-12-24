import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { jwtDecode } from 'jwt-decode' // Cambiado a jwt_decode para evitar errores de importación
import { useRouter } from 'next/navigation'
import { useCart, CartProvider } from '../../src/app/context/CartContext'
import { document } from 'postcss'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Header() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const [profilePicture, setProfilePicture] = useState('/avatar.jpg')

  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState([])

  const [unreadMessages, setUnreadMessages] = useState(0) // Mensajes no leídos
  const [chats, setChats] = useState([]) // Chats con clientes

  // Fetch inicial para obtener chats y mensajes no leídos
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const token = localStorage.getItem('token') // Obtener el token desde localStorage
        const response = await fetch('/api/chat/unread', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token correctamente en el encabezado Authorization
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUnreadMessages(data.totalUnread || 0)
          setChats(data.chats || [])
        } else {
          console.error('Error al obtener mensajes no leídos')
        }
      } catch (error) {
        console.error('Error al fetchear mensajes no leídos:', error)
      }
    }

    fetchUnreadMessages()
  }, [])

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
  }
  const handleCheckout = () => {
    router.push('/user/checkout')
  }

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
    setUnreadCount(unreadCount - 1)
  }

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    )
  }
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const [cartVisible, setCartVisible] = useState(false)
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    calculateSubtotal,
    calculateTotal,
    updateQuantity,
  } = useCart()
  const toggleCart = () => setCartVisible(!cartVisible)

  // Efecto para recuperar y decodificar el token desde localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('Token recuperado:', token)

    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
        console.log('Usuario decodificado:', user)
      } catch (error) {
        console.error('Token inválido:', error)
        localStorage.removeItem('token')
      }
    }
  }, [])
  const handleViewMessages = () => {
    router.push('/user/mensajes') // Página que muestra los chats
  }
  const handleClickonAvatar = () => {
    if (user.tipo_usuario === 'emprendedor') {
      router.push('/emprendedores/profile')
    } else {
      router.push('/user/profile')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    document.cookie = 'token=; Max-Age=0; Path=/;'
    setUser(null)
    router.push('/')
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    if (user) {
      const fetchUserAvatar = async () => {
        try {
          const response = await fetch('/api/userAvatar')
          if (response.ok) {
            const data = await response.json()
            console.log('Imagen de perfil:', data.usuario_imagen)
            setProfilePicture(data.usuario_imagen)
          } else {
            console.error('Error al obtener la imagen de perfil')
          }
        } catch (error) {
          console.error('Error en la solicitud de imagen de perfil:', error)
        }
      }
      fetchUserAvatar()
    }
  }, [user])

  return (
    <>
      <CartProvider>
        <header className="bg-primary text-accent-cream px-6 flex items-center justify-center">
          <div className="flex h-20 items-center justify-between w-full">
            <Link href="/">
              <Image
                src="/ConnecTo-logo-horizontal2.png"
                alt="ConnecTo Logo"
                width={250}
                height={50}
                className="drop-shadow-sm cursor-pointer"
              />
            </Link>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center">
                  <a
                    onClick={handleClickonAvatar}
                    className="flex justify-center items-center gap-2"
                  >
                    <img
                      src={profilePicture || '/avatar.jpg'}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                    />

                    <span className="text-white font-semibold mr-4">
                      {user.username}
                    </span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                  >
                    Cerrar Sesión
                  </button>

                  {/* Menu de hamburguesa */}
                  <button
                    onClick={toggleMenu}
                    className="text-white ml-4 p-2 rounded-md hover:bg-fuchsia-700 transition-colors duration-300"
                  >
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
                      className="feather feather-menu"
                    >
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                  {menuOpen && (
                    <div className="absolute top-16 right-6 bg-white rounded-md shadow-lg p-4 w-40 z-20">
                      <Link href="/user/orders">
                        <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                          Pedidos
                        </p>
                      </Link>
                      <Link href="/user/favorites">
                        <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                          Favoritos
                        </p>
                      </Link>
                      <a onClick={handleClickonAvatar}>
                        <p className="text-black hover:text-fuchsia-800 cursor-pointer py-2">
                          Perfil
                        </p>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/user/emprendedores"
                    className="text-xs md:text-base text-sky-300 hover:text-sky-500 py-2 mr-4 font-bold"
                  >
                    Registrar mi negocio
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-fuchsia-600 px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white mr-2 hover:bg-fuchsia-900 transition-colors"
                  >
                    Regístrate
                  </Link>
                  <Link
                    href="/auth/login"
                    className="bg-sky-400 px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white hover:bg-sky-700 transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                </>
              )}
              <button
                onClick={toggleCart}
                className="ml-2 bg-green-400 px-4 py-2  mx-4 text-xs md:text-base rounded-xl font-semibold text-white hover:bg-green-700 transition-colors"
              >
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
                  className="icon icon-tabler icon-tabler-shopping-cart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19a2 2 0 1 0 4 0 2 2 0 1 0 -4 0" />
                  <path d="M17 19a2 2 0 1 0 4 0 2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </button>
              <button
                className="relative flex items-center justify-center py-2 px-4 rounded-xl bg-yellow-500 hover:bg-yellow-700 transition"
                onClick={handleViewMessages}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
                </svg>
                {unreadMessages > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                    {unreadMessages}
                  </span>
                )}
              </button>
            </div>
          </div>
          {/* Ícono de notificaciones */}

          <div className="relative ml-4">
            <button
              onClick={toggleNotifications}
              className="bg-blue-400 px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white hover:bg-blue-700 transition-colors relative"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-bell"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
              </svg>
            </button>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            {notificationsOpen && (
              <div className="absolute top-12 right-0 bg-white rounded-md shadow-lg p-4 w-64 z-20">
                <h3 className="text-black font-semibold mb-2">
                  Notificaciones
                </h3>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-2 border-b ${
                        notification.read ? 'bg-gray-100' : 'bg-gray-50'
                      }`}
                    >
                      <p className="text-black">{notification.message}</p>
                      <div className="flex justify-end gap-2 mt-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-500 text-sm"
                          >
                            Marcar como leído
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-500 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-black text-sm">No hay notificaciones</p>
                )}
              </div>
            )}
          </div>
        </header>
        {cartVisible && (
          <div className="fixed z-20 right-0 top-0 w-full sm:w-1/3 h-full bg-white shadow-lg p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform rounded-xl translate-x-0 border border-neutral-400">
            <h2 className="text-xl text-black font-bold mb-4 flex justify-center items-center gap-2">
              Carrito de Compras
            </h2>
            {cartItems.length > 0 ? (
              <ul className="text-black space-y-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0]
                            : '/placeholder.jpg'
                        }
                        alt={item.name}
                        width={50}
                        height={50}
                        className="mr-4"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Precio: {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center mt-2 gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="bg-gray-300 px-2 py-1 rounded"
                          >
                            -
                          </button>
                          {/* Input para escribir la cantidad */}
                          <input
                            type="number"
                            min="1"
                            max={item.stock}
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = Number(e.target.value)
                              if (
                                newQuantity > 0 &&
                                newQuantity <= item.stock
                              ) {
                                updateQuantity(item.id, newQuantity)
                              } else if (newQuantity > item.stock) {
                                toast.error(
                                  'No puedes superar el stock disponible.',
                                  {
                                    position: 'top-center',
                                  }
                                )
                              }
                            }}
                            className="border rounded w-12 text-center"
                          />
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-gray-300 px-2 py-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Tu carrito está vacío.</p>
            )}
            <div className="mt-6">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal:</p>
                <p className="font-semibold text-black">
                  {formatPrice(calculateSubtotal())}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xl font-bold text-black">Total:</p>
                <p className="text-xl font-bold text-black">
                  {formatPrice(calculateTotal())}
                </p>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-green-500 px-4 py-2 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out"
            >
              Proceder al Pago
            </button>
            <button
              onClick={toggleCart}
              className="mt-4 w-full bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out"
            >
              Cerrar
            </button>
          </div>
        )}
      </CartProvider>
    </>
  )
}
