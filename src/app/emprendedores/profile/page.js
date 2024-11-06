"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "@/components/Header-em";
import MetricChart from "@/components/MetricChart";

export default function EmprendedorProfile() {
  const [selectedMetric, setSelectedMetric] = useState("weekly");
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    url_imagen: "", // Campo para URL de imagen en lugar de id_imagen
    stock: 0,
  });
  const [profileInfo, setProfileInfo] = useState({
    avatar: "/avatar.jpg",
    name: "Avatar",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    website: "",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const saveProfileInfo = () => {
    setIsEditingProfile(false);
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const openProductModal = (
    product = {
      id: null,
      name: "",
      description: "",
      price: "",
      url_imagen: "", // Resetear la URL de la imagen al abrir el modal
      stock: 0,
    }
  ) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProduct = async () => {
    try {
      const method = currentProduct.id ? "PUT" : "POST";
      const endpoint = currentProduct.id
        ? `/api/auth/products/${currentProduct.id}`
        : "/api/auth/products";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentProduct.id,
          name: currentProduct.name,
          description: currentProduct.description,
          price: currentProduct.price,
          stock: currentProduct.stock || 0,
          url_imagen: currentProduct.url_imagen || null, // Enviar la URL de la imagen en la solicitud
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (method === "PUT") {
          setProducts(
            products.map((product) =>
              product.id === currentProduct.id ? { ...currentProduct } : product
            )
          );
        } else {
          setProducts([...products, { ...currentProduct, id: data.id }]);
        }
        console.log("Producto guardado exitosamente");
      } else {
        console.error("Error al guardar el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/auth/products", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          const formattedProducts = data.products.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image: product.image,
          }));
          setProducts(formattedProducts);
        } else {
          console.error("Error al cargar productos");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProducts();
  }, []);

  const metricData = {
    daily: {
      visits: [50, 70, 80, 90, 60, 75, 85],
      sales: [10, 15, 12, 18, 20, 22, 25],
    },
    weekly: {
      visits: [300, 450, 600, 700, 500, 550, 700],
      sales: [50, 70, 80, 90, 100, 110, 120],
    },
    monthly: {
      visits: [1000, 1200, 1500, 1400, 1300, 1700, 1800],
      sales: [150, 170, 200, 220, 240, 260, 280],
    },
  };

  const mostViewedProduct = {
    image: "/zapato.jpg",
    name: "Producto Ejemplo",
    views: 1234,
    price: "$19.99",
  };

  return (
    <>
      <Header />
      <div className="p-10">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            {isEditingProfile ? "Guardar" : "Editar Perfil"}
          </button>
        </div>

        <div className="text-center mb-12">
          <Image
            src={profileInfo.avatar}
            alt="avatar"
            width={128}
            height={128}
            className="rounded-full mx-auto"
          />
          {isEditingProfile ? (
            <>
              <input
                type="text"
                name="name"
                value={profileInfo.name}
                onChange={handleProfileChange}
                placeholder="Nombre"
                className="text-black text-center mt-4 text-2xl font-semibold border-b-2 border-gray-300 p-2 rounded-md"
              />
              <textarea
                name="description"
                value={profileInfo.description}
                onChange={handleProfileChange}
                placeholder="Descripción del perfil"
                className="text-black text-center mt-2 border-b-2 border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="url"
                name="website"
                value={profileInfo.website}
                onChange={handleProfileChange}
                placeholder="URL de la tienda en línea"
                className=" text-center mt-2 text-blue-500 border-b-2 border-gray-300 p-2 rounded-md w-full"
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mt-4">
                {profileInfo.name}
              </h2>
              <p className="text-gray-500 mt-2">{profileInfo.description}</p>
              {profileInfo.website && (
                <a
                  href={profileInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  {profileInfo.website}
                </a>
              )}
            </>
          )}
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold">Productos Publicados</h3>
            <button
              onClick={() => openProductModal()}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              Agregar Producto
              <svg
                className="ml-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24V24H0z" fill="none" />
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="text-center p-5 bg-gray-200 rounded-lg shadow-lg"
              >
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  width={200}
                  height={150}
                  className="mx-auto"
                />
                <h4 className="text-black text-xl  font-semibold mt-3">
                  {product.name}
                </h4>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-blue-500 font-semibold mt-2">
                  {formatPrice(product.price)}
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => openProductModal(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Agregar/Editar Producto */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-2xl font-semibold mb-4">
                {currentProduct.id ? "Editar Producto" : "Agregar Producto"}
              </h3>

              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
                placeholder="Nombre del producto"
                className="text-black border p-2 rounded w-full mb-4"
              />
              <textarea
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
                placeholder="Descripción"
                className="text-black border p-2 rounded w-full mb-4"
              />
              <input
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
                placeholder="Precio"
                className="text-black border p-2 rounded w-full mb-4"
              />
              <input
                type="text"
                name="url_imagen" // Asegúrate de que el nombre coincida con el back-end
                value={currentProduct.url_imagen}
                onChange={handleInputChange}
                placeholder="URL de la imagen"
                className="text-black border p-2 rounded w-full mb-4"
              />
              <input
                type="number"
                name="stock"
                value={currentProduct.stock || 0}
                onChange={handleInputChange}
                placeholder="Stock disponible"
                className="text-black border p-2 rounded w-full mb-4"
              />
              <button
                onClick={handleSaveProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Guardar
              </button>
              <button
                onClick={closeProductModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Métricas y Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-fuchsia-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-center text-xl font-semibold mb-5 text-white">
              Métricas y Estadísticas
            </h3>
            <div className="flex justify-center space-x-4 mb-5">
              <button
                className={`px-4 py-2 rounded-lg ${
                  selectedMetric === "daily"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
                onClick={() => setSelectedMetric("daily")}
              >
                Diario
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  selectedMetric === "weekly"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
                onClick={() => setSelectedMetric("weekly")}
              >
                Semanal
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  selectedMetric === "monthly"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
                onClick={() => setSelectedMetric("monthly")}
              >
                Mensual
              </button>
            </div>
            <MetricChart data={metricData[selectedMetric]} />
          </div>

          <div className="bg-sky-500 p-6 rounded-xl shadow-lg">
            <h3 className="text-center text-xl font-semibold mb-5 text-white">
              Producto Más Visto
            </h3>
            <div className="text-center bg-white p-4 rounded-lg shadow-md">
              <Image
                src={mostViewedProduct.image}
                alt={mostViewedProduct.name}
                width={200}
                height={150}
                className="mx-auto"
              />
              <h4 className="text-lg font-semibold mt-3 text-black">
                {mostViewedProduct.name}
              </h4>
              <p className="text-black">Vistas: {mostViewedProduct.views}</p>
              <p className="text-black font-semibold mt-2">
                {mostViewedProduct.price}
              </p>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                Ver más
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
