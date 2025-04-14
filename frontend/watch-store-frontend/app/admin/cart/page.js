"use client";

import React, { useState } from "react";
import {FiTrash2, FiArrowLeft, FiSearch, FiUser, FiShoppingCart, FiMoreVertical} from "react-icons/fi";
import Link from "next/link";

const initialCart = [
    { id: 1, name: "Luxury Watch", price: 120, img: "/img_homepage/product-item1.jpg", quantity: 1 },
    { id: 3, name: "Sports Watch", price: 95, img: "/img_homepage/product-item8.jpg", quantity: 2 },
];

const CartPage = () => {
    const [cartItems, setCartItems] = useState(initialCart);

    // const handleQuantityChange = (id: number, amount: number) => {
    //     setCartItems((prev) =>
    //         prev.map((item) =>
    //             item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    //         )
    //     );
    // };
    //
    // const handleRemove = (id: number) => {
    //     setCartItems((prev) => prev.filter((item) => item.id !== id));
    // };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <header className="bg-white shadow p-4 flex justify-between items-center relative">
                <div className="text-2xl font-bold">⌚ Watch Store</div>
                <nav className="hidden md:flex space-x-4">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/admin/products" className="hover:underline">Products</a>
                    <a href="/admin/orders" className="hover:underline">Order< /a>
                    <a href="/admin/categories" className="hover:underline">Categories</a>
                    <a href="#" className="hover:underline">Sale</a>
                    <a href="#" className="hover:underline">Pages</a>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    {/*<div className="relative flex items-center border rounded-md px-2">*/}
                    {/*    <input type="text" placeholder="Search..." className="p-2 w-64 border-none outline-none" />*/}
                    {/*    <FiSearch className="cursor-pointer ml-2" />*/}
                    {/*</div>*/}
                    <FiUser className="cursor-pointer" />
                    <Link href="/admin/cart">
                        <FiShoppingCart className="cursor-pointer" />
                    </Link>
                </div>
                <div className="md:hidden flex items-center space-x-4">
                    <FiSearch className="cursor-pointer" onClick={() => setSearchOpen(!searchOpen)} />
                    <FiMoreVertical className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
                </div>
            </header>

            <div className="min-h-screen p-6 bg-gray-100">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center bg-white rounded shadow p-4">
                                    <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                    <div className="ml-4 flex-1">
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="text-gray-500">${item.price} x {item.quantity}</p>
                                        <div className="mt-2 flex items-center space-x-2">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >−</button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >+</button>
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="ml-4 text-red-500 hover:text-red-700"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="bg-white p-4 shadow rounded flex justify-between items-center">
                                <h4 className="text-xl font-semibold">Total</h4>
                                <span className="text-xl font-bold">${total}</span>
                            </div>

                            <div className="flex justify-between">
                                <a href="/products" className="flex items-center text-blue-600 hover:underline">
                                    <FiArrowLeft className="mr-2" /> Continue Shopping
                                </a>
                                <Link href="/admin/pay">
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                                        Pay now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white shadow mt-6 p-6 flex justify-between">
                <div>
                    <h3 className="font-semibold">Quick Links</h3>
                    <ul className="text-sm text-gray-600">
                        <li>UI Design</li>
                        <li>UX Design</li>
                        <li>Wireframing</li>
                        <li>Brainstorming</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Help & Info</h3>
                    <ul className="text-sm text-gray-600">
                        <li>Track Your Order</li>
                        <li>Returns Policies</li>
                        <li>Shipping</li>
                        <li>Delivery</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Contact Us</h3>
                    <ul className="text-sm text-gray-600">
                        <li>Blog</li>
                        <li>Support</li>
                        <li>Developers</li>
                        <li>Resource Library</li>
                    </ul>
                </div>
            </footer>
        </div>

    );
};

export default CartPage;
