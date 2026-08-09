import { Router } from 'express';
import {
  listProducts,
  getProduct,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { uploadImages } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/', asyncHandler(listProducts));
router.get('/id/:id', requireAdmin, asyncHandler(getProductById));
router.get('/:slug', asyncHandler(getProduct));

router.post('/', requireAdmin, uploadImages, asyncHandler(createProduct));
router.put('/:id', requireAdmin, uploadImages, asyncHandler(updateProduct));
router.delete('/:id', requireAdmin, asyncHandler(deleteProduct));

export default router;
