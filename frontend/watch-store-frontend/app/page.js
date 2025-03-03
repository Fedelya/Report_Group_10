// app/page.js
"use client";
import { useEffect, useState } from "react";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
            const data = await res.json();
            setProducts(data.slice(0, 4));
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">Watch Store</h1>
                <input type="text" placeholder="Tìm kiếm..." className="ml-4 p-2 rounded text-black" />
            </header>
            <section className="bg-gray-800 text-white p-10 text-center">
                <h2 className="text-4xl font-bold">Khám phá đồng hồ mới nhất</h2>
                <button className="mt-4 bg-blue-500 p-2 rounded">Mua ngay</button>
            </section>
            <section className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Sản phẩm nổi bật</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded shadow">
                            <img
                                src={product.image || "https://via.placeholder.com/150"}
                                alt={product.name}
                                className="w-full h-40 object-cover"
                            />
                            <h4 className="mt-2 font-semibold">{product.name}</h4>
                            <p className="text-gray-600">{product.price} VNĐ</p>
                            <button className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>© 2025 Watch Store. All rights reserved.</p>
            </footer>
        </div>
    );
}