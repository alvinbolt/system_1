import { Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { universities } from '../../../data/mockData';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (selectedUniversity) params.append('university', selectedUniversity);
    
    navigate(`/hostels?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: 'clamp(30px, 5vw, 60px) clamp(30px, 5vw, 60px)'
        }}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center relative z-10 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        <motion.div
          className="max-w-4xl mx-auto text-center mt-8 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight">
            Find Your Perfect Student Accommodation
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto px-2 sm:px-4">
            Discover and book verified hostels near your university. Safe, comfortable, and student-friendly accommodations across Uganda.
          </p>
          
          <motion.div 
            className="bg-white p-3 sm:p-4 md:p-5 rounded-2xl shadow-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-grow min-w-0">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="text"
                    className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 w-full rounded-xl text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary-900 transition-all"
                    placeholder="Search for hostels..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <select
                className="p-2.5 sm:p-3 md:p-4 rounded-xl border border-gray-200 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary-900 bg-white min-w-[140px] sm:min-w-[160px]"
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
              
              <button
                type="submit"
                className="bg-primary-900 hover:bg-primary-800 text-white font-medium py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-xl transition-colors duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg whitespace-nowrap"
              >
                Search <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </form>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto px-2 sm:px-4">
            {[
              { label: 'Hostels', value: '500+' },
              { label: 'Universities', value: '10+' },
              { label: 'Students', value: '10K+' },
              { label: 'Cities', value: '5+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-base text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;