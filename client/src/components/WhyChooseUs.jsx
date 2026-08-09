import Reveal from './Reveal';

const FEATURES = [
  {
    icon: '🌱',
    title: 'Nursery-Grown Quality',
    desc: 'Every plant featured here is raised and inspected in our own greenhouses.',
  },
  {
    icon: '📖',
    title: 'Detailed Plant Guides',
    desc: 'Learn sunlight, water and soil needs for every variety we grow.',
  },
  {
    icon: '💬',
    title: 'Expert Care Guidance',
    desc: 'Practical tips from our horticulturists to help your plants thrive.',
  },
  {
    icon: '🌍',
    title: 'Sustainable Practices',
    desc: 'Organic growing methods that are gentle on soil and environment.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-leaf-600 font-semibold tracking-widest text-xs uppercase">
            Why DK Nursery
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mt-3">
            Grown With Care, Rooted In Trust
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="group h-full card-premium rounded-2xl p-7 border border-earth-100 hover:border-leaf-200 hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-leaf-50 flex items-center justify-center text-2xl mb-5 group-hover:bg-leaf-100 group-hover:scale-110 transition-all duration-300">
                  <span aria-hidden>{f.icon}</span>
                </div>
                <h3 className="font-semibold text-earth-800 text-lg">{f.title}</h3>
                <p className="text-earth-500 text-sm mt-2 leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
