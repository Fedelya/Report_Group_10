// app/admin/products/page.js
"use client";
import { useState, useEffect } from "react";

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [formData, setFormData] = useState({ name: "", price: "", stock: "" });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:8082/products", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        setEditProduct(null);
        setFormData({ name: "", price: "", stock: "" });
        setShowModal(true);
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
        setFormData({ name: product.name, price: product.price, stock: product.stock });
        setShowModal(true);
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`http://localhost:8082/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete product");
            }

            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Failed to delete product:", error.message);
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editProduct ? "PUT" : "POST";
            const url = editProduct
                ? `http://localhost:8082/products/${editProduct.id}`
                : "http://localhost:8082/products";
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to ${editProduct ? "update" : "add"} product`);
            }

            const updatedProduct = await res.json();
            if (editProduct) {
                setProducts(
                    products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
                );
            } else {
                setProducts([...products, updatedProduct]);
            }
            setShowModal(false);
        } catch (error) {
            console.error(`Failed to ${editProduct ? "update" : "add"} product:`, error.message);
            setError(error.message);
        }
    };

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
                    <a href="/staff/orders" className="hover:underline">Orders</a>
                    <a href="/admin/products" className="hover:underline">Products</a>
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
                        <li className="mb-2">All Products</li>
                        <li className="mb-2">Add Product</li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="w-4/5 p-6">
                    <h1 className="text-2xl font-bold mb-4">Product Management</h1>
                    <button
                        onClick={handleAddProduct}
                        className="bg-green-500 text-white p-2 rounded mb-4 hover:bg-green-600"
                    >
                        Add New Product
                    </button>
                    <div className="bg-white shadow rounded p-4">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 text-left">Product ID</th>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Price</th>
                                <th className="p-2 text-left">Stock</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="border-t">
                                        <td className="p-2">{product.id}</td>
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">${product.price}</td>
                                        <td className="p-2">{product.stock}</td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="bg-blue-500 text-white p-1 rounded mr-2 hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-2 text-center">
                                        No products found
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Modal for Add/Edit Product */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            {editProduct ? "Edit Product" : "Add New Product"}
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
                                <label className="block mb-1">Price:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Stock:</label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
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
                                    {editProduct ? "Update" : "Add"}
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