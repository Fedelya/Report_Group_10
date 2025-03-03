const Payment = require('../models/payment');

class PaymentService {
    async createPayment(orderId, amount) {
        const payment = new Payment({
            orderId,
            amount,
        });
        return await payment.save();
    }

    async getAllPayments() {
        return await Payment.find();
    }
}

module.exports = new PaymentService();