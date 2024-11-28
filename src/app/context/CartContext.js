"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    // Solo accede a localStorage si estamos en el lado cliente
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  useEffect(() => {
    // Guardar en localStorage cada vez que cambia el carrito
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        if (itemExists.quantity + 1 > product.stock) {
          toast.error("Has alcanzado el límite de stock disponible.", {
            position: "top-center",
          });
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        if (product.stock <= 0) {
          toast.error("El producto está agotado.", { position: "top-center" });
          return prevItems;
        }
        toast.success("Producto agregado al carrito.", { position: "top-center" });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId) {
            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Nueva función para actualizar cantidades
  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item
      )
    );
    if (quantity > 0) {
      toast.success("Cantidad actualizada.", { position: "top-center" });
    } else {
      toast.error("Cantidad no válida.", { position: "top-center" });
    }
  };

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const calculateTax = () => calculateSubtotal() * 0.19;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        updateQuantity, // Se expone la nueva función
        calculateSubtotal,
        calculateTax,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
