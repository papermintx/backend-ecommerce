const express = require('express');
const router = express.Router();
const { checkoutWhatsApp } = require('../controllers/orderController');

router.post('/checkout', checkoutWhatsApp);

module.exports = router;
