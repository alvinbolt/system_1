import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../../../lib/supabase';
import { useAuth } from '../../../../contexts/AuthContext';
import type { Database } from '../../../../lib/database.types';

type Hotel = Database['public']['Tables']['hotels']['Row'] & {
  rooms?: Database['public']['Tables']['rooms']['Row'][];
};

const HostelManagement: React.FC = () => {
  const { user } = useAuth();
  const [hostels, setHostels] = useState<Hotel[]>([]);
  const [isAddingHostel, setIsAddingHostel] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'owner') {
      loadHostels();
    }
  }, [user]);

  const loadHostels = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const data = await db.hotels.getByOwner(user.id);
      setHostels(data as Hotel[]);
    } catch (error) {
      console.error('Error loading hostels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveHostel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const hostelData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      address: formData.get('address') as string,
      contact_number: formData.get('contact_number') as string,
      amenities: (formData.get('amenities') as string).split(',').map(a => a.trim()).filter(Boolean),
    };

    try {
      if (selectedHostel) {
        // Update existing hostel
        const updatedHostel = await db.hotels.update(selectedHostel.id, hostelData);
        setHostels(prev => prev.map(h => h.id === selectedHostel.id ? updatedHostel : h));
      } else {
        // Create new hostel
        const newHostel = await db.hotels.create({
          ...hostelData,
          owner_id: user.id,
        });
        setHostels(prev => [...prev, newHostel]);
      }
      
      setIsAddingHostel(false);
      setSelectedHostel(null);
    } catch (error) {
      console.error('Error saving hostel:', error);
    }
  };

  const handleDeleteHostel = async (hostelId: string) => {
    if (!confirm('Are you sure you want to delete this hostel? This action cannot be undone.')) {
      return;
    }

    try {
      await db.hotels.delete(hostelId);
      setHostels(prev => prev.filter(h => h.id !== hostelId));
    } catch (error) {
      console.error('Error deleting hostel:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Hostel Management</h2>
        <button
          onClick={() => { setIsAddingHostel(true); setSelectedHostel(null); }}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Hostel
        </button>
      </div>

      {hostels.length === 0 ? (
        <div className="text-center py-8">
          <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels yet</h3>
          <p className="text-gray-500 mb-4">Create your first hostel to start managing bookings.</p>
          <button
            onClick={() => setIsAddingHostel(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Your First Hostel
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map(hostel => (
            <motion.div
              key={hostel.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-4 flex items-center gap-3 border-b">
                <Building className="w-8 h-8 text-primary-500" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{hostel.name}</h3>
                  <p className="text-sm text-gray-500">{hostel.address}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => { setSelectedHostel(hostel); setIsAddingHostel(true); }} 
                    className="p-1 text-gray-600 hover:text-primary-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteHostel(hostel.id)} 
                    className="p-1 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-4 text-sm">{hostel.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Rooms: <span className="font-semibold text-gray-900">{hostel.rooms?.length || 0}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Contact: <span className="font-semibold text-gray-900">{hostel.contact_number || 'Not set'}</span>
                  </span>
                </div>
                {hostel.amenities && hostel.amenities.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {hostel.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {hostel.amenities.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          +{hostel.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Hostel Modal */}
      <AnimatePresence>
        {isAddingHostel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => { setIsAddingHostel(false); setSelectedHostel(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">{selectedHostel ? 'Edit Hostel' : 'Add New Hostel'}</h3>
              
              <form onSubmit={handleSaveHostel} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hostel Name</label>
                  <input 
                    name="name" 
                    type="text" 
                    defaultValue={selectedHostel?.name} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input 
                    name="address" 
                    type="text" 
                    defaultValue={selectedHostel?.address || ''} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                  <input 
                    name="contact_number" 
                    type="tel" 
                    defaultValue={selectedHostel?.contact_number || ''} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    name="description" 
                    rows={3} 
                    defaultValue={selectedHostel?.description || ''} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amenities (comma-separated)</label>
                  <input 
                    name="amenities" 
                    type="text" 
                    defaultValue={selectedHostel?.amenities?.join(', ') || ''} 
                    placeholder="WiFi, Security, Laundry, etc."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" 
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => { setIsAddingHostel(false); setSelectedHostel(null); }} 
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    {selectedHostel ? 'Save Changes' : 'Add Hostel'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HostelManagement;