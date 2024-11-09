// src/app/api/favorites/route.js
import connection from "@/lib/db";
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite'); // Importa el modelo favorito

// Ruta para agregar un producto a los favoritos
router.post('/', async (req, res) => {
  const { userId, product } = req.body;

  try {
    const newFavorite = await Favorite.create({
      userId,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image,
    });
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto a favoritos' });
  }
});

// Ruta para obtener los favoritos del usuario
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const favorites = await Favorite.find({ userId });
    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los favoritos' });
  }
});

// Ruta para eliminar un producto de los favoritos
router.delete('/:productId', async (req, res) => {
  const { userId } = req.query;
  const { productId } = req.params;

  try {
    await Favorite.deleteOne({ userId, productId });
    res.status(200).json({ message: 'Producto eliminado de favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto de favoritos' });
  }
});

module.exports = router;
