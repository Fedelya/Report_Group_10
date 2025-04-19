'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }
        
        setLoading(true);
        
        try {
            const userData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName || "",
                lastName: formData.lastName || "",
                phone: formData.phone || "",
                address: formData.address || "",
                role: "ROLE_USER",
                isActive: true
            };
            
            console.log('Sending registration data:', userData);
            
            const apiUrl = process.env.NEXT_PUBLIC_USER_API_URL || 'http://localhost:8081';
            
            const res = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include'
            });
            
            console.log('Registration response status:', res.status);
            
            const responseText = await res.text();
            console.log('Response text:', responseText);

            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (e) {
                responseData = { message: responseText };
            }
            
            if (!res.ok) {
                throw new Error(responseData?.message || `Đăng ký thất bại (${res.status})`);
            }
            
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            router.push('/login');
        } catch (err) {
            console.error('Register error:', err);
            setError(err.message || 'Đăng ký thất bại, vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen py-12 bg-gray-100">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký tài khoản</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Tên đăng nhập *</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Họ</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Tên</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 mb-2">Số điện thoại</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 mb-2">Địa chỉ</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                            rows="2"
                        ></textarea>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Mật khẩu *</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Xác nhận mật khẩu *</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                    </div>
                    
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded font-medium ${
                                loading 
                                    ? "bg-gray-400 cursor-not-allowed" 
                                    : "bg-black text-white hover:bg-gray-800"
                            }`}
                        >
                            {loading ? "Đang xử lý..." : "Đăng ký"}
                        </button>
                    </div>
                </form>
                
                <div className="mt-6 text-center">
                    <p>
                        Đã có tài khoản?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}