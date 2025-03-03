const paymentService = require('../services/paymentService');

class PaymentController {
    async createPayment(req, res) {
        try {
            const { orderId, amount } = req.body;
            if (!orderId || !amount) {
                return res.status(400).json({ message: 'orderId and amount are required' });
            }
            const payment = await paymentService.createPayment(orderId, amount);
            res.status(201).json(payment);
        } catch (error) {
            res.status(500).json({ message: 'Error creating payment', error: error.message });
        }
    }

    async getPayments(req, res) {
        try {
            const payments = await paymentService.getAllPayments();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching payments', error: error.message });
        }
    }
}

module.exports = new PaymentController();