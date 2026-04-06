const express = require('express');
const { body } = require('express-validator');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Protected routes
router.post(
  '/',
  protect,
  upload.single('image'),
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('category')
      .isIn(['electronics', 'clothing', 'food', 'books', 'other'])
      .withMessage('Category must be one of: electronics, clothing, food, books, other'),
  ],
  createProduct
);

router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

// Standalone image upload endpoint
router.post('/upload-image', protect, upload.single('image'), uploadImage);

module.exports = router;
