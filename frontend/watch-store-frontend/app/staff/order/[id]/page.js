"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiLogOut } from "react-icons/fi";

export default function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
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

            {/* Order Detail Section */}
            <main className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg pt-24">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Order #{order.id}</h1>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-700"><strong>Customer:</strong> {order.customer}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {order.email || "N/A"}</p>
                            <p className="text-gray-700"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Total:</strong> <span className="text-lg font-semibold text-green-600">${order.total}</span></p>
                            <p className="text-gray-700"><strong>Shipping Fee:</strong> ${order.shippingFee || 0}</p>
                            <p className="text-gray-700">
                                <strong>Status:</strong>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="ml-2 p-1 border rounded bg-gray-100"
                                    disabled={isUpdating}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Product List */}
                <h2 className="text-xl font-bold mb-3">Products</h2>
                <div className="border rounded-md overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-2 text-left">Product</th>
                            <th className="p-2 text-center">Quantity</th>
                            <th className="p-2 text-right">Price</th>
                            <th className="p-2 text-right">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {order.products?.map((product, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2">{product.productName}</td>
                                <td className="p-2 text-center">{product.quantity}</td>
                                <td className="p-2 text-right">${product.unitPrice}</td>
                                <td className="p-2 text-right">${product.subtotal}</td>
                            </tr>
                        ))}
                        {!order.products?.length && (
                            <tr>
                                <td colSpan="4" className="p-2 text-center">No products found</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Update Button */}
                <button
                    onClick={updateStatus}
                    disabled={isUpdating}
                    className={`mt-6 bg-blue-600 text-white py-2 px-6 rounded-md ${isUpdating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"} transition-all`}
                >
                    {isUpdating ? "Updating..." : "Update Status"}
                </button>
            </main>
        </div>
    );
}