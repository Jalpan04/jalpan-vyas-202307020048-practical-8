const express = require('express');
const {
  processPayment,
  processRefund,
  getPaymentStatus,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/checkout', protect, processPayment);
router.post('/refund', protect, processRefund);
router.get('/status/:transactionId', protect, getPaymentStatus);

module.exports = router;
