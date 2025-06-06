import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Phone, Building, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../ui/Button';

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'owner' as 'owner' | 'broker'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.role) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
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
      await register(
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role
        }, 
        formData.password
      );
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: 'Failed to create account' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-50 text-primary-900 rounded-full mb-4">
          <UserPlus className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-display font-bold">Create Hostel Owner Account</h2>
        <p className="text-gray-600 mt-2">Join HostelConnect to list your properties</p>
      </div>
      
      {errors.submit && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
          {errors.submit}
        </div>
      )}
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-primary-900 text-white rounded-full">
            1
          </div>
          <div className="ml-2 text-sm font-medium">
            Personal Info
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
            Security
          </div>
        </div>
      </div>
      
      <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
        {step === 1 && (
          <>
            {/* Step 1: Personal Information */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="e.g. 256781234567"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 text-sm font-medium mb-2">
                I am a
              </label>
              <select
                id="role"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                value={formData.role}
                onChange={(e) => updateFormData('role', e.target.value as 'owner' | 'broker')}
              >
                <option value="owner">Hostel Owner</option>
                <option value="broker">Hostel Broker</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>
          </>
        )}
        
        {step === 2 && (
          <>
            {/* Step 2: Security */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </>
        )}
        
        <div className="flex justify-between">
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
            {step === 1 ? 'Next' : isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SignupForm;