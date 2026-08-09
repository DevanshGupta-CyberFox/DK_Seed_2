import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../api/products';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        setActiveImage(0);
      })
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="text-center text-leaf-600 py-24">Loading...</p>;
  }

  if (error || !product) {
    return (
      <div className="text-center py-24">
        <p className="text-earth-500 mb-4">{error || 'Product not found'}</p>
        <Link to="/shop" className="text-leaf-600 hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [{ url: null }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <div className="aspect-square bg-leaf-50 rounded-xl overflow-hidden border border-leaf-100">
          {images[activeImage]?.url ? (
            <img
              src={images[activeImage].url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl text-leaf-300">🌿</div>
          )}
        </div>
        {product.images?.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={img.publicId || i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === activeImage ? 'border-leaf-600' : 'border-transparent'
                }`}
              >
                <img src={img.url} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <span className="text-xs uppercase tracking-wide text-leaf-500 font-semibold">
          {product.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-earth-700 mt-1">{product.name}</h1>
        <p className="text-2xl font-bold text-leaf-700 mt-4">₹{product.price}</p>
        <p className="text-earth-600 mt-4 leading-relaxed whitespace-pre-line">
          {product.description || 'No description available.'}
        </p>
        <p className="mt-6 text-sm font-medium">
          {product.stock > 0 ? (
            <span className="text-leaf-600">In stock ({product.stock} available)</span>
          ) : (
            <span className="text-red-500">Out of stock</span>
          )}
        </p>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} (₹${product.price})`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 bg-leaf-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-leaf-700 transition-colors"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
