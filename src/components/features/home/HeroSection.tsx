import { Search, ArrowRight, MapPin } from 'lucide-react';
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
    <div className="relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden rounded-b-[3rem]">
      {/* Static Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/50"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-8 h-screen flex flex-col justify-center relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="text-secondary-400 block mt-2">Student Home</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            Connect with the best hostels across Uganda's top universities
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg p-2 rounded-2xl shadow-xl">
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
              
              <button
                type="submit"
                className="bg-secondary-400 hover:bg-secondary-500 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center group"
              >
                Search
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
          
          {/* Popular Universities */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {universities.slice(0, 4).map((uni) => (
              <button
                key={uni.id}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
                onClick={() => {
                  setSelectedUniversity(uni.name);
                  handleSearch(new Event('submit') as any);
                }}
              >
                {uni.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;