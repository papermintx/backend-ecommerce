const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/authMiddleware');
const {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
} = require('../controllers/productController');

const admin = require('../middleware/adminMiddleware');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

const resizeImages = require('../middleware/imageResize');

// Admin routes (Protected)
const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]);

router.post('/', auth, admin, cpUpload, resizeImages, createProduct);
router.put('/:id', auth, admin, cpUpload, resizeImages, updateProduct);
router.delete('/:id', auth, admin, deleteProduct);

module.exports = router;
