"use client";

import {useState} from "react";
import {Bar, Pie, Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ReportManagement() {
    const [content, setContent] = useState("overview");
    const [timeFrame, setTimeFrame] = useState("all");

    const dataUserStatsBar = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
        datasets: [
            {
                label: "Người dùng mới",
                data: [50, 70, 100, 120, 150, 200],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const dataTopSpendingUsers = {
        labels: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"],
        datasets: [
            {
                label: "Số tiền đã chi tiêu (VND)",
                data: [5000000, 3000000, 2500000, 2000000],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataProductStats = {
        labels: ["Sản phẩm A", "Sản phẩm B", "Sản phẩm C", "Sản phẩm D"],
        datasets: [
            {
                label: "Doanh số bán hàng",
                data: [300, 200, 150, 100],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)"
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataRevenueStats = {
        labels: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
        datasets: [
            {
                label: "Doanh thu",
                data: [2000, 3000, 2500, 4000],
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const renderContent = () => {
        switch (content) {
            case "userStats":
                return (
                    <div className="w-full max-w-6xl m-4 p-6 bg-white shadow-md rounded-lg">
                        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">
                            Thống kê người dùng
                        </h2>
                        <Bar data={dataUserStatsBar}/>
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                Người dùng mua hàng nhiều nhất
                            </h3>
                            <label className="block mb-4">
                                <span className="font-medium text-gray-700">Lọc theo khoảng thời gian:</span>
                                <select
                                    className="ml-2 border border-gray-300 rounded p-2"
                                    value={timeFrame}
                                    onChange={(e) => setTimeFrame(e.target.value)}
                                >
                                    <option value="all">Tất cả thời gian</option>
                                    <option value="lastWeek">Tuần trước</option>
                                    <option value="lastMonth">Tháng trước</option>
                                    <option value="lastYear">Năm trước</option>
                                </select>
                            </label>
                            <Bar data={dataTopSpendingUsers}/>
                        </div>
                    </div>
                );
            case "productStats":
                return (
                    <div className="w-full max-w-6xl m-4 p-6 bg-white shadow-md rounded-lg">
                        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">
                            Thống kê sản phẩm
                        </h2>
                        <Pie data={dataProductStats}/>
                    </div>
                );
            case "revenueStats":
                return (
                    <div className="w-full max-w-6xl m-4 p-10 bg-white shadow-lg rounded-lg">
                        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
                            Thống kê doanh thu
                        </h2>
                        <Bar data={dataRevenueStats}/>
                        <div className="mt-8">
                            <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
                                Thống kê trong ngày
                            </h3>
                            <ul className="text-center text-lg text-gray-600 space-y-2">
                                <li><span className="font-medium text-gray-800">Doanh thu:</span> 500,000 VND</li>
                                <li><span className="font-medium text-gray-800">Số đơn hàng:</span> 25</li>
                                <li><span className="font-medium text-gray-800">Sản phẩm bán ra:</span> 120</li>
                            </ul>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="w-full max-w-4xl m-4 p-6 bg-white shadow-md rounded-lg">
                        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">
                            Chào mừng đến với Quản Lý Báo Cáo
                        </h2>
                        <p className="text-center text-gray-500 text-lg">
                            Hãy chọn một chức năng từ menu bên trái để xem chi tiết.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="flex bg-gray-100 h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col space-y-6">
                <h2 className="text-2xl font-bold">Menu</h2>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
                    onClick={() => setContent("userStats")}
                >
                    Thống kê người dùng
                </button>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
                    onClick={() => setContent("productStats")}
                >
                    Thống kê sản phẩm
                </button>
                <button
                    className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 focus:outline-none transition"
                    onClick={() => setContent("revenueStats")}
                >
                    Thống kê doanh thu
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center py-8">
                <header className="w-full bg-blue-600 text-white py-4 shadow-md">
                    <h1 className="text-center text-3xl">Report Management</h1>
                </header>
                <main className="flex-1 flex items-center justify-center">{renderContent()}</main>
                <footer className="bg-gray-800 text-white py-4 text-center shadow-md">
                    © {new Date().getFullYear()} Quản Lý Báo Cáo. Tất cả các quyền được bảo lưu.
                </footer>
            </div>
        </div>
    );
}


