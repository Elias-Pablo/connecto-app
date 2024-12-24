import { useCart } from '../../src/app/context/CartContext'
import Link from 'next/link'
import Slider from 'react-slick' // Importación del carrusel de react-slick
import 'slick-carousel/slick/slick.css' // Importar estilos de slick-carousel
import 'slick-carousel/slick/slick-theme.css'

export default function SearchedProducts({ products }) {
  const { addToCart } = useCart()

  // Formatear el precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Configuración del carrusel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-accent-cream shadow-lg border border-gray-200 gap-5 w-full p-8 mb-4 rounded-lg">
      {products.map((product) => (
        <div
          key={product.id}
          className="text-center p-5 bg-neutral-light w-auto rounded-lg shadow-lg"
        >
          <Link href={`/products/${product.id}`}>
            <div className="cursor-pointer w-full">
              {product.images && product.images.length > 0 ? (
                <Slider {...sliderSettings}>
                  {product.images.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img || '/placeholder.jpg'}
                        alt={`Producto ${index + 1}`}
                        width={250}
                        height={250}
                        className="mx-auto rounded-lg mb-2 w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  src="/placeholder.jpg"
                  alt="Sin imagen"
                  width={250}
                  height={250}
                  className="rounded-lg mb-4 object-cover w-full"
                />
              )}
            </div>
          </Link>

          <div className="w-full text-center mt-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            <p className="text-lg font-bold text-green-600 mt-2">
              Precio: {formatPrice(product.price)}
            </p>
            <p className="text-xs text-gray-500 my-2">
              Vendedor:{' '}
              <Link
                href={`/user/emprendedores/profile?id_perfil=${product.id_perfil}`}
                className="text-sky-500"
              >
                {product.businessName}
              </Link>
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation() // Prevenir que el click en el botón navegue al link del producto
                addToCart(product)
              }}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Agregar al Carro
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
