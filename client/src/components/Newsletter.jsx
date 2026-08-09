import { useState } from 'react';
import Reveal from './Reveal';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  }

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-leaf-600 via-leaf-600 to-leaf-800 px-6 sm:px-14 py-14 sm:py-16 text-center shadow-xl">
          <div
            className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-blob"
            aria-hidden
          />
          <div
            className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-gold-400/20 blur-3xl animate-blob"
            style={{ animationDelay: '2s' }}
            aria-hidden
          />

          <div className="relative">
            <span className="text-4xl" aria-hidden>
              🌿
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-4">
              Get 10% Off Your First Order
            </h2>
            <p className="text-leaf-50/90 mt-3 max-w-md mx-auto">
              Join our newsletter for seasonal plant care tips, early access to new arrivals, and
              exclusive discounts.
            </p>

            {subscribed ? (
              <p className="mt-7 inline-flex items-center gap-2 bg-white/15 text-white px-6 py-3 rounded-full font-medium">
                <span aria-hidden>✓</span> Thanks for subscribing! Check your inbox soon.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 px-5 py-3 rounded-full text-earth-800 placeholder:text-earth-400 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <button
                  type="submit"
                  className="bg-gold-400 text-leaf-900 font-semibold px-6 py-3 rounded-full hover:bg-gold-300 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-gold-500/20"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
