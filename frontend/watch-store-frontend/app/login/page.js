'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_USER_API_URL || 'http://localhost:8081';
            console.log('Calling login API:', `${apiUrl}/users/login`);

            const res = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            console.log('Login response status:', res.status);

            // Đọc response dưới dạng text trước để debug
            const responseText = await res.text();
            console.log('Response text:', responseText);

            let data;
            try {
                // Chuyển text thành JSON nếu có thể
                data = responseText ? JSON.parse(responseText) : {};
            } catch (e) {
                console.error("Không thể parse response JSON:", e);
                throw new Error('Phản hồi từ server không hợp lệ');
            }

            if (!res.ok) {
                throw new Error(data?.message || 'Đăng nhập thất bại');
            }

            // Lưu token và thông tin người dùng vào localStorage
            console.log('Login successful, data:', data);
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);

            // Chuyển hướng về trang chủ
            console.log('Đăng nhập thành công, chuyển hướng về trang chủ');
            router.push('/');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Đăng nhập thất bại, vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 max-w-md w-full bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Tên đăng nhập</label>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded font-medium ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black text-white hover:bg-gray-800"
                        }`}
                    >
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p>
                        Chưa có tài khoản?{" "}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}