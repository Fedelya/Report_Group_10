"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { BsClock, BsCheckCircle, BsTruck } from "react-icons/bs";

export default function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("All Orders");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md p-4 fixed w-full top-0 left-0 z-50 flex justify-between items-center">
                <div className="text-2xl font-bold">📊 Watch Store</div>
                <nav className="flex space-x-6 items-center">
                    <Link href="/" className="hover:text-blue-500">Home</Link>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="hover:text-blue-500 focus:outline-none"
                        >
                            Manage ▼
                        </button>
                        {showDropdown && (
                            <div className="absolute bg-white shadow-lg rounded mt-2 w-40">
                                <Link href="/staff/products" className="block px-4 py-2 hover:bg-gray-200">Products</Link>
                                <Link href="/staff/categories" className="block px-4 py-2 hover:bg-gray-200">Categories</Link>
                                <Link href="/staff/orders" className="block px-4 py-2 hover:bg-gray-200">Orders</Link>
                            </div>
                        )}
                    </div>
                    <Link href="/staff/reports" className="hover:text-blue-500">Report</Link>
                    <FiSearch className="text-gray-600 cursor-pointer" size={20} />
                    <FiLogOut className="text-red-500 cursor-pointer" size={20} />
                </nav>
            </header>

            {/* Sidebar & Main */}
            <div className="flex pt-16">
                <aside className="w-1/5 bg-white p-6 shadow h-screen fixed">
                    <h3 className="text-lg font-semibold mb-4">Filters</h3>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="All Orders">All Orders</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </aside>

                <main className="w-4/5 p-6 ml-[20%]">
                    <h1 className="text-2xl font-bold mb-4">Order Management</h1>
                    {loading && <div className="text-center">Loading...</div>}
                    {error && <div className="text-center text-red-500">Error: {error}</div>}
                    {!loading && !error && (
                        <>
                            <div className="bg-white shadow rounded p-4">
                                <table className="w-full">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="p-3 text-left">Order ID</th>
                                        <th className="p-3 text-left">Customer</th>
                                        <th className="p-3 text-left">Total</th>
                                        <th className="p-3 text-left">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <tr key={order.id} className="border-t hover:bg-gray-100 transition">
                                                <td className="p-3 text-blue-500 hover:underline">
                                                    <Link href={`/staff/order/${order.id.replace("#", "")}`}>
                                                        {order.id}
                                                    </Link>
                                                </td>
                                                <td className="p-3">{order.customer}</td>
                                                <td className="p-3">${order.total}</td>
                                                <td className="p-3 flex items-center space-x-2">
                                                    {order.status === "Pending" && <BsClock className="text-yellow-500" />}
                                                    {order.status === "Processing" && <BsTruck className="text-blue-500" />}
                                                    {order.status === "Delivered" && <BsCheckCircle className="text-green-500" />}
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                        className="p-1 border rounded"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-3 text-center">No orders found</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 0}
                                    className="p-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span>Page {page + 1} of {totalPages}</span>
                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page >= totalPages - 1}
                                    className="p-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}