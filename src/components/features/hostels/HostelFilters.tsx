import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { universities } from '../../../data/mockData';
import { useHostels } from '../../../contexts/HostelContext';
import { FilterOptions } from '../../../types';
import Button from '../../ui/Button';

const HostelFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([200000, 600000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState<number>(2);
  
  const { filterHostels, resetFilters } = useHostels();
  
  const amenitiesList = [
    'WiFi', 'Security', 'Study Room', 'Laundry', 
    'Power Backup', 'Cafeteria', 'Gym', 'Swimming Pool'
  ];
  
  const roomTypesList = ['Single', 'Double', 'Triple', 'Single Deluxe'];

  useEffect(() => {
    applyFilters();
  }, [selectedUniversity, priceRange, selectedAmenities, selectedRoomTypes, maxDistance]);

  const applyFilters = () => {
    const filterOptions: FilterOptions = {};
    
    if (selectedUniversity) {
      filterOptions.university = selectedUniversity;
    }
    
    filterOptions.priceRange = {
      min: priceRange[0],
      max: priceRange[1]
    };
    
    if (selectedAmenities.length > 0) {
      filterOptions.amenities = selectedAmenities;
    }
    
    if (selectedRoomTypes.length > 0) {
      filterOptions.roomTypes = selectedRoomTypes;
    }
    
    filterOptions.distance = maxDistance;
    
    filterHostels(filterOptions);
  };

  const handleReset = () => {
    setSelectedUniversity('');
    setPriceRange([200000, 600000]);
    setSelectedAmenities([]);
    setSelectedRoomTypes([]);
    setMaxDistance(2);
    resetFilters();
  };

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const toggleRoomType = (roomType: string) => {
    if (selectedRoomTypes.includes(roomType)) {
      setSelectedRoomTypes(selectedRoomTypes.filter(r => r !== roomType));
    } else {
      setSelectedRoomTypes([...selectedRoomTypes, roomType]);
    }
  };

  // Format price in UGX
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Count active filters
  const activeFiltersCount = 
    (selectedUniversity ? 1 : 0) + 
    (selectedAmenities.length > 0 ? 1 : 0) + 
    (selectedRoomTypes.length > 0 ? 1 : 0) +
    (maxDistance !== 2 ? 1 : 0) +
    ((priceRange[0] !== 200000 || priceRange[1] !== 600000) ? 1 : 0);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline"
          size="md"
          icon={<Filter className="h-4 w-4" />}
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
        >
          Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-secondary-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
        
        {activeFiltersCount > 0 && (
          <button 
            onClick={handleReset}
            className="text-sm text-primary-900 hover:underline flex items-center"
          >
            <X className="h-3 w-3 mr-1" /> Clear all filters
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white rounded-xl shadow-md mb-6"
          >
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* University Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">University</h3>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-900"
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
                
                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </h3>
                  <input
                    type="range"
                    min="200000"
                    max="600000"
                    step="50000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
                  />
                  <input
                    type="range"
                    min="200000"
                    max="600000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                {/* Distance Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Max Distance: {maxDistance} km
                  </h3>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Room Types */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Room Types</h3>
                <div className="flex flex-wrap gap-2">
                  {roomTypesList.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleRoomType(type)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedRoomTypes.includes(type)
                          ? 'bg-primary-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Amenities */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedAmenities.includes(amenity)
                          ? 'bg-primary-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HostelFilters;