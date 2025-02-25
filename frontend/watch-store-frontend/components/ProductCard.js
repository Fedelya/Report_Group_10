export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.image || '/images/placeholder.jpg'} alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <a href={`/products/${product.id}`} className="text-blue-500 hover:underline">View Details</a>
    </div>
  );
}