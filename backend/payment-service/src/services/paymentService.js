const Payment = require('../models/payment');

class PaymentService {
    async createPayment(orderId, amount) {
        const payment = new Payment({ orderId, amount });
        return await payment.save();
    }

    async getPaymentById(id) {
        return await Payment.findById(id);
    }
}

module.exports = new PaymentService();