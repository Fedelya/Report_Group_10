// app/staff/orders/page.js
"use client";
import { useState, useEffect } from "react";

export default function StaffOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`);
            const data = await res.json();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    const updateStatus = (orderId, newStatus) => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${orderId}`, {
            method: "PATCH",
            body: JSON.stringify({ status: newStatus }),
            headers: { "Content-Type": "application/json" },
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
        </div>
    );
}