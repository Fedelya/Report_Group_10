'use client';
import React, { useState } from 'react';
import {FiMoreVertical, FiSearch, FiShoppingCart, FiUser} from "react-icons/fi";
import Link from "next/link";

export default function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState('Black');
    const [selectedWire, setSelectedWire] = useState('Black');
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center relative">
                <div className="text-2xl font-bold">⌚ Watch Store</div>

                {/* Navigation for Desktop */}
                <nav className="hidden md:flex space-x-4">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/admin/products" className="hover:underline">Products</a>
                    <a href="/admin/orders" className="hover:underline">Order< /a>
                    <a href="/admin/categories" className="hover:underline">Categories</a>
                    <a href="#" className="hover:underline">Sale</a>
                    <a href="#" className="hover:underline">Pages</a>
                </nav>

                {/* Search Bar & Icons for Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative flex items-center border rounded-md px-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="p-2 w-64 border-none outline-none"
                        />
                        <FiSearch className="cursor-pointer ml-2" />
                    </div>
                    <FiUser className="cursor-pointer" />
                    <Link href="/admin/cart">
                        <FiShoppingCart className="cursor-pointer" />
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center space-x-4">
                    <FiSearch className="cursor-pointer" onClick={() => setSearchOpen(!searchOpen)} />
                    <FiMoreVertical className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
                </div>
            </header>

            {/* Mobile Search Bar */}
            {searchOpen && (
                <div className="md:hidden absolute top-14 left-0 w-full p-2 bg-white shadow-md flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 w-full border rounded outline-none"
                    />
                    <FiSearch className="ml-2" />
                </div>
            )}

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute right-4 top-14 bg-white shadow-md p-4 rounded w-48 flex flex-col items-start">
                    {loggedIn ? (
                        <div className="flex items-center gap-2 border-b pb-2 w-full">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <span className="font-semibold">User Name</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 border-b pb-2 w-full">
                            <button className="bg-blue-500 text-white p-2 rounded">Sign In</button>
                            <button className="border p-2 rounded">Register</button>
                        </div>
                    )}
                    <a href="#" className="block mt-2">Home</a>
                    <a href="#" className="block">Products</a>
                    <a href="#" className="block">Services</a>
                    <a href="#" className="block">Blog</a>
                    <a href="#" className="block">Sale</a>
                    <a href="#" className="block">Pages</a>
                </div>
            )}
            {/* Product Section */}
            <main className="p-6 flex gap-8 bg-white shadow-md">
                {/* Product Image */}
                <div className="w-1/3 bg-gray-200 h-96 flex items-center justify-center">
                    <span className="text-gray-400">Image Placeholder</span>
                </div>

                {/* Product Info */}
                <div className="w-2/3">
                    <h1 className="text-2xl font-bold">Watch 1</h1>
                    <span className="text-green-600 font-semibold">Tag</span>
                    <p className="text-3xl font-bold mt-2">$50</p>

                    {/* Options */}
                    <div className="mt-4">
                        <label className="block font-semibold">Color</label>
                        <select
                            className="p-2 border rounded w-full"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                        >
                            <option>Black</option>
                            <option>White</option>
                            <option>Gold</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block font-semibold">Wire Color</label>
                        <select
                            className="p-2 border rounded w-full"
                            value={selectedWire}
                            onChange={(e) => setSelectedWire(e.target.value)}
                        >
                            <option>Black</option>
                            <option>Silver</option>
                            <option>Brown</option>
                        </select>
                    </div>

                    <button className="mt-4 bg-black text-white p-2 rounded w-full">Add to Cart</button>

                    <details className="mt-4 border p-2 rounded cursor-pointer">
                        <summary className="font-semibold">Detail</summary>
                        <p>Detail is here</p>
                    </details>
                </div>
            </main>

            {/* Reviews */}
            <section className="p-6">
                <h2 className="text-xl font-bold mb-4">Latest Reviews</h2>
                <div className="flex gap-4">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="w-1/3 bg-white shadow p-4 rounded">
                            <div className="flex gap-1 text-yellow-500">★★★★★</div>
                            <h3 className="font-semibold mt-2">Review title</h3>
                            <p className="text-sm">Review body</p>
                            <p className="text-xs text-gray-500">Reviewer name - Date</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Other Products */}
            <section className="p-6">
                <h2 className="text-xl font-bold mb-4">Other Products</h2>
                <div className="flex gap-4">
                    {[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="w-1/4 bg-white shadow p-4 rounded flex flex-col items-center">
                            <div className="w-full h-32 bg-gray-200 flex items-center justify-center">Image</div>
                            <p className="font-semibold mt-2">Watch 4</p>
                            <p className="text-gray-600">$50</p>
                        </div>
                    ))}
                </div>
            </section>

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
}
