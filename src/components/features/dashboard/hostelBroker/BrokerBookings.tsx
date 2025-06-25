import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Search, Eye, Bell, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { db, subscriptions } from '../../../../lib/supabase';
import { useAuth } from '../../../../contexts/AuthContext';
import type { Database } from '../../../../lib/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'] & {
  room: Database['public']['Tables']['rooms']['Row'] & {
    hotel: Database['public']['Tables']['hotels']['Row'];
  };
  user: Database['public']['Tables']['profiles']['Row'];
};

type Notification = Database['public']['Tables']['booking_notifications']['Row'] & {
  booking: Booking;
};

const BrokerBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const statuses = ['All', 'pending', 'confirmed', 'cancelled'];

  useEffect(() => {
    if (user?.role === 'admin') {
      loadAllBookings();
      loadNotifications();
      setupRealtimeSubscriptions();
    }
  }, [user]);

  const loadAllBookings = async () => {
    try {
      setIsLoading(true);
      const data = await db.bookings.getAll();
      setBookings(data as Booking[]);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNotifications = async () => {
    if (!user) return;
    
    try {
      const data = await db.notifications.getByBroker(user.id);
      setNotifications(data as Notification[]);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return;

    // Subscribe to new bookings
    const bookingSubscription = subscriptions.subscribeToBookings(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        loadAllBookings(); // Reload all bookings when new one is created
      } else if (payload.eventType === 'UPDATE') {
        setBookings(prev => prev.map(booking => 
          booking.id === payload.new.id 
            ? { ...booking, ...payload.new }
            : booking
        ));
      }
    });

    // Subscribe to notifications
    const notificationSubscription = subscriptions.subscribeToNotifications(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        loadNotifications(); // Reload notifications
      }
    });

    return () => {
      bookingSubscription.unsubscribe();
      notificationSubscription.unsubscribe();
    };
  };

  const handleStatusChange = async (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await db.bookings.update(bookingId, { status: newStatus });
      
      // Update local state
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
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await db.notifications.markAsRead(notificationId);
      setNotifications(prev => prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, is_read: true }
          : notif
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const filteredBookings = bookings.filter(booking =>
    (statusFilter === 'All' || booking.status === statusFilter) &&
    (booking.user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      booking.room.hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.room.room_number.toLowerCase().includes(search.toLowerCase()))
  );

  const unreadNotifications = notifications.filter(n => !n.is_read);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl">
        {/* Header with Notifications */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">All Bookings</h2>
          
          {/* Notifications Bell */}
          <div className="relative">
            <button 
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSelectedBooking(null)} // Toggle notifications panel
            >
              <Bell className="h-6 w-6" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Notifications Panel */}
        {unreadNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          >
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              New Booking Notifications ({unreadNotifications.length})
            </h3>
            <div className="space-y-2">
              {unreadNotifications.slice(0, 3).map(notification => (
                <div 
                  key={notification.id}
                  className="flex justify-between items-center bg-white p-3 rounded border"
                >
                  <div>
                    <p className="text-sm font-medium">
                      New booking from {notification.booking.user.full_name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {notification.booking.room.hotel.name} - Room {notification.booking.room.room_number}
                    </p>
                  </div>
                  <button
                    onClick={() => markNotificationAsRead(notification.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Mark Read
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search student, hostel, room..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
            />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map(booking => (
                <motion.tr 
                  key={booking.id} 
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{booking.user.full_name}</div>
                      <div className="text-sm text-gray-500">{booking.user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.room.hotel.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.room.room_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.check_in_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">UGX {booking.total_price.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          title="Confirm booking"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleStatusChange(booking.id, 'cancelled')}
                          title="Cancel booking"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => setSelectedBooking(booking)}
                      title="View details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button 
                      className="text-purple-600 hover:text-purple-900"
                      title="Send message"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Student</label>
                  <p className="mt-1 text-gray-900">{selectedBooking.user.full_name}</p>
                  <p className="text-sm text-gray-500">{selectedBooking.user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Phone</label>
                  <p className="mt-1 text-gray-900">{selectedBooking.user.phone_number || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Hostel</label>
                  <p className="mt-1 text-gray-900">{selectedBooking.room.hotel.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Room</label>
                  <p className="mt-1 text-gray-900">{selectedBooking.room.room_number} ({selectedBooking.room.type})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Check-in Date</label>
                  <p className="mt-1 text-gray-900">{new Date(selectedBooking.check_in_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Check-out Date</label>
                  <p className="mt-1 text-gray-900">{new Date(selectedBooking.check_out_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Total Amount</label>
                  <p className="mt-1 text-gray-900 font-semibold">UGX {selectedBooking.total_price.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
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
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrokerBookings;