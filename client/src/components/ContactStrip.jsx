const SOCIALS = [
  { label: 'Instagram', icon: '📷', href: '#' },
  { label: 'Facebook', icon: '📘', href: '#' },
  { label: 'Twitter', icon: '🐦', href: '#' },
  { label: 'YouTube', icon: '▶️', href: '#' },
];

export default function ContactStrip() {
  return (
    <div className="sticky top-16 sm:top-18 z-30 bg-leaf-900 text-leaf-100 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <ul className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-5 text-center">
          <li className="flex items-center gap-1.5">
            <span aria-hidden>📞</span> +91 98765 43210
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden>✉️</span> hello@dknursery.example
          </li>
          <li className="hidden sm:flex items-center gap-1.5">
            <span aria-hidden>🕒</span> Open daily, 9am – 7pm
          </li>
        </ul>

        <ul className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} aria-label={s.label} className="text-leaf-100 hover:text-gold-300">
                <span aria-hidden>{s.icon}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
