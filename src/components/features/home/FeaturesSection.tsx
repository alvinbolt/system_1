import { motion } from 'framer-motion';
import { Building, Search, Users, Star, Clock, Shield, Wifi, Lock, Heart, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Building className="h-6 w-6" />,
    title: 'Extensive Hostel Options',
    description: 'Browse through a wide range of hostels across all major universities in Uganda.',
    bgColor: 'bg-blue-600',
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: 'Advanced Filtering',
    description: 'Find your perfect accommodation with our comprehensive search and filtering options.',
    bgColor: 'bg-purple-600',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Connect with Brokers',
    description: 'Get personalized assistance from our network of verified hostel brokers.',
    bgColor: 'bg-rose-600',
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Verified Reviews',
    description: 'Read authentic reviews from fellow students who have lived in the hostels.',
    bgColor: 'bg-amber-500',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Quick Booking',
    description: 'Secure your accommodation in minutes with our streamlined booking process.',
    bgColor: 'bg-emerald-500',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure Transactions',
    description: 'Book with confidence knowing that your payments and personal data are protected.',
    bgColor: 'bg-red-500',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
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
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`p-3 text-white rounded-xl inline-flex mb-4 ${feature.bgColor}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Bottom Features Section */}
      <div className="bg-primary-900 py-12 mt-16 mx-auto max-w-7xl rounded-xl">
        <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
          <div className="flex flex-col items-center">
            <Wifi className="h-8 w-8 mb-3" />
            <p className="text-lg font-medium">High-Speed Internet</p>
          </div>
          <div className="flex flex-col items-center">
            <Lock className="h-8 w-8 mb-3" />
            <p className="text-lg font-medium">24/7 Security</p>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="h-8 w-8 mb-3" />
            <p className="text-lg font-medium">Student-Friendly</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="h-8 w-8 mb-3" />
            <p className="text-lg font-medium">Modern Amenities</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;