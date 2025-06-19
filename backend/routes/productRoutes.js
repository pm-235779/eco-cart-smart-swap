// routes/productRoutes.js
import express from 'express';
const router = express.Router();

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getEcoAlternatives,
  getTrendingProducts,
} from '../controllers/productController.js';

import verifyAuth  from '../middleware/auth0Middleware.js';

// Public routes
router.get('/', getProducts);
router.get('/trending', getTrendingProducts);
router.get('/:id', getProduct);
router.get('/:id/eco-alternatives', getEcoAlternatives);

// Admin (optionally protected)
router.post('/', verifyAuth, createProduct);
router.put('/:id', verifyAuth, updateProduct);
router.delete('/:id',  verifyAuth, deleteProduct);

export default router;
