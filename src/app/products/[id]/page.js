"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Cambio de useRouter a useParams
import { useCart } from "@/app/context/CartContext";
import Header from "@/components/Header-us";
import Slider from "react-slick"; // Importación del carrusel de react-slick
import "slick-carousel/slick/slick.css"; // Importar estilos de slick-carousel
import "slick-carousel/slick/slick-theme.css";
import jwtDecode from "jwt-decode";
import Link from "next/link";

export default function ProductDetail() {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL usando useParams()
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    // Fetch producto
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        } else {
          console.error("Error al obtener el producto");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProductData();
  }, [id]);

  if (!product) {
    return <div>Cargando producto...</div>;
  }

  // Configuración para el carrusel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  // Combinar la imagen principal con las adicionales
  const images = [product.mainImage, ...(product.additionalImages || [])];

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
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
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
                  Vendedor:{" "}
                  <Link
                    href={`/user/emprendedores/profile?id_perfil=${product.business.id_perfil}`}
                    className="text-sky-500"
                  >
                    {product.business.name}
                  </Link>
                </p>
                <p className="text-gray-700">
                  Dirección: {product.business.address || "No disponible"}
                </p>
                <p className="text-gray-700">
                  Teléfono: {product.business.phone || "No disponible"}
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
      </div>
    </>
  );
}
