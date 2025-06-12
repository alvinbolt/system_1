import { Building, Mail, Phone, MapPin, Facebook, Twitter, Instagram, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <img src="/images/logo1.png" alt="HostelConnect Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-display font-bold text-white">HostelConnect</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Connecting students with premium accommodation options across Ugandan universities.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary-500 transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/hostels', label: 'Hostels' },
                { to: '/universities', label: 'Universities' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact Us' }
              ].map((link) => (
                <motion.li 
                  key={link.to}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Universities */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Universities</h3>
            <ul className="space-y-3">
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
                  className="group"
                >
                  <Link 
                    to={`/hostels?university=${encodeURIComponent(university)}`}
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {university}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center justify-center md:justify-start space-x-3 text-gray-300"
              >
                <MapPin className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                <span className="text-sm">Plot 45, Kampala Road, Kampala, Uganda</span>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center justify-center md:justify-start space-x-3 text-gray-300"
              >
                <Phone className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                <span className="text-sm">+256 78 123 4567</span>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center justify-center md:justify-start space-x-3 text-gray-300"
              >
                <Mail className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                <span className="text-sm">info@hostelconnect.ug</span>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} HostelConnect. All rights reserved.
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -5 }}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;