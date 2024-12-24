'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation' // Cambio de useRouter a useParams
import { useCart } from '@/app/context/CartContext'
import Header from '@/components/Header-us'
import Slider from 'react-slick' // Importación del carrusel de react-slick
import 'slick-carousel/slick/slick.css' // Importar estilos de slick-carousel
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

export default function ProductDetail() {
  const { id } = useParams() // Obtiene el ID del producto desde la URL usando useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    comentario: '',
    calificacion: 0,
  })
  const { addToCart } = useCart()

  useEffect(() => {
    if (!id) return

    // Fetch producto
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data.product)
        } else {
          console.error('Error al obtener el producto')
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    // Fetch reseñas
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/products/${id}`)
        if (response.ok) {
          const data = await response.json()
          setReviews(data.reviews)
        } else {
          console.error('Error al obtener las reseñas')
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchProductData()
    fetchReviews()
  }, [id])

  const handleReviewSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/reviews/products/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      })

      if (response.ok) {
        setReviews([...reviews, { ...newReview, fecha_creacion: new Date() }])
        setNewReview({ comentario: '', calificacion: 0 }) // Limpiar el formulario
      } else {
        console.error('Error al agregar reseña')
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  // Configuración para el carrusel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-500 font-medium">
          Cargando Producto...
        </p>
      </div>
    )
  }

  // Función para renderizar las estrellas
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      )
    }
    return stars
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-10">
        {/* Contenedor principal */}
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md p-6 space-y-6 lg:space-x-6">
          {/* Sección de imágenes */}
          <div className="text-center p-5 bg-gray-200 w-1/2 rounded-lg shadow-lg">
            {product.images && product.images.length > 0 ? (
              <Slider {...sliderSettings}>
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={product.name}
                      className="mx-auto rounded-lg mb-2  w-full h-72 object-cover"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                src="/placeholder.webp"
                alt="Sin imagen"
                className="mx-auto rounded-lg mb-2 w-full h-64 object-cover"
              />
            )}
          </div>

          {/* Sección de información del producto */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-black">{product.name}</h1>
            <p className="text-gray-700 text-lg">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600">
              {new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP',
              }).format(product.price)}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Agregar al Carrito
            </button>

            {/* Información del Emprendedor */}
            {product.business && (
              <div className="mt-10 p-6 border rounded-lg bg-gray-100">
                <h2 className="text-xl font-bold mb-2 text-black">
                  Información del Emprendedor
                </h2>
                <p className="text-gray-700">
                  Vendedor:{' '}
                  <Link
                    href={`/user/emprendedores/profile?id_perfil=${product.business.id_perfil}`}
                    className="text-sky-500"
                  >
                    {product.business.name}
                  </Link>
                </p>
                <p className="text-gray-700">
                  Dirección: {product.business.address || 'No disponible'}
                </p>
                <p className="text-gray-700">
                  Teléfono: {product.business.phone || 'No disponible'}
                </p>
                {product.business.website && (
                  <a
                    href={product.business.website}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visitar sitio web
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sección de Reseñas */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Reseñas</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-b py-4">
                <p className="flex">
                  <strong>{review.nombre_usuario}</strong> -{' '}
                  {renderStars(review.calificacion)}
                </p>
                <p>{review.comentario}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.fecha_creacion).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No hay reseñas para este producto.</p>
          )}

          <h3 className="text-xl font-semibold mt-6">Agregar una reseña</h3>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              name="comentario"
              value={newReview.comentario}
              onChange={(e) =>
                setNewReview({ ...newReview, comentario: e.target.value })
              }
              placeholder="Escribe tu comentario"
              className="w-full p-2 border rounded mb-4"
              required
            />
            <div className="mb-4">
              <label className="mr-2">Calificación:</label>
              <select
                name="calificacion"
                value={newReview.calificacion}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    calificacion: parseInt(e.target.value),
                  })
                }
                className="p-2 border rounded"
                required
              >
                <option value="0">Seleccionar calificación</option>
                <option value="1" className="text-center">
                  ⭐
                </option>
                <option value="2" className="text-center">
                  ⭐⭐
                </option>
                <option value="3" className="text-center">
                  ⭐⭐⭐
                </option>
                <option value="4" className="text-center">
                  ⭐⭐⭐⭐
                </option>
                <option value="5" className="text-center">
                  ⭐⭐⭐⭐⭐
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Enviar Reseña
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
