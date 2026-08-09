import { useState } from 'react';
import Reveal from './Reveal';

const INFO = [
  { icon: '📍', label: 'Visit Us', value: 'Nursery Road, Green Valley, India' },
  { icon: '📞', label: 'Call Us', value: '+91 98765 43210' },
  { icon: '✉️', label: 'Email Us', value: 'hello@dknursery.example' },
  { icon: '🕒', label: 'Working Hours', value: 'Open daily, 9am – 7pm' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <section id="contact" className="bg-earth-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-leaf-600 font-semibold tracking-widest text-xs uppercase">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mt-3">
            We&apos;d Love to Hear From You
          </h2>
          <p className="text-earth-500 mt-3">
            Questions about a plant, a bulk order, or just want gardening advice? Reach out.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <Reveal className="lg:col-span-2 flex flex-col gap-4">
            {INFO.map((item) => (
              <div
                key={item.label}
                className="card-premium flex items-start gap-4 rounded-2xl p-5 border border-earth-100 hover:border-leaf-200 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-leaf-50 flex items-center justify-center text-xl">
                  <span aria-hidden>{item.icon}</span>
                </div>
                <div>
                  <div className="text-earth-800 font-semibold text-sm">{item.label}</div>
                  <div className="text-earth-500 text-sm mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={150} className="lg:col-span-3">
            <div className="card-premium rounded-2xl p-6 sm:p-8 border border-earth-100">
              {sent ? (
                <div className="h-full min-h-64 flex flex-col items-center justify-center text-center gap-3 py-10">
                  <span className="text-4xl" aria-hidden>
                    🌱
                  </span>
                  <h3 className="font-display text-xl font-bold text-earth-800">
                    Message Sent!
                  </h3>
                  <p className="text-earth-500 text-sm max-w-xs">
                    Thanks for reaching out — our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-leaf-700 font-medium text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="block text-sm font-medium text-earth-700 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border border-earth-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf-400 transition-shadow"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="email" className="block text-sm font-medium text-earth-700 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full border border-earth-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf-400 transition-shadow"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-earth-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full border border-earth-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf-400 transition-shadow resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-leaf-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-leaf-700 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-leaf-600/20"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
