import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HostelCard from './HostelCard';
import { useHostels } from '../../../contexts/HostelContext';
import { Building } from 'lucide-react';

const HostelGrid = () => {
  const { filteredHostels, loading, error } = useHostels();
  const [visibleCount, setVisibleCount] = useState(6);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Reset visible count when filtered hostels change
  useEffect(() => {
    setVisibleCount(6);
  }, [filteredHostels]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  if (filteredHostels.length === 0) {
    return (
      <div className="text-center p-8">
        <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No hostels found</h3>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria to find more hostels.
        </p>
      </div>
    );
  }

  const visibleHostels = filteredHostels.slice(0, visibleCount);
  const hasMore = visibleCount < filteredHostels.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleHostels.map((hostel, index) => (
          <motion.div
            key={hostel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <HostelCard hostel={hostel} />
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-white hover:bg-gray-50 text-primary-900 font-medium px-6 py-2 rounded-full border border-primary-900 transition-colors duration-300"
          >
            Load More Hostels
          </button>
        </div>
      )}
    </div>
  );
};

export default HostelGrid;