import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../../../lib/supabase';
import { useAuth } from '../../../../contexts/AuthContext';
import type { Database } from '../../../../lib/database.types';

type Room = Database['public']['Tables']['rooms']['Row'];
type Hotel = Database['public']['Tables']['hotels']['Row'];

const RoomManagement: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'owner') {
      loadHotels();
    }
  }, [user]);

  useEffect(() => {
    if (selectedHotelId) {
      loadRooms();
    }
  }, [selectedHotelId]);

  const loadHotels = async () => {
    if (!user) return;
    
    try {
      const data = await db.hotels.getByOwner(user.id);
      setHotels(data);
      if (data.length > 0 && !selectedHotelId) {
        setSelectedHotelId(data[0].id);
      }
    } catch (error) {
      console.error('Error loading hotels:', error);
    }
  };

  const loadRooms = async () => {
    if (!selectedHotelId) return;
    
    try {
      setIsLoading(true);
      const data = await db.rooms.getByHotel(selectedHotelId);
      setRooms(data);
    } catch (error) {
      console.error('Error loading rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedHotelId) return;

    const formData = new FormData(e.currentTarget);
    const roomData = {
      hotel_id: selectedHotelId,
      room_number: formData.get('room_number') as string,
      type: formData.get('type') as string,
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string,
      floor_number: parseInt(formData.get('floor_number') as string) || null,
      room_category: formData.get('room_category') as string || null,
      amenities: (formData.get('amenities') as string).split(',').map(a => a.trim()).filter(Boolean),
    };

    try {
      if (selectedRoom) {
        // Update existing room
        const updatedRoom = await db.rooms.update(selectedRoom.id, roomData);
        setRooms(prev => prev.map(r => r.id === selectedRoom.id ? updatedRoom : r));
      } else {
        // Create new room
        const newRoom = await db.rooms.create(roomData);
        setRooms(prev => [...prev, newRoom]);
      }
      
      setIsAddingRoom(false);
      setSelectedRoom(null);
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
      return;
    }

    try {
      await db.rooms.delete(roomId);
      setRooms(prev => prev.filter(r => r.id !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  if (hotels.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels found</h3>
          <p className="text-gray-500">You need to create a hostel first before adding rooms.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Room Management</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedHotelId}
            onChange={e => setSelectedHotelId(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {hotels.map(hotel => (
              <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
            ))}
          </select>
          <button
            onClick={() => { setIsAddingRoom(true); setSelectedRoom(null); }}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Room
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <motion.div
              key={room.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48 bg-gray-200">
                {room.images && room.images.length > 0 ? (
                  <img
                    src={room.images[0]}
                    alt={`Room ${room.room_number}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    room.status === 'available' ? 'bg-green-100 text-green-800' :
                    room.status === 'booked' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Room {room.room_number}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => { setSelectedRoom(room); setIsAddingRoom(true); }}
                      className="p-1 text-gray-600 hover:text-primary-600"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="p-1 text-gray-600 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Type: <span className="font-medium text-gray-900">{room.type}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: <span className="font-medium text-gray-900">UGX {room.price.toLocaleString()}</span>
                  </p>
                  {room.floor_number && (
                    <p className="text-sm text-gray-600">
                      Floor: <span className="font-medium text-gray-900">{room.floor_number}</span>
                    </p>
                  )}
                  {room.room_category && (
                    <p className="text-sm text-gray-600">
                      Category: <span className="font-medium text-gray-900">{room.room_category}</span>
                    </p>
                  )}
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Room Modal */}
      <AnimatePresence>
        {isAddingRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => { setIsAddingRoom(false); setSelectedRoom(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">
                {selectedRoom ? 'Edit Room' : 'Add New Room'}
              </h3>
              
              <form onSubmit={handleSaveRoom} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Room Number</label>
                    <input
                      name="room_number"
                      type="text"
                      defaultValue={selectedRoom?.room_number}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Room Type</label>
                    <select
                      name="type"
                      defaultValue={selectedRoom?.type}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Triple">Triple</option>
                      <option value="Single Deluxe">Single Deluxe</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price (UGX)</label>
                    <input
                      name="price"
                      type="number"
                      defaultValue={selectedRoom?.price}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Floor Number</label>
                    <input
                      name="floor_number"
                      type="number"
                      defaultValue={selectedRoom?.floor_number || ''}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Category</label>
                  <input
                    name="room_category"
                    type="text"
                    defaultValue={selectedRoom?.room_category || ''}
                    placeholder="e.g., Standard, Premium, Deluxe"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Amenities (comma-separated)</label>
                  <input
                    name="amenities"
                    type="text"
                    defaultValue={selectedRoom?.amenities?.join(', ') || ''}
                    placeholder="Bed, Desk, Wardrobe, Private Bathroom"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={selectedRoom?.description || ''}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => { setIsAddingRoom(false); setSelectedRoom(null); }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    {selectedRoom ? 'Save Changes' : 'Add Room'}
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

export default RoomManagement;