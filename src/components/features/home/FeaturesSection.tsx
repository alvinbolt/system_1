import { motion } from 'framer-motion';
import { Building, Search, Users, Star, Clock, Shield, Wifi, Lock, Heart, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Building className="h-8 w-8" />,
    title: 'Extensive Hostel Options',
    description: 'Browse through a wide range of hostels across all major universities in Uganda.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Advanced Filtering',
    description: 'Find your perfect accommodation with our comprehensive search and filtering options.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Connect with Brokers',
    description: 'Get personalized assistance from our network of verified hostel brokers.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Verified Reviews',
    description: 'Read authentic reviews from fellow students who have lived in the hostels.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: 'Quick Booking',
    description: 'Secure your accommodation in minutes with our streamlined booking process.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Secure Transactions',
    description: 'Book with confidence knowing that your payments and personal data are protected.',
    color: 'from-red-500 to-red-600',
  },
];

const additionalFeatures = [
  {
    icon: <Wifi className="h-6 w-6" />,
    text: 'High-Speed Internet',
  },
  {
    icon: <Lock className="h-6 w-6" />,
    text: '24/7 Security',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    text: 'Student-Friendly',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    text: 'Modern Amenities',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
            Why Choose HostelConnect?
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We make finding student accommodation easier, safer, and more convenient than ever before.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              <div className={`p-4 bg-gradient-to-br ${feature.color} rounded-xl inline-flex mb-6 transform transition-transform duration-300 group-hover:rotate-6`}>
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div 
          className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-3 bg-white/10 rounded-full mb-4">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <span className="text-white font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;