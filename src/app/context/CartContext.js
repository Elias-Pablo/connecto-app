'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      return storedCart ? JSON.parse(storedCart) : []
    }
    return []
  })

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Sincronizar carrito entre pestañas/navegación
  useEffect(() => {
    const syncCart = (event) => {
      if (event.key === 'cart') {
        const updatedCart = event.newValue ? JSON.parse(event.newValue) : []
        setCartItems(updatedCart)
      }
    }
    window.addEventListener('storage', syncCart)
    return () => {
      window.removeEventListener('storage', syncCart)
    }
  }, [])

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    if (!product || !product.id || !product.price || !product.stock) {
      toast.error('Producto inválido.', { position: 'top-center' })
      return
    }

    let showToast = false // Variable para controlar si se debe mostrar el toast
    let toastMessage = ''

    setCartItems((prevItems) => {
      const updatedCart = [...prevItems]
      const itemIndex = updatedCart.findIndex((item) => item.id === product.id)

      if (itemIndex > -1) {
        const existingItem = updatedCart[itemIndex]
        if (existingItem.quantity + 1 > product.stock) {
          toastMessage = 'Has alcanzado el límite de stock disponible.'
          return prevItems
        }
        updatedCart[itemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        }
      } else {
        if (product.stock <= 0) {
          toastMessage = 'El producto está agotado.'
          return prevItems
        }
        updatedCart.push({ ...product, quantity: 1 })
        showToast = true // Mostrar toast si se agregó un nuevo producto
        toastMessage = 'Producto agregado al carrito.'
      }

      return updatedCart
    })

    // Mostrar el toast fuera de setState
    if (showToast) {
      toast.success(toastMessage, { position: 'top-center' })
    } else if (toastMessage) {
      toast.error(toastMessage, { position: 'top-center' })
    }
  }

  // Reducir cantidad del producto en el carrito
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId) {
            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null // Remover si la cantidad llega a 0
          }
          return item
        })
        .filter((item) => item !== null)
    )
  }

  // Remover producto del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    )
    toast.info('Producto eliminado del carrito.', { position: 'top-center' })
  }

  // Calcular el subtotal del carrito
  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Calcular el total del carrito (puedes agregar impuestos aquí si es necesario)
  const calculateTotal = () => calculateSubtotal()

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        setCartItems, // <-- Exponemos setCartItems
        decreaseQuantity,
        removeFromCart,
        calculateSubtotal,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
