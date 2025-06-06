import { Search, ArrowRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { universities } from '../../../data/mockData';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (selectedUniversity) params.append('university', selectedUniversity);
    
    navigate(`/hostels?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden rounded-b-[3rem]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/50"></div>
        
        {/* Floating Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            initial={{ 
              x: Math.random() * 100 - 50, 
              y: Math.random() * 100 - 50,
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 1]
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse",
              duration: 15 + i * 5, 
              ease: "easeInOut" 
            }}
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-8 h-screen flex flex-col justify-center relative z-10">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Find Your Perfect
                <span className="text-secondary-400 block mt-2">Student Home</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Connect with the best hostels across Uganda's top universities
              </motion.p>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-lg p-2 rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                  <div className="flex-grow">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        className="pl-12 pr-4 py-4 w-full rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-400 transition-all text-gray-900 placeholder-gray-500"
                        placeholder="Search for hostels..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      className="pl-12 pr-8 py-4 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-400 transition-all text-gray-900 appearance-none"
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                    >
                      <option value="">All Universities</option>
                      {universities.map((uni) => (
                        <option key={uni.id} value={uni.name}>
                          {uni.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="bg-secondary-400 hover:bg-secondary-500 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Search
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </form>
              </motion.div>
              
              {/* Popular Universities */}
              <motion.div 
                className="mt-12 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {universities.slice(0, 4).map((uni) => (
                  <motion.button
                    key={uni.id}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedUniversity(uni.name);
                      handleSearch(new Event('submit') as any);
                    }}
                  >
                    {uni.name}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSection;