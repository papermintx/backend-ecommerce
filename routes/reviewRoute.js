const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addReview, getProductReviews } = require('../controllers/reviewController');

router.post('/', auth, addReview);
router.get('/:productId', getProductReviews);

module.exports = router;
