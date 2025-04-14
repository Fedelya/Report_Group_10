// app/admin/categories/page.js
"use client";
import { useState, useEffect } from "react";

export default function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "" });

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <div className="text-2xl font-bold">📊 Watch Store</div>
                <div className="space-x-4">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/staff/orders" className="hover:underline">Orders</a>
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
                    <h3 className="text-lg font-semibold mb-4">Sections</h3>
                    <ul>
                        <li className="mb-2">All Categories</li>
                        <li className="mb-2">Add Category</li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="w-4/5 p-6">
                    <h1 className="text-2xl font-bold mb-4">Category Management</h1>
                    <button
                        className="bg-green-500 text-white p-2 rounded mb-4 hover:bg-green-600"
                    >
                        Add New Category
                    </button>
                    <div className="bg-white shadow rounded p-4">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 text-left">Category ID</th>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Description</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category.id} className="border-t">
                                        <td className="p-2">{category.id}</td>
                                        <td className="p-2">{category.name}</td>
                                        <td className="p-2">{category.description}</td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => handleEditCategory(category)}
                                                className="bg-blue-500 text-white p-1 rounded mr-2 hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
                                                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-2 text-center">
                                        No categories found
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Modal for Add/Edit Category */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            {editCategory ? "Edit Category" : "Add New Category"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Name:</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Description:</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                >
                                    {editCategory ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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