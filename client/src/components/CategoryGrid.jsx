import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const CATEGORY_META = {
  'Indoor Plants': {
    icon: '🪴',
    image: 'https://images.unsplash.com/photo-1521319572754-19bb44ad8de3?auto=format&fit=crop&w=900&q=80',
    blurb: 'Air-purifying greens for every corner of your home',
  },
  'Outdoor Plants': {
    icon: '🌳',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    blurb: 'Hardy, sun-loving plants for gardens & balconies',
  },
  'Flower Plants': {
    icon: '🌼',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80',
    blurb: 'Vibrant blooms to brighten every season',
  },
  'Vegetable Seedlings': {
    icon: '🥕',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80',
    blurb: 'Farm-fresh starts for your own kitchen garden',
  },
  Seeds: {
    icon: '🌰',
    image: 'https://images.unsplash.com/photo-1524594227084-6d9c6b3a8dcc?auto=format&fit=crop&w=900&q=80',
    blurb: 'Premium, high-germination seeds for every season',
  },
  Pots: {
    icon: '🏺',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80',
    blurb: 'Handcrafted planters to match your style',
  },
  Fertilizers: {
    icon: '🧪',
    image: 'https://images.unsplash.com/photo-1585513553738-84c2916e3cd1?auto=format&fit=crop&w=900&q=80',
    blurb: 'Organic nutrients for thriving, healthy growth',
  },
  Tools: {
    icon: '🛠️',
    image: 'https://images.unsplash.com/photo-1416339306562-c3d09a3e7f1c?auto=format&fit=crop&w=900&q=80',
    blurb: 'Everything you need to tend your green space',
  },
};

const FALLBACK = {
  icon: '🌿',
  image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?auto=format&fit=crop&w=900&q=80',
  blurb: 'Discover our handpicked selection',
};

export default function CategoryGrid({ categories }) {
  if (!categories?.length) return null;

  return (
    <section id="categories" className="bg-earth-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-leaf-600 font-semibold tracking-widest text-xs uppercase">
            Browse the Nursery
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mt-3">
            Shop by Category
          </h2>
          <p className="text-earth-500 mt-3">
            From lush indoor greens to garden-ready seedlings — find exactly what your space needs.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, i) => {
            const meta = CATEGORY_META[cat] || FALLBACK;
            return (
              <Reveal key={cat} delay={i * 100}>
                <Link
                  to={`/shop?category=${encodeURIComponent(cat)}`}
                  className="group relative block h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500"
                >
                  <img
                    src={meta.image}
                    alt={cat}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/0 transition-opacity duration-500 group-hover:from-black/90" />

                  <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-xl shadow">
                    <span aria-hidden>{meta.icon}</span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-display text-2xl font-bold">{cat}</h3>
                    <p className="text-white/80 text-sm mt-1 max-w-[85%] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-12 transition-all duration-500">
                      {meta.blurb}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-gold-300 text-sm font-semibold mt-3 opacity-90">
                      Explore
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
