import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { universities } from '../../../data/mockData';

// Get top 3 universities by student count
const popularUniversities = [...universities]
  .sort((a, b) => (b.studentCount || 0) - (a.studentCount || 0))
  .slice(0, 3);

const UniversitySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Popular Universities
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find hostels near Uganda's top universities with our extensive network of accommodations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularUniversities.map((university, index) => (
            <motion.div
              key={university.id}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                <div className="absolute inset-0">
                  <img
                    src={university.imageUrl}
                    alt={university.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{university.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{university.location}</span>
                  </div>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {university.hostelCount} hostels
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/universities"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300"
          >
            View All Universities
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default UniversitySection;