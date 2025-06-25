import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, Check, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, subscriptions } from '../../../../lib/supabase';
import { useAuth } from '../../../../contexts/AuthContext';
import type { Database } from '../../../../lib/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'] & {
  room: Database['public']['Tables']['rooms']['Row'];
  user: Database['public']['Tables']['profiles']['Row'];
};

const BookingManagement: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'owner') {
      loadBookings();
      setupRealtimeSubscriptions();
    }
  }, [user]);

  const loadBookings = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const data = await db.bookings.getByOwner(user.id);
      setBookings(data as Booking[]);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return;

    const subscription = subscriptions.subscribeToBookings(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        loadBookings(); // Reload bookings when new one is created
      } else if (payload.eventType === 'UPDATE') {
        setBookings(prev => prev.map(booking => 
          booking.id === payload.new.id 
            ? { ...booking, ...payload.new }
            : booking
        ));
      }
    });

    return () => subscription.unsubscribe();
  };

  const handleStatusChange = async (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await db.bookings.update(bookingId, { status: newStatus });
      
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      ));

      // If confirming a booking, update room status
      if (newStatus === 'confirmed') {
        const booking = bookings.find(b => b.id === bookingId);
        if (booking) {
          await db.rooms.update(booking.room_id, { status: 'booked' });
        }
      } else if (newStatus === 'cancelled') {
        // If cancelling, make room available again
        const booking = bookings.find(b => b.id === bookingId);
        if (booking) {
          await db.rooms.update(booking.room_id, { status: 'available' });
        }
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' ? true : booking.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const newBookingsCount = bookings.filter(b => b.status === 'pending').length;

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
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          Booking Management
          {newBookingsCount > 0 && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
              {newBookingsCount} New
            </span>
          )}
        </h2>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                view === 'list'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                view === 'calendar'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Calendar View
            </button>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {view === 'list' ? (
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookings found.</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`bg-white rounded-xl shadow-md p-6 ${booking.status === 'pending' ? 'ring-2 ring-red-200' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        Room {booking.room.room_number}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      UGX {booking.total_price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Booked on {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{booking.user.full_name}</p>
                      <p className="text-sm text-gray-500">{booking.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900">{booking.user.phone_number || 'Not provided'}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-600">
                      {Math.ceil((new Date(booking.check_out_date).getTime() - new Date(booking.check_in_date).getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'confirmed')}
                        className="flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'cancelled')}
                        className="flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="h-[600px] flex items-center justify-center text-gray-500">
            Calendar view will be implemented here
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Booking Details</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Room</p>
                    <p className="mt-1 text-gray-900">Room {selectedBooking.room.room_number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Check-in</p>
                    <p className="mt-1 text-gray-900">{new Date(selectedBooking.check_in_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Check-out</p>
                    <p className="mt-1 text-gray-900">{new Date(selectedBooking.check_out_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Amount</p>
                    <p className="mt-1 text-gray-900">UGX {selectedBooking.total_price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Student Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="mt-1 text-gray-900">{selectedBooking.user.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-gray-900">{selectedBooking.user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="mt-1 text-gray-900">{selectedBooking.user.phone_number || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Close
                  </button>
                  {selectedBooking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedBooking.id, 'confirmed');
                          setSelectedBooking(null);
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedBooking.id, 'cancelled');
                          setSelectedBooking(null);
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingManagement;