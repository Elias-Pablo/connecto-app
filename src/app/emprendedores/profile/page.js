"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "@/components/Header-em";
import MetricChart from "@/components/MetricChart";
import { jwtDecode } from "jwt-decode";
import {
  FaEye,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
} from "react-icons/fa"; // Íconos
import Slider from "react-slick"; // Importación del carrusel de react-slick
import "slick-carousel/slick/slick.css"; // Importar estilos de slick-carousel
import "slick-carousel/slick/slick-theme.css"; // Importar tema de slick-carousel

export default function EmprendedorProfile() {
  const [selectedMetric, setSelectedMetric] = useState("weekly");
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    images: ["", "", ""], // Inicializamos un array de tres elementos para las URLs
    stock: 0,
  });
  const [profileInfo, setProfileInfo] = useState({
    avatar: "/avatar.jpg",
    name: "Nombre del Negocio",
    description: "Descripción del negocio",
    website: "",
    direccion: "",
    telefono: "",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token recuperado:", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchProfileInfo = async () => {
        try {
          const profileResponse = await fetch("/api/emprendedores/profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (profileResponse.ok) {
            const data = await profileResponse.json();
            setProfileInfo((prev) => ({
              ...prev,
              name: data.nombre_negocio,
              description: data.descripcion,
              website: data.sitioweb_url,
              direccion: data.direccion,
              telefono: data.telefono,
            }));
          } else {
            console.error("Error al cargar los datos del perfil");
          }

          // Fetch avatar
          const avatarResponse = await fetch("/api/userAvatar", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (avatarResponse.ok) {
            const avatarData = await avatarResponse.json();
            setProfileInfo((prev) => ({
              ...prev,
              avatar: avatarData.usuario_imagen || "/avatar.jpg",
            }));
          } else {
            console.error("Error al cargar el avatar");
          }
        } catch (error) {
          console.error("Error en la solicitud para obtener perfil:", error);
        }
      };

      fetchProfileInfo();
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const saveProfileInfo = async () => {
    try {
      // Update Profile Info
      const profileResponse = await fetch("/api/emprendedores/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_negocio: profileInfo.name,
          descripcion: profileInfo.description,
          direccion: profileInfo.direccion,
          telefono: profileInfo.telefono,
          sitioweb_url: profileInfo.website,
        }),
      });

      if (profileResponse.ok) {
        console.log("Perfil de negocio actualizado correctamente");
      } else {
        console.error("Error al actualizar el perfil de negocio");
      }

      // Update Avatar
      const avatarResponse = await fetch("/api/userAvatar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_imagen: profileInfo.avatar,
        }),
      });

      if (avatarResponse.ok) {
        console.log("Avatar actualizado correctamente");
      } else {
        console.error("Error al actualizar el avatar");
      }

      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error en la solicitud para actualizar perfil:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `/api/auth/products/delete?id=${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Filtrar el producto eliminado de la lista de productos
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        console.log("Producto eliminado exitosamente");
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
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
      images: ["", "", ""], // Si no hay producto, inicializamos con tres elementos vacíos para las URLs
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
          images: currentProduct.images.filter((url) => url), // Filtramos para no enviar URLs vacías
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
    closeProductModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const updatedImages = [...currentProduct.images];
    updatedImages[index] = value;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      images: updatedImages,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/auth/products", { method: "GET" });
        if (response.ok) {
          const data = await response.json();

          // Agrupar productos con el mismo id consolidando sus imágenes
          const productMap = {};
          data.products.forEach((product) => {
            if (productMap[product.id]) {
              if (product.image) {
                productMap[product.id].images.push(product.image);
              }
            } else {
              productMap[product.id] = {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                images: product.image ? [product.image] : [],
              };
            }
          });

          // Convertir el objeto en un array
          const formattedProducts = Object.values(productMap);
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
          <img
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
                className="text-center mt-2 text-blue-500 border-b-2 border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                name="direccion"
                value={profileInfo.direccion}
                onChange={handleProfileChange}
                placeholder="Dirección"
                className="text-center mt-2 text-black border-b-2 border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                name="telefono"
                value={profileInfo.telefono}
                onChange={handleProfileChange}
                placeholder="Teléfono"
                className="text-center mt-2 text-black border-b-2 border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="url"
                name="avatar"
                value={profileInfo.avatar}
                onChange={handleProfileChange}
                placeholder="URL de la foto de perfil"
                className="text-center mt-2 text-black border-b-2 border-gray-300 p-2 rounded-md w-full"
              />
              <button
                onClick={saveProfileInfo}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              >
                Guardar
              </button>
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
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  {profileInfo.website}
                </a>
              )}
              <p className="text-black mt-2">{profileInfo.direccion}</p>
              <p className="text-black mt-2">{profileInfo.telefono}</p>
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
                className="text-center p-5 bg-gray-200 w-auto rounded-lg shadow-lg"
              >
                {product.images && product.images.length > 0 ? (
                  <Slider {...sliderSettings}>
                    {product.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={product.name}
                          className="mx-auto rounded-lg mb-2 w-full h-64 object-cover"
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
                <h4 className="text-black text-xl font-semibold mt-5">
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
                type="number"
                name="stock"
                value={currentProduct.stock || 0}
                onChange={handleInputChange}
                placeholder="Stock disponible"
                className="text-black border p-2 rounded w-full mb-4"
              />
              {[...Array(3)].map((_, index) => (
                <input
                  key={index}
                  type="url"
                  value={currentProduct.images[index] || ""}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder={`URL de la imagen ${index + 1}`}
                  className="text-black border p-2 rounded w-full mb-4"
                />
              ))}
              <p className="text-xs text-gray-500 mb-4">
                Puedes proporcionar hasta 3 URLs de imágenes.
              </p>
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
          <MetricChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Métricas</h2>
          <div className="flex items-center mb-2">
            <FaEye className="text-indigo-500 mr-2" />
            <p>
              <strong>Visitas al Perfil:</strong> {}
            </p>
          </div>
          <div className="flex items-center mb-2">
            <FaShoppingCart className="text-green-500 mr-2" />
            <p>
              <strong>Ventas Totales:</strong> {}
            </p>
          </div>
          <div className="flex items-center mb-2">
            <FaDollarSign className="text-yellow-500 mr-2" />
            <p>
              <strong>Ingresos Totales:</strong> ${}
            </p>
          </div>
          <div className="flex items-center mb-2">
            <FaChartLine className="text-blue-500 mr-2" />
            <p>
              <strong>Tasa de Conversión:</strong> {}%
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
