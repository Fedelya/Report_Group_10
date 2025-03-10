// app/staff/order/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function OrderDetail() {
    const { id } = useParams(); // Lấy id từ URL (ví dụ: /staff/order/001)
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                setLoading(true);
                console.log("Fetching from:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${id}`);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log("Response status:", res.status);
                console.log("Response headers:", Object.fromEntries(res.headers));

                if (!res.ok) {
                    const errorText = await res.text(); // Lấy nội dung lỗi từ API
                    console.log("Error response:", errorText);
                    if (res.status === 404) {
                        throw new Error("Order not found");
                    }
                    throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
                }

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Response is not JSON");
                }

                const data = await res.json();
                console.log("Fetched data:", data);
                setOrder(data);
                setStatus(data.status || "Pending");
            } catch (error) {
                console.error("Failed to fetch order detail:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetail();
    }, [id]);

    const updateStatus = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error("Failed to update status");
            }

            const updatedOrder = { ...order, status };
            setOrder(updatedOrder);
            alert("Status updated successfully!");
        } catch (error) {
            console.error("Failed to update order status:", error.message);
            setError(error.message);
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    }

    if (!order) {
        return <div className="p-6 text-center">Order not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <div className="text-2xl font-bold">📊 Watch Store</div>
                <div className="space-x-4">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="/staff/orders" className="hover:underline">Orders</a>
                    <a href="#" className="hover:underline">Products</a>
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
                    <h3 className="text-lg font-semibold mb-4">Sections</h3>
                    <ul>
                        <li className="mb-2">Order Details</li>
                        <li className="mb-2">Customer Info</li>
                        <li className="mb-2">Shipping Info</li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="w-4/5 p-6">
                    <h1 className="text-2xl font-bold mb-4">Order Details - {order.id}</h1>
                    <div className="bg-white shadow rounded p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>Customer:</strong> {order.customer}</p>
                                <p><strong>Total:</strong> ${order.total}</p>
                                <p><strong>Status:</strong>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="ml-2 p-1 border rounded"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </p>
                                <p><strong>Shipping Address:</strong> {order.shippingAddress || "Not specified"}</p>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-2">Products</h2>
                        <table className="w-full mb-4">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 text-left">Product Name</th>
                                <th className="p-2 text-left">Quantity</th>
                                <th className="p-2 text-left">Price</th>
                                <th className="p-2 text-left">Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(order.products || []).map((product, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-2">{product.name || "N/A"}</td>
                                    <td className="p-2">{product.quantity || 0}</td>
                                    <td className="p-2">${product.price || 0}</td>
                                    <td className="p-2">${(product.quantity || 0) * (product.price || 0)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <button
                            onClick={updateStatus}
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            Update Status
                        </button>
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