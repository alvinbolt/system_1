import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to get current user ID
export const getCurrentUserId = () => {
  return supabase.auth.getUser().then(({ data: { user } }) => user?.id);
};

// Database service functions
export const db = {
  // Profile operations
  profiles: {
    async getById(id: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async create(profile: Database['public']['Tables']['profiles']['Insert']) {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async update(id: string, profile: Database['public']['Tables']['profiles']['Update']) {
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async getByRole(role: 'user' | 'owner' | 'admin') {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', role);
      
      if (error) throw error;
      return data;
    }
  },
  
  // Hotel operations
  hotels: {
    async getAll() {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          owner:profiles!hotels_owner_id_fkey(*)
        `);
      
      if (error) throw error;
      return data;
    },
    
    async getById(id: string) {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          owner:profiles!hotels_owner_id_fkey(*),
          rooms(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async getByOwner(ownerId: string) {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          rooms(*)
        `)
        .eq('owner_id', ownerId);
      
      if (error) throw error;
      return data;
    },
    
    async create(hotel: Database['public']['Tables']['hotels']['Insert']) {
      const { data, error } = await supabase
        .from('hotels')
        .insert(hotel)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(id: string, hotel: Database['public']['Tables']['hotels']['Update']) {
      const { data, error } = await supabase
        .from('hotels')
        .update(hotel)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },
  
  // Room operations
  rooms: {
    async getByHotel(hotelId: string) {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('hotel_id', hotelId);
      
      if (error) throw error;
      return data;
    },
    
    async getById(id: string) {
      const { data, error } = await supabase
        .from('rooms')
        .select(`
          *,
          hotel:hotels(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },

    async create(room: Database['public']['Tables']['rooms']['Insert']) {
      const { data, error } = await supabase
        .from('rooms')
        .insert(room)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async update(id: string, room: Database['public']['Tables']['rooms']['Update']) {
      const { data, error } = await supabase
        .from('rooms')
        .update(room)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },
  
  // Booking operations
  bookings: {
    async create(booking: Database['public']['Tables']['bookings']['Insert']) {
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select(`
          *,
          room:rooms(*),
          user:profiles(*)
        `)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async getByUser(userId: string) {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          room:rooms(*),
          user:profiles(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    
    async getByOwner(ownerId: string) {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          room:rooms!inner(
            *,
            hotel:hotels!inner(*)
          ),
          user:profiles(*)
        `)
        .eq('room.hotel.owner_id', ownerId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async getAll() {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          room:rooms(
            *,
            hotel:hotels(*)
          ),
          user:profiles(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async update(id: string, booking: Database['public']['Tables']['bookings']['Update']) {
      const { data, error } = await supabase
        .from('bookings')
        .update(booking)
        .eq('id', id)
        .select(`
          *,
          room:rooms(*),
          user:profiles(*)
        `)
        .single();
      
      if (error) throw error;
      return data;
    }
  },
  
  // Review operations
  reviews: {
    async getByHotel(hotelId: string) {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          booking:bookings!inner(
            *,
            room:rooms!inner(*)
          ),
          user:profiles(*)
        `)
        .eq('booking.room.hotel_id', hotelId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    
    async create(review: Database['public']['Tables']['reviews']['Insert']) {
      const { data, error } = await supabase
        .from('reviews')
        .insert(review)
        .select(`
          *,
          booking:bookings(*),
          user:profiles(*)
        `)
        .single();
      
      if (error) throw error;
      return data;
    }
  },
  
  // Message operations
  messages: {
    async getConversation(userId: string, otherId: string) {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(*),
          receiver:profiles!messages_receiver_id_fkey(*)
        `)
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${userId})`)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },

    async getConversations(userId: string) {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(*),
          receiver:profiles!messages_receiver_id_fkey(*)
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    
    async send(message: Database['public']['Tables']['messages']['Insert']) {
      const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(*),
          receiver:profiles!messages_receiver_id_fkey(*)
        `)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async markAsRead(messageIds: string[]) {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .in('id', messageIds);
      
      if (error) throw error;
    }
  },

  // Notification operations
  notifications: {
    async getByBroker(brokerId: string) {
      const { data, error } = await supabase
        .from('booking_notifications')
        .select(`
          *,
          booking:bookings(
            *,
            room:rooms(
              *,
              hotel:hotels(*)
            ),
            user:profiles(*)
          )
        `)
        .eq('broker_id', brokerId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async markAsRead(notificationId: string) {
      const { error } = await supabase
        .from('booking_notifications')
        .update({ is_read: true })
        .eq('id', notificationId);
      
      if (error) throw error;
    },

    async create(notification: Database['public']['Tables']['booking_notifications']['Insert']) {
      const { data, error } = await supabase
        .from('booking_notifications')
        .insert(notification)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
};

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to booking changes for brokers
  subscribeToBookings(brokerId: string, callback: (payload: any) => void) {
    return supabase
      .channel('booking-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        callback
      )
      .subscribe();
  },

  // Subscribe to messages for real-time chat
  subscribeToMessages(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('message-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  },

  // Subscribe to notifications for brokers
  subscribeToNotifications(brokerId: string, callback: (payload: any) => void) {
    return supabase
      .channel('notification-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'booking_notifications',
          filter: `broker_id=eq.${brokerId}`
        },
        callback
      )
      .subscribe();
  }
};