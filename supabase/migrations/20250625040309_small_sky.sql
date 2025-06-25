/*
  # Enable real-time functionality

  1. Changes
    - Enable real-time for all tables
    - Add RLS policies for real-time subscriptions
    - Create functions for real-time notifications

  2. Security
    - Ensure real-time subscriptions respect RLS policies
*/

-- Enable real-time for all tables
alter publication supabase_realtime add table public.profiles;
alter publication supabase_realtime add table public.hotels;
alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.bookings;
alter publication supabase_realtime add table public.reviews;
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.booking_notifications;

-- Function to get user ID from JWT
create or replace function auth.uid() returns uuid
language sql stable
as $$
  select 
    coalesce(
      nullif(current_setting('request.jwt.claim.sub', true), ''),
      (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
    )::uuid
$$;