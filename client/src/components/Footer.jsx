import { Link } from 'react-router-dom';

const SOCIALS = [
  { label: 'Instagram', icon: '📷', href: '#' },
  { label: 'Facebook', icon: '📘', href: '#' },
  { label: 'Twitter', icon: '🐦', href: '#' },
  { label: 'YouTube', icon: '▶️', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-leaf-900 text-leaf-50 mt-16 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03]" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display font-bold text-xl flex items-center gap-2">
            <span aria-hidden>🌿</span> DK Seeds &amp; Nursery
          </h3>
          <p className="mt-3 text-sm text-leaf-200 leading-relaxed max-w-xs">
            Quality plants, seeds, and gardening supplies for every home and garden — grown with
            care, delivered with love.
          </p>
          <div className="flex items-center gap-2 mt-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-gold-400 hover:text-leaf-900 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span aria-hidden>{s.icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-leaf-200">
            <li>
              <Link to="/" className="hover:text-gold-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gold-300 transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <a href="/#about" className="hover:text-gold-300 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-gold-300 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white">Categories</h4>
          <ul className="space-y-2 text-sm text-leaf-200">
            <li>
              <a href="/#categories" className="hover:text-gold-300 transition-colors">
                Indoor Plants
              </a>
            </li>
            <li>
              <a href="/#categories" className="hover:text-gold-300 transition-colors">
                Outdoor Plants
              </a>
            </li>
            <li>
              <a href="/#categories" className="hover:text-gold-300 transition-colors">
                Seeds &amp; Pots
              </a>
            </li>
            <li>
              <a href="/#categories" className="hover:text-gold-300 transition-colors">
                Fertilizers &amp; Tools
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-leaf-200">
            <li className="flex items-center gap-2">
              <span aria-hidden>📞</span> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>✉️</span> hello@dknursery.example
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>🕒</span> Open daily, 9am – 7pm
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5 text-center text-xs text-leaf-300 px-4">
        © {new Date().getFullYear()} DK Seeds &amp; Nursery. All rights reserved.
      </div>
    </footer>
  );
}
