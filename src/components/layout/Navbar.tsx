import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X, Building, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10 || true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      'bg-white shadow-lg py-5'
    )}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <img src="/images/logo2.png" alt="HostelConnect Logo" className="h-12 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-grow">
            {/* Navigation Links - Centered */}
            <div className="flex items-center space-x-10 mx-auto">
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  clsx(
                    'text-lg font-medium transition-colors duration-200',
                    'text-gray-700 hover:text-primary-900',
                    isActive && 'text-primary-900 bg-primary-50 rounded-full px-5 py-3'
                  )
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/hostels" 
                className={({ isActive }) =>
                  clsx(
                    'text-lg font-medium transition-colors duration-200',
                    'text-gray-700 hover:text-primary-900',
                    isActive && 'text-primary-900 bg-primary-50 rounded-full px-5 py-3'
                  )
                }
                >
                Hostels
              </NavLink>
              <NavLink 
                to="/universities" 
                className={({ isActive }) =>
                  clsx(
                    'text-lg font-medium transition-colors duration-200',
                    'text-gray-700 hover:text-primary-900',
                    isActive && 'text-primary-900 bg-primary-50 rounded-full px-5 py-3'
                  )
                }
              >
                Universities
              </NavLink>
                </div>

            {/* Search Bar - Right Aligned */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-full px-5 py-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 w-full max-w-sm group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 transition-colors group-hover:text-primary-600" />
              </motion.div>
              <motion.input
                type="text"
                placeholder="Search hostels..."
                className="bg-transparent border-none focus:ring-0 outline-none flex-grow text-base text-gray-800 placeholder-gray-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center mb-5 bg-gray-100/90 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="h-5 w-5 text-gray-600 mr-2 transition-colors group-hover:text-primary-600" />
                </motion.div>
                <motion.input 
                  type="text"
                  placeholder="Search hostels..."
                  className="bg-transparent border-none focus:ring-0 outline-none w-full text-sm transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchTerm('')}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </motion.div>
              <div className="flex flex-col space-y-3">
                <NavLink 
                  to="/" 
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center py-2 px-3 hover:bg-gray-100 rounded-lg text-gray-700',
                      isActive && 'bg-primary-100 text-primary-900 font-semibold'
                    )
                  }
                >
                  <Home className="h-5 w-5 mr-3" />
                  Home
                </NavLink>
                <NavLink 
                  to="/hostels" 
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center py-2 px-3 hover:bg-gray-100 rounded-lg text-gray-700',
                      isActive && 'bg-primary-100 text-primary-900 font-semibold'
                    )
                  }
                >
                  <Building className="h-5 w-5 mr-3" />
                  Hostels
                </NavLink>
                <NavLink 
                  to="/universities" 
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center py-2 px-3 hover:bg-gray-100 rounded-lg text-gray-700',
                      isActive && 'bg-primary-100 text-primary-900 font-semibold'
                    )
                  }
                >
                  <Building className="h-5 w-5 mr-3" />
                  Universities
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;