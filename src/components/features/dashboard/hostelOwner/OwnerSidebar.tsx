import { NavLink } from 'react-router-dom';
import { Home, Building, Settings, Users, Bed, Star, MessageSquare, BarChart } from 'lucide-react';

const OwnerSidebar = () => {
  const menuItems = [
    { name: 'Overview', to: '/hostel-owner', icon: <Home className="w-5 h-5" /> },
    { name: 'Hostels', to: '/hostel-owner/hostels', icon: <Building className="w-5 h-5" /> },
    { name: 'Rooms', to: '/hostel-owner/rooms', icon: <Bed className="w-5 h-5" /> },
    { name: 'Bookings', to: '/hostel-owner/bookings', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Reviews', to: '/hostel-owner/reviews', icon: <Star className="w-5 h-5" /> },
    { name: 'Messages', to: '/hostel-owner/messages', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Analytics', to: '/hostel-owner/analytics', icon: <BarChart className="w-5 h-5" /> },
    { name: 'Settings', to: '/hostel-owner/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col p-4 space-y-2">
        {menuItems.map(({ name, to, icon }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-100 ${
                isActive ? 'bg-primary-200 text-primary-900 font-semibold' : 'text-gray-700'
              }`
            }
          >
            <span className="mr-3">{icon}</span>
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default OwnerSidebar;
