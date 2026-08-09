import Reveal from './Reveal';

const STATS = [
  { value: '15+', label: 'Years of Experience' },
  { value: '500+', label: 'Plant Varieties' },
  { value: '15k+', label: 'Happy Customers' },
  { value: '50+', label: 'Cities Delivered' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/5">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80"
              alt="DK Seeds & Nursery greenhouse"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="hidden sm:flex absolute -bottom-8 -right-8 w-40 h-40 rounded-2xl bg-leaf-600 text-white flex-col items-center justify-center shadow-xl animate-float-slow">
            <span className="text-3xl font-display font-bold">15+</span>
            <span className="text-xs mt-1 text-center px-2">Years Nurturing Nature</span>
          </div>
        </Reveal>

        <Reveal delay={150} className="order-1 lg:order-2">
          <span className="text-leaf-600 font-semibold tracking-widest text-xs uppercase">
            Our Story
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mt-3">
            Rooted in Passion, <br className="hidden sm:block" /> Grown for Your Home
          </h2>
          <p className="text-earth-500 mt-5 leading-relaxed">
            What began as a small family plot has grown into a trusted nursery serving thousands of
            plant lovers across the country. We hand-raise every seedling in our own greenhouses,
            combining traditional horticulture with modern care — so every plant that reaches your
            doorstep is healthy, vibrant, and ready to thrive.
          </p>
          <p className="text-earth-500 mt-4 leading-relaxed">
            Whether you&apos;re starting your first windowsill garden or building a backyard
            paradise, our team of horticulturists is here to help you grow with confidence.
          </p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-earth-100">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-leaf-700">{s.value}</dd>
                <dd className="text-xs text-earth-500 mt-1">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
