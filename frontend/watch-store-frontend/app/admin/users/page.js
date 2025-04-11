"use client";

import { useState } from "react";
import AddUserModal from "@/components/AddUserModal";
import UpdateUserModal from "@/components/UpdateUserModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function UserManagement() {
    const [activeTab, setActiveTab] = useState("user");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    // Modal xác nhận xoá
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const toggleSubMenu = () => {
        setIsSubMenuOpen((prev) => !prev);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        alert(`Đã xoá user có ID: ${userToDelete.id}`);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const handleOpenUpdateModal = (user) => {
        setSelectedUser(user);
        setIsUpdateModalOpen(true);
    };

    const users = [
        {
            id: 1,
            username: "NguyenVanA",
            email: "a@gmail.com",
            phone: "090123456",
            address: "Hà Nội",
            role: "Admin",
            status: "Active",
            firstname: "Nguyen",
            lastname: "A"
        },
        {
            id: 2,
            username: "TrucNguyen",
            email: "truc@gmail.com",
            phone: "090901011",
            address: "TP.HCM",
            role: "User",
            status: "Unactive",
            firstname: "Nguyen",
            lastname: "Truc"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <div className="text-2xl font-bold">📊 Watch Store</div>
                <div className="space-x-4">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="/staff/orders" className="hover:underline">Orders</a>
                    <a href="/admin/products" className="hover:underline">Products</a>
                    <a href="#" className="hover:underline">Reports</a>
                    <input type="text" placeholder="Search..." className="p-2 border rounded" />
                    <button className="bg-gray-800 text-white p-2 rounded">Logout</button>
                </div>
            </header>

            {/* Main layout */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-900 text-white min-h-full p-4">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">📋 Quản trị</h2>
                            <ul className="space-y-1 text-sm">
                                <li>
                                    <button
                                        onClick={() => setActiveTab("user")}
                                        className={`w-full text-left px-3 py-2 rounded ${activeTab === "user" ? "bg-gray-700 font-bold" : "hover:bg-gray-800"}`}
                                    >
                                        👤 Người dùng
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveTab("product")}
                                        className={`w-full text-left px-3 py-2 rounded ${activeTab === "product" ? "bg-gray-700 font-bold" : "hover:bg-gray-800"}`}
                                    >
                                        📦 Sản phẩm
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveTab("order")}
                                        className={`w-full text-left px-3 py-2 rounded ${activeTab === "order" ? "bg-gray-700 font-bold" : "hover:bg-gray-800"}`}
                                    >
                                        📑 Đơn hàng
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={toggleSubMenu}
                                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-800 flex items-center justify-between"
                                    >
                                        <span className={`${activeTab.startsWith("stat") ? "font-bold" : ""}`}>📈 Thống kê</span>
                                        <span>{isSubMenuOpen ? "▲" : "▼"}</span>
                                    </button>
                                    {isSubMenuOpen && (
                                        <ul className="ml-4 mt-1 space-y-1 text-sm">
                                            <li>
                                                <button
                                                    onClick={() => setActiveTab("stat-user")}
                                                    className={`w-full text-left px-3 py-1 rounded ${activeTab === "stat-user" ? "bg-gray-700 font-bold" : "hover:bg-gray-800"}`}
                                                >
                                                    👤 Theo người dùng
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => setActiveTab("stat-product")}
                                                    className={`w-full text-left px-3 py-1 rounded ${activeTab === "stat-product" ? "bg-gray-700 font-bold" : "hover:bg-gray-800"}`}
                                                >
                                                    📦 Theo sản phẩm
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => setActiveTab("stat-revenue")}
                                                    className={`w-full text-left px-3 py-1 rounded ${activeTab === "stat-revenue" ? "bg-gray-700 font-bold" : "hover:bg-gray-800"}`}
                                                >
                                                    💰 Doanh thu
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            + Thêm người dùng
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded shadow border border-gray-200 bg-white">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">Username</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Phone</th>
                                <th className="px-4 py-2 border">Address</th>
                                <th className="px-4 py-2 border">Role</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 border-t">
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2">{user.username}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.phone}</td>
                                    <td className="px-4 py-2">{user.address}</td>
                                    <td className="px-4 py-2">{user.role}</td>
                                    <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                                {user.status}
                                            </span>
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            className="px-3 py-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500"
                                            onClick={() => handleOpenUpdateModal(user)}
                                        >
                                            ✏️ Update
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                                            onClick={() => handleDeleteClick(user)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modals */}
                    <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
                    <UpdateUserModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} user={selectedUser} />
                    <ConfirmDeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={confirmDelete}
                        username={userToDelete?.username}
                    />
                </main>
            </div>
        </div>
    );
}
