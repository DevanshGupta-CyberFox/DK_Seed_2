import { Link } from 'react-router-dom';

const STATS = [
  { value: '500+', label: 'Plant Varieties' },
  { value: '15k+', label: 'Happy Customers' },
  { value: '15+', label: 'Years of Care' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-leaf-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1740&q=80')",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-leaf-900/85 via-leaf-900/80 to-leaf-900/95" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-leaf-900/60 via-transparent to-leaf-900/60" aria-hidden />

      {/* decorative blobs */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-leaf-400/30 blur-3xl animate-blob"
        aria-hidden
      />
      <div
        className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-gold-400/20 blur-3xl animate-blob"
        style={{ animationDelay: '3s' }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 sm:pt-36 sm:pb-32 flex flex-col items-center text-center gap-7">
        <span className="animate-fade-in-up inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium text-leaf-50">
          <span aria-hidden>🌿</span> Premium Nursery &amp; Garden Studio
        </span>

        <h1
          className="animate-fade-in-up font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
          style={{ animationDelay: '100ms' }}
        >
          Fresh Plants &amp;
          <br />
          <span className="text-shimmer">Healthy Seedlings</span>
        </h1>

        <p
          className="animate-fade-in-up max-w-xl text-leaf-50/90 text-base sm:text-lg"
          style={{ animationDelay: '200ms' }}
        >
          Bringing nature closer to your home — handpicked flowers, vegetable seedlings and indoor
          plants, nurtured with care and delivered with love.
        </p>

        <div
          className="animate-fade-in-up flex flex-col sm:flex-row items-center gap-4 pt-2"
          style={{ animationDelay: '300ms' }}
        >
          <a
            href="#categories"
            className="group inline-flex items-center gap-2 bg-gold-400 text-leaf-900 font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-gold-500/20 hover:bg-gold-300 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            Explore Nursery
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/30 backdrop-blur text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            Shop Collection
          </Link>
        </div>

        <dl
          className="animate-fade-in-up grid grid-cols-3 gap-6 sm:gap-16 pt-10 border-t border-white/15 mt-6 w-full max-w-xl"
          style={{ animationDelay: '400ms' }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl sm:text-3xl font-bold text-gold-300">{s.value}</dd>
              <dd className="text-xs sm:text-sm text-leaf-100/80 mt-1">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#categories"
        aria-label="Scroll to categories"
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-leaf-100/70 hover:text-white transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <span className="animate-bounce-y text-lg" aria-hidden>
          ↓
        </span>
      </a>
    </section>
  );
}
