import ProductCard from '../../components/ProductCard';

// Dữ liệu giả lập (sẽ thay bằng API sau)
const fetchProducts = async () => {
  return [
    { id: 1, name: 'Watch A', price: 100, image: '/images/watch-a.jpg' },
    { id: 2, name: 'Watch B', price: 150, image: '/images/watch-b.jpg' },
  ];
};

export default async function Products() {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}