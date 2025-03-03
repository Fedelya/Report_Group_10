// app/layout.js
import "../styles/globals.css"; // Đảm bảo import TailwindCSS

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}