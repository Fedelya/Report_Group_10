const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// GET /payments - Lấy danh sách payments
router.get('/', paymentController.getPayments);

// POST /payments - Tạo payment mới
router.post('/', paymentController.createPayment);

module.exports = router;