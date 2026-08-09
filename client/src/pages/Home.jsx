import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import AboutSection from '../components/AboutSection';
import Newsletter from '../components/Newsletter';
import ContactSection from '../components/ContactSection';
import Reveal from '../components/Reveal';
import { getCategories, getProducts } from '../api/products';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getProducts({ featured: 'true' })])
      .then(([cats, products]) => {
        setCategories(cats);
        setFeatured(products);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero />
      <CategoryGrid categories={categories} />
      <WhyChooseUs />

      <section className="bg-earth-50 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div className="text-center sm:text-left mx-auto sm:mx-0 max-w-xl">
              <span className="text-leaf-600 font-semibold tracking-widest text-xs uppercase">
                Handpicked For You
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mt-3">
                Featured Plants
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-leaf-700 font-semibold hover:gap-2.5 transition-all duration-300"
            >
              View All Plants <span aria-hidden>→</span>
            </Link>
          </Reveal>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-earth-100 animate-pulse" />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <p className="text-center text-earth-500 py-12">No featured products yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featured.map((p, i) => (
                <Reveal key={p._id} delay={(i % 4) * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-leaf-700 font-semibold hover:gap-2.5 transition-all duration-300"
            >
              View All Plants <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />
      <Testimonials />
      <Newsletter />
      <ContactSection />
    </div>
  );
}
