const { validationResult } = require('express-validator');
const Product = require('../models/Product');
const { cloudinary } = require('../config/cloudinary');

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate('createdBy', 'name email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/products (protected)
const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, description, price, category, stock } = req.body;

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock) || 0,
      createdBy: req.user._id,
    };

    // If image was uploaded to Cloudinary via multer
    if (req.file) {
      productData.imageUrl = req.file.path;
      productData.imagePublicId = req.file.filename;
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/products/:id (protected)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    // Only creator can update
    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized to update this product' });
    }

    // If new image uploaded, delete old one from Cloudinary first
    if (req.file) {
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }
      req.body.imageUrl = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/products/:id (protected)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized to delete this product' });
    }

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/products/upload-image (protected)
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: 'No image file provided' });
  }

  res.status(200).json({
    success: true,
    message: 'Image uploaded to Cloudinary successfully',
    data: {
      imageUrl: req.file.path,
      publicId: req.file.filename,
    },
  });
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
