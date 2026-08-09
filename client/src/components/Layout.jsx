import Navbar from './Navbar';
import ContactStrip from './ContactStrip';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ContactStrip />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
