import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Image, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { universities } from '../../../data/mockData';

type RoomType = {
  type: 'single' | 'double' | 'triple';
  price: string;
  description: string;
  images: File[];
};

const AddHostelForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    address: '',
    description: '',
    contactPhone: '',
    contactEmail: '',
    amenities: [] as string[],
    roomTypes: [] as RoomType[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const amenities = [
    'WiFi',
    'Security',
    'Laundry',
    'Kitchen',
    'Parking',
    'Study Room',
    'Gym',
    'Swimming Pool',
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleAddRoomType = () => {
    setFormData(prev => ({
      ...prev,
      roomTypes: [...prev.roomTypes, {
        type: 'single',
        price: '',
        description: '',
        images: []
      }]
    }));
  };

  const handleRemoveRoomType = (index: number) => {
    setFormData(prev => ({
      ...prev,
      roomTypes: prev.roomTypes.filter((_, i) => i !== index)
    }));
  };

  const handleRoomTypeChange = (index: number, field: keyof RoomType, value: any) => {
    setFormData(prev => ({
      ...prev,
      roomTypes: prev.roomTypes.map((room, i) => 
        i === index ? { ...room, [field]: value } : room
      )
    }));
  };

  const handleImageUpload = (index: number, files: FileList) => {
    const newImages = Array.from(files);
    setFormData(prev => ({
      ...prev,
      roomTypes: prev.roomTypes.map((room, i) => 
        i === index ? { ...room, images: [...room.images, ...newImages] } : room
      )
    }));
  };

  const handleRemoveImage = (roomIndex: number, imageIndex: number) => {
    setFormData(prev => ({
      ...prev,
      roomTypes: prev.roomTypes.map((room, i) => 
        i === roomIndex ? {
          ...room,
          images: room.images.filter((_, j) => j !== imageIndex)
        } : room
      )
    }));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Hostel name is required';
    if (!formData.university) newErrors.university = 'University is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.roomTypes.length === 0) {
      newErrors.roomTypes = 'At least one room type is required';
    } else {
      formData.roomTypes.forEach((room, index) => {
        if (!room.price) newErrors[`room${index}Price`] = 'Price is required';
        if (!room.description) newErrors[`room${index}Description`] = 'Description is required';
        if (room.images.length === 0) newErrors[`room${index}Images`] = 'At least one image is required';
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement hostel creation logic
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: 'Failed to create hostel listing' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-50 text-primary-900 rounded-full mb-4">
          <Building className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-display font-bold">Add Your Hostel</h2>
        <p className="text-gray-600 mt-2">Create a listing for your hostel</p>
      </div>
      
      {errors.submit && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
          {errors.submit}
        </div>
      )}
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 ${step === 1 ? 'bg-primary-900 text-white' : 'bg-gray-200 text-gray-500'} rounded-full`}>
            1
          </div>
          <div className={`ml-2 text-sm font-medium ${step === 1 ? 'text-gray-900' : 'text-gray-400'}`}>
            Basic Info
          </div>
        </div>
        <div className="w-16 h-1 bg-gray-200">
          <div className={`h-full ${step > 1 ? 'bg-primary-900' : 'bg-gray-200'}`}></div>
        </div>
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 ${step > 1 ? 'bg-primary-900 text-white' : 'bg-gray-200 text-gray-500'} rounded-full`}>
            2
          </div>
          <div className={`ml-2 text-sm font-medium ${step > 1 ? 'text-gray-900' : 'text-gray-400'}`}>
            Room Types
          </div>
        </div>
      </div>
      
      <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
        {step === 1 ? (
          <>
            {/* Step 1: Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                  Hostel Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="Enter hostel name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="university" className="block text-gray-700 text-sm font-medium mb-2">
                  Nearby University
                </label>
                <select
                  id="university"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  value={formData.university}
                  onChange={(e) => updateFormData('university', e.target.value)}
                >
                  <option value="">Select university</option>
                  {universities.map((uni) => (
                    <option key={uni.id} value={uni.name}>
                      {uni.name}
                    </option>
                  ))}
                </select>
                {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="Enter hostel address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="Describe your hostel"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-gray-700 text-sm font-medium mb-2">
                  Contact Phone
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="Enter contact phone"
                  value={formData.contactPhone}
                  onChange={(e) => updateFormData('contactPhone', e.target.value)}
                />
                {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-gray-700 text-sm font-medium mb-2">
                  Contact Email
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="Enter contact email"
                  value={formData.contactEmail}
                  onChange={(e) => updateFormData('contactEmail', e.target.value)}
                />
                {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {amenities.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded text-primary-900 focus:ring-primary-900"
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: Room Types */}
            <div className="space-y-6">
              {formData.roomTypes.map((room, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Room Type {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => handleRemoveRoomType(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Room Type
                      </label>
                      <select
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                        value={room.type}
                        onChange={(e) => handleRoomTypeChange(index, 'type', e.target.value)}
                      >
                        <option value="single">Single Room</option>
                        <option value="double">Double Room</option>
                        <option value="triple">Triple Room</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Price per Month
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                        placeholder="Enter price"
                        value={room.price}
                        onChange={(e) => handleRoomTypeChange(index, 'price', e.target.value)}
                      />
                      {errors[`room${index}Price`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`room${index}Price`]}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                        placeholder="Describe the room type"
                        value={room.description}
                        onChange={(e) => handleRoomTypeChange(index, 'description', e.target.value)}
                      />
                      {errors[`room${index}Description`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`room${index}Description`]}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Room Images
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {room.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Room ${index + 1} image ${imageIndex + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index, imageIndex)}
                              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <label className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-900">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => e.target.files && handleImageUpload(index, e.target.files)}
                          />
                          <div className="text-center">
                            <Image className="h-8 w-8 text-gray-400 mx-auto" />
                            <span className="text-sm text-gray-600">Add Images</span>
                          </div>
                        </label>
                      </div>
                      {errors[`room${index}Images`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`room${index}Images`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={handleAddRoomType}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-900 text-gray-600 hover:text-primary-900"
              >
                <Plus className="h-6 w-6 mx-auto mb-2" />
                Add Another Room Type
              </button>
              
              {errors.roomTypes && (
                <p className="text-red-500 text-sm text-center">{errors.roomTypes}</p>
              )}
            </div>
          </>
        )}
        
        <div className="flex justify-between mt-8">
          {step === 2 && (
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevStep}
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            fullWidth={step === 1}
            disabled={isLoading}
          >
            {step === 1 ? 'Next' : isLoading ? 'Creating...' : 'Create Hostel'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddHostelForm; 