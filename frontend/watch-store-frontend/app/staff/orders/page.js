// app/staff/orders/page.js
"use client";
import { useState, useEffect } from "react";

export default function StaffOrders() {
    const [orders, setOrders] = useState([]);
<<<<<<< HEAD

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`);
            const data = await res.json();
            setOrders(data);
=======
    const [filter, setFilter] = useState("All Orders");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                console.log("Fetching from:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log("Response status:", res.status);
                console.log("Response headers:", Object.fromEntries(res.headers));

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Response is not JSON");
                }

                const data = await res.json();
                console.log("Fetched data:", data);
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
>>>>>>> develop
        };
        fetchOrders();
    }, []);

    const updateStatus = (orderId, newStatus) => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${orderId}`, {
            method: "PATCH",
            body: JSON.stringify({ status: newStatus }),
            headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
        }).then(() => {
            setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
            <div className="mb-4">
                <select className="p-2 border rounded">
                    <option value="">Tất cả trạng thái</option>
                    <option value="Pending">Mới</option>
                    <option value="Processing">Đang xử lý</option>
                    <option value="Delivered">Đã giao</option>
                </select>
            </div>
            <table className="w-full bg-white shadow rounded">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-2">Mã đơn</th>
                    <th className="p-2">Khách hàng</th>
                    <th className="p-2">Tổng tiền</th>
                    <th className="p-2">Trạng thái</th>
                    <th className="p-2">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id} className="border-t">
                        <td className="p-2">{order.id}</td>
                        <td className="p-2">{order.customer}</td>
                        <td className="p-2">{order.total} VNĐ</td>
                        <td className="p-2">{order.status}</td>
                        <td className="p-2">
                            <select
                                value={order.status}
                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                className="p-1 border rounded"
                            >
                                <option value="Pending">Mới</option>
                                <option value="Processing">Đang xử lý</option>
                                <option value="Delivered">Đã giao</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
=======
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update status");
                }
                return res.json();
            })
            .then(() => {
                setOrders(
                    orders.map((o) =>
                        o.id === orderId ? { ...o, status: newStatus } : o
                    )
                );
            })
            .catch((error) => {
                console.error("Failed to update order status:", error.message);
                setError(error.message);
            });
    };

    const filteredOrders = filter === "All Orders"
        ? orders
        : orders.filter((order) => order.status === filter);

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <div className="text-2xl font-bold">📊 Watch Store</div>
                <div className="space-x-4">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">Orders</a>
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
                                <th className="p-2 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="border-t">
                                        <td className="p-2">{order.id}</td>
                                        <td className="p-2">{order.customer}</td>
                                        <td className="p-2">${order.total}</td>
                                        <td className="p-2">{order.status}</td>
                                        <td className="p-2">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
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
                                    <td colSpan="5" className="p-2 text-center">
                                        No orders found
                                    </td>
                                </tr>
                            )}
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
>>>>>>> develop
        </div>
    );
}