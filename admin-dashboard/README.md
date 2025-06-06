# Hostel Finder Admin Dashboard

This is the admin dashboard for the Hostel Finder application. It provides a secure interface for hostel owners to manage their listings.

## Features

- Secure authentication system
- Hostel management
- Room type management
- Image upload for rooms
- Booking management
- Analytics and statistics

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start the development server:
```bash
npm run dev
```

## Access

The admin dashboard is accessible at:
- Development: http://localhost:5173
- Production: https://admin.hostelfinder.com (replace with your actual domain)

## Security

- The admin dashboard is protected by authentication
- Only authorized hostel owners can access the dashboard
- All sensitive operations require authentication
- API endpoints are secured with proper authorization checks

## Development

- Built with React + TypeScript
- Uses Vite for fast development
- Styled with Tailwind CSS
- Uses Supabase for backend services 