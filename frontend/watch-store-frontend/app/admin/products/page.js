// app/admin/products/page.js
"use client";
import { useState, useEffect } from "react";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
            const data = await res.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const addProduct = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setProducts([...products, data]);
                setNewProduct({ name: "", price: "", stock: "" });
            });
    };

    const deleteProduct = (id) => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, { method: "DELETE" }).then(
            () => {
                setProducts(products.filter((p) => p.id !== id));
            }
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
            <div className="mb-6 bg-white p-4 rounded shadow">
                <input
                    type="text"
                    placeholder="Tên sản phẩm"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="p-2 border rounded mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Giá (VNĐ)"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="p-2 border rounded mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Số lượng tồn kho"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="p-2 border rounded mb-2 w-full"
                />
                <button onClick={addProduct} className="bg-blue-500 text-white p-2 rounded w-full">
                    Thêm sản phẩm
                </button>
            </div>
            <table className="w-full bg-white shadow rounded">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-2">ID</th>
                    <th className="p-2">Tên</th>
                    <th className="p-2">Giá</th>
                    <th className="p-2">Tồn kho</th>
                    <th className="p-2">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="border-t">
                        <td className="p-2">{product.id}</td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.price} VNĐ</td>
                        <td className="p-2">{product.stock}</td>
                        <td className="p-2">
                            <button
                                onClick={() => deleteProduct(product.id)}
                                className="bg-red-500 text-white p-1 rounded"
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}