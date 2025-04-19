"use client";
import { useState } from "react";

export default function AddUserModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        lastName: "",
        firstName: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        let errs = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{9,11}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!formData.username.trim()) errs.username = "Vui lòng nhập username";
        if (!emailRegex.test(formData.email)) errs.email = "Email không hợp lệ";
        if (!formData.lastName.trim()) errs.lastName = "Vui lòng nhập họ";
        if (!formData.firstName.trim()) errs.firstName = "Vui lòng nhập tên";
        if (!formData.phone || !phoneRegex.test(formData.phone)) errs.phone = "Số điện thoại không hợp lệ (9-11 số)";
        if (!formData.password || !passwordRegex.test(formData.password)) {
            errs.password = "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường và số";
        }
        if (formData.password !== formData.confirmPassword)
            errs.confirmPassword = "Mật khẩu không khớp";
        if (!formData.role) errs.role = "Vui lòng chọn vai trò";

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSuccess(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    isActive: true,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                alert("Thêm người dùng thất bại: " + data.message);
            } else {
                setSuccess(true);
                setFormData({
                    username: "",
                    email: "",
                    lastName: "",
                    firstName: "",
                    password: "",
                    confirmPassword: "",
                    phone: "",
                    role: "",
                });
            }
        } catch (error) {
            console.error("Lỗi mạng:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px] relative">
                <h2 className="text-xl font-bold text-center mb-4">Thêm người dùng</h2>
                <button className="absolute top-2 right-4 text-xl" onClick={onClose}>×</button>

                {success && (
                    <div className="bg-green-100 text-green-800 text-sm p-2 rounded mb-2">
                        Thêm người dùng thành công!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    {["username", "email", "lastName", "firstName", "phone"].map((field) => (
                        <div key={field}>
                            <label className="block mb-1 capitalize">{field}</label>
                            <input
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            {errors[field] && (
                                <p className="text-red-600 text-sm">{errors[field]}</p>
                            )}
                        </div>
                    ))}

                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">-- Chọn vai trò --</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="customer">Customer</option>
                        </select>
                        {errors.role && (
                            <p className="text-red-600 text-sm">{errors.role}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
