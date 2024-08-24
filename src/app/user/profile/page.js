"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header-us";

export default function HeaderUser() {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [favoriteEntrepreneurs, setFavoriteEntrepreneurs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "Nombre de Usuario",
        birthDate: "01/01/2000",
        country: "País"
    });

    const addFavoriteProduct = (product) => {
        setFavoriteProducts([
            ...favoriteProducts,
            { ...product, id: Date.now() + Math.random() } // Genera un ID único
        ]);
    };

    const removeFavoriteProduct = (id) => {
        setFavoriteProducts(favoriteProducts.filter((fav) => fav.id !== id));
    };

    const addFavoriteEntrepreneur = (entrepreneur) => {
        setFavoriteEntrepreneurs([
            ...favoriteEntrepreneurs,
            { ...entrepreneur, id: Date.now() + Math.random() } // Genera un ID único
        ]);
    };

    const removeFavoriteEntrepreneur = (id) => {
        setFavoriteEntrepreneurs(favoriteEntrepreneurs.filter((fav) => fav.id !== id));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const productExample = {
        name: "Café Orgánico",
        image: "/productos.jpeg",
        description: "Un café de origen colombiano, 100% orgánico y de gran sabor."
    };

    const entrepreneurExample = {
        name: "María García",
        profession: "Diseñadora Gráfica",
        image: "/imagenpromo.jpeg"
    };

    return (
        <>
            <Header />
            <section className="user-profile flex flex-col items-center justify-center py-10">
                <div className="user-profile-principal bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-lg">
                    <div className="user-profile-principal-image mx-auto mb-4">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-fuchsia-700 shadow-lg">
                            <Image src="/imagenpromo.jpeg" alt="User Profile" layout="fill" objectFit="cover" />
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
                                    className="border p-2 rounded mb-2 w-full"
                                />
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={userInfo.birthDate}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded mb-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={userInfo.country}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded mb-2 w-full"
                                />
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold mb-2">{userInfo.name}</h1>
                                <p className="text-sm">{userInfo.birthDate}</p>
                                <p className="text-sm">{userInfo.country}</p>
                            </>
                        )}
                    </div>
                    <div className="user-profile-info-buttons mt-6 flex justify-center space-x-4">
                        <button
                            onClick={handleEditToggle}
                            className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                        >
                            
                            {isEditing ? "Guardar" : "Editar"}
                        </button>
                    </div>
                </div>
            </section>

            {/* Sección de Productos Favoritos */}
            <section className="user-profile-prodFav bg-gray-100 p-6">
                <div className="user-profile-prodFav-container">
                    <h2 className="text-xl font-semibold mb-4 text-center text-black">Productos Favoritos</h2>
                    <button
                        onClick={() => addFavoriteProduct(productExample)}
                        className="bg-blue-500 text-black px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition-transform transform hover:scale-105"
                    >
                        Añadir Producto
                    </button>
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map((fav) => (
                            <div
                                key={fav.id}
                                className="user-profile-prodFav-item bg-white p-6 rounded-lg shadow mb-6 transition-all hover:shadow-lg"
                            >
                                <div className="flex">
                                    <Image src={fav.image} alt={fav.name} width={150} height={150} className="rounded-lg" />
                                    <div className="ml-6">
                                        <h3 className="text-lg font-semibold text-black">{fav.name}</h3>
                                        <p className="text-sm text-gray-600">{fav.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFavoriteProduct(fav.id)}
                                    className="mt-4 bg-red-500 text-black px-3 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-black">No tienes productos favoritos.</p>
                    )}
                </div>
            </section>

            {/* Sección de Emprendedores Favoritos */}
            <section className="user-profile-entrepreneursFav bg-gray-200 p-6">
                <div className="user-profile-entrepreneursFav-container">
                    <h2 className="text-xl font-semibold mb-4 text-center text-black">Emprendedores Favoritos</h2>
                    <button
                        onClick={() => addFavoriteEntrepreneur(entrepreneurExample)}
                        className="bg-green-500 text-black px-4 py-2 rounded-lg mb-4 hover:bg-green-600 transition-transform transform hover:scale-100"
                    >
                        Añadir Emprendedor
                    </button>
                    {favoriteEntrepreneurs.length > 0 ? (
                        favoriteEntrepreneurs.map((fav) => (
                            <div
                                key={fav.id}
                                className="user-profile-entrepreneursFav-item bg-white p-4 rounded-lg shadow mb-4 flex items-center transition-all hover:shadow-lg"
                            >
                                <Image src={fav.image} alt={fav.name} width={50} height={50} className="rounded-full" />
                                <div className="ml-4">
                                    <h4 className="text-lg font-semibold text-black">{fav.name}</h4>
                                    <p className="text-sm text-gray-500">{fav.profession}</p>
                                </div>
                                <button
                                    onClick={() => removeFavoriteEntrepreneur(fav.id)}
                                    className="ml-auto bg-red-500 text-black px-3 py-1 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-black">No tienes emprendedores favoritos.</p>
                    )}
                </div>
            </section>
        </>
    );
}
