'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Kiểm tra đăng nhập và quyền admin
        const token = localStorage.getItem('jwt');
        const role = localStorage.getItem('role');
        
        if (!token || role !== 'ADMIN') {
            router.push('/login');
            return;
        }
        
        // Fetch danh sách danh mục
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/categories`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!res.ok) {
                    throw new Error('Không thể tải danh sách danh mục');
                }
                
                const data = await res.json();
                setCategories(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchCategories();
    }, [router]);

    if (loading) return <div className="p-8 text-center">Đang tải...</div>;
    if (error) return <div className="p-8 text-center text-red-600">Lỗi: {error}</div>;

    const handleDelete = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                const token = localStorage.getItem('jwt');
                const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/categories/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!res.ok) {
                    throw new Error('Không thể xóa danh mục');
                }
                
                // Refresh categories list
                setCategories(categories.filter(category => category.id !== id));
            } catch (err) {
                console.error('Error deleting category:', err);
                alert(err.message);
            }
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Quản lý danh mục</h1>
            
            <div className="mb-4">
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => router.push('/admin/categories/new')}
                >
                    Thêm danh mục mới
                </button>
            </div>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.length > 0 ? categories.map(category => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{category.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                                <td className="px-6 py-4">{category.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                        onClick={() => router.push(`/admin/categories/edit/${category.id}`)}
                                    >
                                        Sửa
                                    </button>
                                    <button 
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center">Không có danh mục nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}