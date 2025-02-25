export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Watch Store</h1>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/products" className="hover:underline">Products</a></li>
          <li><a href="/cart" className="hover:underline">Cart</a></li>
          <li><a href="/auth/login" className="hover:underline">Login</a></li>
        </ul>
      </nav>
    </header>
  );
}