/*
  # Enable real-time functionality

  1. Changes
    - Enable real-time for all tables
    - Ensure tables are properly configured for real-time subscriptions

  2. Security
    - Real-time subscriptions will respect existing RLS policies
*/

-- Enable real-time for all tables (only if they aren't already added)
do $$
begin
  -- Add tables to real-time publication if they exist and aren't already added
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'profiles') then
    begin
      alter publication supabase_realtime add table public.profiles;
    exception when duplicate_object then
      -- Table already added to publication
      null;
    end;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'hotels') then
    begin
      alter publication supabase_realtime add table public.hotels;
    exception when duplicate_object then
      null;
    end;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'rooms') then
    begin
      alter publication supabase_realtime add table public.rooms;
    exception when duplicate_object then
      null;
    end;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'bookings') then
    begin
      alter publication supabase_realtime add table public.bookings;
    exception when duplicate_object then
      null;
    end;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'reviews') then
    begin
      alter publication supabase_realtime add table public.reviews;
    exception when duplicate_object then
      null;
    end;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'messages') then
    begin
      alter publication supabase_realtime add table public.messages;
    exception when duplicate_object then
      null;
    end;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'booking_notifications') then
    begin
      alter publication supabase_realtime add table public.booking_notifications;
    exception when duplicate_object then
      null;
    end;
  end if;
end $$;

-- Ensure RLS is enabled for real-time functionality
alter table if exists public.profiles enable row level security;
alter table if exists public.hotels enable row level security;
alter table if exists public.rooms enable row level security;
alter table if exists public.bookings enable row level security;
alter table if exists public.reviews enable row level security;
alter table if exists public.messages enable row level security;
alter table if exists public.booking_notifications enable row level security;