import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const image = product.images?.[0]?.url;
  const outOfStock = product.stock <= 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group card-premium rounded-2xl border border-earth-100 hover:border-leaf-200 overflow-hidden flex flex-col hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="relative aspect-square bg-leaf-50 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-leaf-300">🌿</div>
        )}

        {product.featured && (
          <span className="absolute top-3 left-3 bg-gold-400 text-leaf-900 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow">
            Featured
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-xs font-semibold text-red-600 bg-white px-3 py-1 rounded-full shadow">
              Out of stock
            </span>
          </div>
        )}

        <span className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-leaf-800/90 backdrop-blur text-white text-center text-xs font-semibold py-2 rounded-full">
          View Details
        </span>
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-[11px] uppercase tracking-wide text-leaf-500 font-semibold">
          {product.category}
        </span>
        <h3 className="font-semibold text-earth-800 line-clamp-1">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-leaf-700 font-bold">₹{product.price}</span>
        </div>
      </div>
    </Link>
  );
}
