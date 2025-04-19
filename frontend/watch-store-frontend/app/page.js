'use client';
import React, { useState, useEffect } from 'react';
import { FiMoreVertical, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const router = useRouter();

    // Sử dụng một useEffect duy nhất để kiểm tra thông tin đăng nhập
    useEffect(() => {
        // Lấy thông tin từ localStorage
        const token = localStorage.getItem('jwt');
        const savedUsername = localStorage.getItem('username');
        const userRole = localStorage.getItem('role');
        
        if (token && savedUsername) {
            console.log('Đã đăng nhập với:', savedUsername);
            setLoggedIn(true);
            setUsername(savedUsername);
        } else {
            // Nếu không có thông tin trong localStorage, đặt là chưa đăng nhập
            setLoggedIn(false);
            setUsername('');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setLoggedIn(false);
        setUsername('');
        router.push('/login');
    };
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center relative">
                <div className="text-2xl font-bold">⌚ Watch Store</div>
                <nav className="hidden md:flex space-x-4">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/admin/products" className="hover:underline">Products</a>
                    <a href="/admin/orders" className="hover:underline">Orders</a>
                    <a href="/admin/categories" className="hover:underline">Categories</a>
                    <a href="#" className="hover:underline">Sale</a>
                    <a href="#" className="hover:underline">Pages</a>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative flex items-center border rounded-md px-2">
                        <input type="text" placeholder="Search..." className="p-2 w-64 border-none outline-none" />
                        <FiSearch className="cursor-pointer ml-2" />
                    </div>

                    {loggedIn ? (
                        <>
                            <span className="text-sm font-semibold">Hi, {username}</span>
                            <button onClick={() => {
                                        localStorage.removeItem('jwt');
                                        localStorage.removeItem('username');
                                        localStorage.removeItem('role');
                                        setLoggedIn(false);
                                        setUsername('');
                                    }} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="text-blue-600 hover:underline">
                            <FiUser className="cursor-pointer" />
                        </Link>
                    )}

                    <Link href="/admin/cart">
                        <FiShoppingCart className="cursor-pointer" />
                    </Link>
                </div>
                <div className="md:hidden flex items-center space-x-4">
                    <FiSearch className="cursor-pointer" onClick={() => setSearchOpen(!searchOpen)} />
                    <FiMoreVertical className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative w-full h-96">
                <img
                    src="/img_homepage/background1.jpg"
                    alt="Hero Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
                    <h1 className="text-4xl font-bold">Discover Timeless Elegance</h1>
                    <p className="mt-2">Explore our latest collection of premium watches.</p>
                    <button className="mt-4 bg-white text-black px-6 py-2 rounded">Shop Now</button>
                </div>
            </section>

            {/* Featured Products */}
            <section className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Featured Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                            { id: 1, name: "Luxury Watch", price: "$120", img: "/img_homepage/product-item6.jpg" },
                            { id: 2, name: "Classic Watch", price: "$80", img: "/img_homepage/product-item7.jpg" },
                            { id: 3, name: "Sports Watch", price: "$95", img: "/img_homepage/product-item8.jpg" },
                            { id: 4, name: "Modern Watch", price: "$110", img: "/img_homepage/product-item9.jpg" }
                    ].map((product) => (
                        <div key={product.id} className="bg-white shadow p-4 rounded flex flex-col items-center">
                            <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded" />
                            <p className="font-semibold mt-2">{product.name}</p>
                            <p className="text-gray-600">{product.price}</p>
                            <button className="mt-2 bg-black text-white px-4 py-1 rounded">Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="p-6">
                <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
                <div className="flex gap-4">
                    {["Luxury", "Sports", "Casual", "Smart"].map((category, index) => (
                        <div key={index} className="bg-white shadow p-4 rounded text-center w-1/4">
                            <p className="font-semibold">{category}</p>
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
