const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    user_id: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"], default: "PENDING" },
    payment_method: { type: String, enum: ["CREDIT_CARD", "PAYPAL", "COD"], required: true },
    transaction_id: { type: String },
    error_message: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Payment', paymentSchema);