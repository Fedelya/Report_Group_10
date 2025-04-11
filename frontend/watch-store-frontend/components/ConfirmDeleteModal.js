import React, { useEffect, useState } from "react";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, username }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShow(true), 10);
        } else {
            setShow(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-500">
            <div
                className={`bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md text-center transform transition-all duration-500 ease-out
                    ${show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-5"}
                `}
            >
                <h2 className="text-2xl font-bold text-red-600 mb-4 drop-shadow">⚠️ Xác nhận xoá</h2>
                <p className="text-gray-700 mb-6">
                    Bạn có chắc muốn xoá người dùng <span className="font-bold text-red-700">{username}</span> không?
                </p>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
                    >
                        Xoá
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
                    >
                        Huỷ
                    </button>
                </div>
            </div>
        </div>
    );
}
