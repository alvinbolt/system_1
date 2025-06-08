import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Image, Plus, X, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { universities } from '../../../data/mockData';
import { useAuth } from '../../../contexts/AuthContext';

type RoomType = {
  type: 'single' | 'double' | 'triple';
  price: string;
  description: string;
  images: File[];
};

const AddHostelForm = () => {
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();
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

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // After successful login, proceed with the form
    } catch (error) {
      setErrors({ submit: 'Failed to login with Google' });
    }
  };

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

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice)) return '';
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  const handlePriceChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    handleRoomTypeChange(index, 'price', numericValue);
  };

  return (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!user ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-50 text-primary-900 rounded-full mb-4">
            <User className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-4">Sign in to Add Your Hostel</h2>
          <p className="text-gray-600 mb-6">Please sign in with your Google account to continue</p>
          <button
            onClick={handleGoogleLogin}
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-50 text-primary-900 rounded-full">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold">Add Your Hostel</h2>
                <p className="text-gray-600">Create a listing for your hostel</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt={user.displayName || 'User'}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{user.displayName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
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
                    <div key={index} className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Room Type {index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => handleRemoveRoomType(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Room Type
                          </label>
                          <select
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
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
                            Price per Month (UGX)
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              className="w-full p-3 pl-16 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                              value={formatPrice(room.price)}
                              onChange={(e) => handlePriceChange(index, e.target.value)}
                              placeholder="0"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">UGX</span>
                            </div>
                          </div>
                          {errors[`room${index}Price`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`room${index}Price`]}</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Description
                          </label>
                          <textarea
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                            rows={3}
                            value={room.description}
                            onChange={(e) => handleRoomTypeChange(index, 'description', e.target.value)}
                            placeholder="Describe the room features and amenities"
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
                              <div key={imageIndex} className="relative group">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Room ${index + 1} - Image ${imageIndex + 1}`}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index, imageIndex)}
                                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            
                            <button
                              type="button"
                              onClick={() => document.getElementById(`room-${index}-images`)?.click()}
                              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-primary-500 hover:text-primary-500"
                            >
                              <Image className="w-6 h-6 mr-2" />
                              Add Image
                            </button>
                          </div>
                          <input
                            id={`room-${index}-images`}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleImageUpload(index, e.target.files!)}
                          />
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
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-500 hover:text-primary-500"
                  >
                    <Plus className="w-5 h-5 mx-auto mb-1" />
                    Add Another Room Type
                  </button>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                  >
                    Create Hostel Listing
                  </Button>
                </div>
              </>
            )}
          </form>
        </>
      )}
    </motion.div>
  );
};

export default AddHostelForm; 