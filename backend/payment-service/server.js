const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const paymentRoutes = require('./src/routes/paymentRoutes');

// Load biến môi trường từ file .env
dotenv.config();

const app = express();
app.use(express.json()); // Middleware để parse JSON

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Định tuyến API
app.use('/payment', paymentRoutes);

// Khởi động server
const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});