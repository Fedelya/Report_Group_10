const paymentService = require('../services/paymentService');

exports.createPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body;
        const payment = await paymentService.createPayment(orderId, amount);
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment', error });
    }
};

exports.getPayment = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment', error });
    }
};