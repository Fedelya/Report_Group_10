// app/admin/orders/page.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("All Orders");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <div className="text-2xl font-bold">📊 Watch Store</div>
                <div className="space-x-4">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="/admin/orders" className="hover:underline">Orders</a>
                    <a href="/admin/products" className="hover:underline">Products</a>
                    <a href="/admin/categories" className="hover:underline">Categories</a>
                    <a href="#" className="hover:underline">Reports</a>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 border rounded"
                    />
                    <button className="bg-gray-800 text-white p-2 rounded">Logout</button>
                </div>
            </header>

            {/* Sidebar */}
            <div className="flex">
                <aside className="w-1/5 bg-white p-4 shadow">
                    <h3 className="text-lg font-semibold mb-4">Filters</h3>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    >
                        <option value="All Orders">All Orders</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </aside>

                {/* Main Content */}
                <main className="w-4/5 p-6">
                    <h1 className="text-2xl font-bold mb-4">Order Management</h1>
                    <div className="bg-white shadow rounded p-4">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 text-left">Order ID</th>
                                <th className="p-2 text-left">Customer</th>
                                <th className="p-2 text-left">Total</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-white shadow mt-6 p-4 flex justify-between">
                <div>
                    <div className="flex space-x-2 mb-2">
                        <span>🐦</span> <span>📷</span> <span>💼</span>
                    </div>
                    <div>Quick Links</div>
                    <ul className="text-sm">
                        <li>UI design</li>
                        <li>UX design</li>
                        <li>Wireframing</li>
                        <li>Diagramming</li>
                        <li>Brainstorming</li>
                        <li>Online whiteboard</li>
                        <li>Team collaboration</li>
                    </ul>
                </div>
                <div>
                    <div>Help & Info</div>
                    <ul className="text-sm">
                        <li>Track Your Order</li>
                        <li>Returns Policies</li>
                        <li>Shipping</li>
                        <li>Delivery</li>
                        <li>Contact Us</li>
                        <li>FAQs</li>
                    </ul>
                </div>
                <div>
                    <div>Contact Us</div>
                    <ul className="text-sm">
                        <li>Blog</li>
                        <li>Best practices</li>
                        <li>Colors</li>
                        <li>Color wheel</li>
                        <li>Support</li>
                        <li>Developers</li>
                        <li>Resource library</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}