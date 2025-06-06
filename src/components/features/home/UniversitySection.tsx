import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { universities } from '../../../data/mockData';

const UniversitySection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary-900 to-primary-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Browse Hostels by University
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find the perfect accommodation near your campus with our comprehensive listings of approved student hostels.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {universities.map((university, index) => (
            <motion.div
              key={university.id}
              className="group relative h-80 overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 z-10"></div>
              
              <img 
                src={university.imageUrl}
                alt={university.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-secondary-400 transition-colors">
                  {university.name}
                </h3>
                <div className="flex items-center text-white/80 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{university.location}</span>
                </div>
                <div className="flex items-center text-white/80 text-sm mb-4">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{university.studentCount} Students</span>
                </div>
                
                <Link 
                  to={`/hostels?university=${encodeURIComponent(university.name)}`}
                  className="inline-flex items-center text-white hover:text-secondary-400 transition-colors group-hover:translate-x-2 duration-300"
                >
                  View Hostels
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute top-4 right-4 bg-white/90 text-primary-900 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0 z-20">
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link 
            to="/universities"
            className="inline-flex items-center px-6 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-xl transition-colors duration-300 group"
          >
            View All Universities
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default UniversitySection;