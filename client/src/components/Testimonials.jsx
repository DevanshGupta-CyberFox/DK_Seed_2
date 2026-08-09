import Reveal from './Reveal';

const TESTIMONIALS = [
  {
    name: 'Ananya Rao',
    role: 'Balcony Gardener, Bengaluru',
    initials: 'AR',
    color: 'bg-leaf-500',
    quote:
      "The peace lily I ordered arrived in perfect condition and it's still thriving three months later. Packaging was so thoughtful — you can tell they actually care about plants.",
    rating: 5,
  },
  {
    name: 'Rohit Malhotra',
    role: 'First-time Plant Parent',
    initials: 'RM',
    color: 'bg-earth-500',
    quote:
      'I knew nothing about gardening. The care guide that came with my succulents made it so easy, and their support team answered every silly question I had.',
    rating: 5,
  },
  {
    name: 'Priya Nambiar',
    role: 'Home Chef, Kochi',
    initials: 'PN',
    color: 'bg-gold-500',
    quote:
      'My vegetable seedlings took root within days. Best quality I have found online — fresher than anything at the local nursery, and delivered right on time.',
    rating: 5,
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-gold-400" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden>
          {i < count ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative bg-leaf-900 py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.04]" aria-hidden />
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-leaf-500/20 blur-3xl" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-gold-300 font-semibold tracking-widest text-xs uppercase">
            Loved by Plant Parents
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
            What Our Customers Say
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="h-full flex flex-col bg-white/[0.06] border border-white/10 backdrop-blur rounded-2xl p-7 hover:bg-white/[0.09] hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl text-gold-400/40 font-display leading-none" aria-hidden>
                  “
                </span>
                <blockquote className="text-leaf-50/90 text-sm leading-relaxed flex-1 -mt-3">
                  {t.quote}
                </blockquote>
                <Stars count={t.rating} />
                <figcaption className="flex items-center gap-3 mt-5 pt-5 border-t border-white/10">
                  <div
                    className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-semibold text-sm shrink-0`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-leaf-200/70 text-xs">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
