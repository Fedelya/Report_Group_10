require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 8084;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/payment_db';

// Middleware
app.use(express.json());

// Routes
app.use('/payments', paymentRoutes);

// Kết nối MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Khởi động server
app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});