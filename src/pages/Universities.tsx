import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Users, Building2, GraduationCap, Filter, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { universities } from '../data/mockData';

// Fallback image for universities without images
const FALLBACK_IMAGE = '/images/universities/default-university.jpg';

const Universities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Get unique locations for filter
  const locations = Array.from(new Set(universities.map(uni => uni.location)));

  // Filter universities based on search term and location
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || uni.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  // Handle image loading errors
  const handleImageError = (universityId: string) => {
    setImageErrors(prev => ({ ...prev, [universityId]: true }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-primary-900 text-white pt-20 sm:pt-24 md:pt-28 pb-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ugandan Universities
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Explore our network of partner universities across Uganda and find the perfect accommodation for your academic journey.
              </p>
              
              {/* Search and Filter Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search universities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="px-4 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <Filter className="h-5 w-5" />
                    <span>Filter</span>
                  </motion.button>
                </div>

                {/* Filter Dropdown */}
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10"
                    >
                      <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedLocation('')}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            !selectedLocation ? 'bg-primary-100 text-primary-900' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          All Locations
                        </button>
                        {locations.map((location) => (
                          <button
                            key={location}
                            onClick={() => setSelectedLocation(location)}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                              selectedLocation === location ? 'bg-primary-100 text-primary-900' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredUniversities.map((university) => (
                <motion.div
                  key={university.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={imageErrors[university.id] ? FALLBACK_IMAGE : university.imageUrl}
                      alt={university.name}
                      onError={() => handleImageError(university.id)}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-xl font-bold text-white mb-1">{university.name}</h2>
                      <div className="flex items-center text-white/90">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{university.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {university.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <Users className="h-5 w-5 text-primary-600 mx-auto mb-1" />
                        <p className="text-sm text-gray-600">
                          {university.studentCount?.toLocaleString()} Students
                        </p>
                      </div>
                      <div className="text-center">
                        <Building2 className="h-5 w-5 text-primary-600 mx-auto mb-1" />
                        <p className="text-sm text-gray-600">
                          {university.hostelCount} Hostels
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/hostels?university=${encodeURIComponent(university.name)}`}
                        className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        View Hostels
                      </Link>
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border border-primary-600 text-primary-600 text-center py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results Message */}
          {filteredUniversities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Universities;
