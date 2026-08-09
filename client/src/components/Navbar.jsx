import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/#categories', label: 'Categories' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-leaf-700 bg-leaf-100' : 'text-earth-700 hover:text-leaf-700 hover:bg-leaf-50'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur border-b border-leaf-100 shadow-sm'
          : 'bg-white/80 backdrop-blur border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link to="/" className="group flex items-center gap-2 font-display font-bold text-lg text-leaf-700">
            <span
              className="text-2xl inline-block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              aria-hidden
            >
              🌿
            </span>
            DK Seeds &amp; Nursery
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.end}>
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <NavLink to="/admin" className={linkClass}>
                Admin Dashboard
              </NavLink>
            ) : (
              <Link
                to="/admin/login"
                className="ml-2 inline-flex items-center gap-1.5 bg-leaf-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-leaf-700 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
              >
                Admin Login
              </Link>
            )}
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-leaf-700 hover:bg-leaf-50"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.end} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>
                Admin Dashboard
              </NavLink>
            ) : (
              <NavLink to="/admin/login" className={linkClass} onClick={() => setOpen(false)}>
                Admin Login
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
