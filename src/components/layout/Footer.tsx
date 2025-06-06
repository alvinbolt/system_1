import { Building, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-blue-900 text-white relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url(/footer-bg.jpg)' }}
      />

      <div className="container mx-auto px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-2">
              <Building className="h-8 w-8" />
              <span className="text-xl font-display font-bold">HostelConnect</span>
            </Link>
            <p className="text-blue-100">
              Your trusted platform for finding the perfect student accommodation near universities.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`}>{item}</Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Universities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Universities</h3>
            <ul className="space-y-2">
              {[
                'Makerere University',
                'Kyambogo University',
                'Mbarara University',
                'Gulu University',
                'Busitema University'
              ].map((university) => (
                <motion.li
                  key={university}
                  whileHover={{ x: 5 }}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Link to={`/hostels?university=${encodeURIComponent(university)}`}>
                    {university}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start space-x-2 text-blue-100">
                <MapPin className="h-5 w-5" />
                <span>Kampala, Uganda</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2 text-blue-100">
                <Phone className="h-5 w-5" />
                <span>+256 123 456 789</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2 text-blue-100">
                <Mail className="h-5 w-5" />
                <span>info@hostelconnect.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-800 text-center">
          <p className="text-blue-100">
            © {new Date().getFullYear()} HostelConnect. All rights reserved.
          </p>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;