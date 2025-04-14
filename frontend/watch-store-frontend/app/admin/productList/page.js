"use client";

import React from "react";
import {FiMoreVertical, FiSearch, FiShoppingCart, FiUser} from "react-icons/fi";
import Link from "next/link";

const products = [
    { id: 1, name: "Luxury Watch", price: "$120", img: "/img_homepage/product-item1.jpg" },
    { id: 2, name: "Classic Watch", price: "$80", img: "/img_homepage/product-item7.jpg" },
    { id: 3, name: "Sports Watch", price: "$95", img: "/img_homepage/product-item8.jpg" },
    { id: 4, name: "Modern Watch", price: "$110", img: "/img_homepage/product-item9.jpg" },
    { id: 5, name: "Elegant Watch", price: "$130", img: "/img_homepage/product-item2.jpg" },
    { id: 6, name: "Stylish Watch", price: "$150", img: "/img_homepage/product-item3.jpg" },
];

const ProductList = () => {
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
                    <div className="relative flex items-center border rounded-md px-2">
                        <input type="text" placeholder="Search..." className="p-2 w-64 border-none outline-none" />
                        <FiSearch className="cursor-pointer ml-2" />
                    </div>
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
            <section className="p-6">

                <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded"
                            />
                            <div className="mt-4 text-center">
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-gray-500 mt-1">{product.price}</p>
                            </div>
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
};

export default ProductList;
