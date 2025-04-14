"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiUser, FiShoppingCart } from "react-icons/fi";

const CheckoutPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        notes: "",
        paymentMethod: "cash", // mặc định là thanh toán tiền mặt
    });

    const cartItems = [
        { id: 1, name: "Luxury Watch", price: 120, quantity: 1 },
        { id: 2, name: "Sports Watch", price: 95, quantity: 2 },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Đơn hàng đã được đặt với phương thức thanh toán: ${
            form.paymentMethod === "cash" ? "Tiền mặt" : "Chuyển khoản"
        }`);
        // Gửi thông tin form + giỏ hàng đến server ở đây nếu cần
    };

    return (
        <div>
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <div className="text-2xl font-bold">⌚ Watch Store</div>
                <nav className="hidden md:flex space-x-4">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/admin/products" className="hover:underline">Products</Link>
                    <Link href="/admin/orders" className="hover:underline">Orders</Link>
                    <Link href="/admin/categories" className="hover:underline">Categories</Link>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    <FiUser className="cursor-pointer" />
                    <Link href="/admin/cart">
                        <FiShoppingCart className="cursor-pointer" />
                    </Link>
                </div>
            </header>

            {/* Checkout */}
            <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
                    {/* Thông tin giao hàng */}
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold mb-1">Họ tên</label>
                            <input
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Số điện thoại</label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Địa chỉ giao hàng</label>
                            <textarea
                                name="address"
                                required
                                value={form.address}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Ghi chú</label>
                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            ></textarea>
                        </div>

                        {/* Phương thức thanh toán */}
                        <div>
                            <label className="block font-semibold mb-2">Phương thức thanh toán</label>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={form.paymentMethod === "cash"}
                                        onChange={handleChange}
                                    />
                                    <span>💵 Tiền mặt khi nhận hàng</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank"
                                        checked={form.paymentMethod === "bank"}
                                        onChange={handleChange}
                                    />
                                    <span>💳 Chuyển khoản ngân hàng</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Tóm tắt đơn hàng */}
                    <div className="bg-gray-50 p-4 rounded shadow space-y-4 h-fit">
                        <h2 className="text-xl font-semibold mb-2">Tóm tắt đơn hàng</h2>
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}
                        <hr />
                        <div className="flex justify-between font-bold">
                            <span>Tổng cộng</span>
                            <span>${total}</span>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
                        >
                            Đặt hàng
                        </button>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <footer className="bg-white shadow mt-6 p-6 flex justify-between text-sm text-gray-600">
                <div>
                    <h3 className="font-semibold">Quick Links</h3>
                    <ul>
                        <li>UI Design</li>
                        <li>UX Design</li>
                        <li>Wireframing</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Support</h3>
                    <ul>
                        <li>Help Center</li>
                        <li>Shipping</li>
                        <li>Returns</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Contact</h3>
                    <ul>
                        <li>Email Us</li>
                        <li>Facebook</li>
                        <li>Live Chat</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default CheckoutPage;
