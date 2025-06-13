import { NavLink } from 'react-router-dom';
import { Home, Users, Building, Settings, FileText, MessageSquare, Shield, BarChart } from 'lucide-react';

const BrokerSidebar = () => {
  const menuItems = [
    { name: 'Overview', to: '/hostel-broker', icon: <Home className="w-5 h-5" /> },
    { name: 'Hostel Owners', to: '/hostel-broker/owners', icon: <Users className="w-5 h-5" /> },
    { name: 'Hostels', to: '/hostel-broker/hostels', icon: <Building className="w-5 h-5" /> },
    { name: 'Bookings', to: '/hostel-broker/bookings', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Moderation', to: '/hostel-broker/moderation', icon: <Shield className="w-5 h-5" /> },
    { name: 'Reports', to: '/hostel-broker/reports', icon: <FileText className="w-5 h-5" /> },
    { name: 'Messages', to: '/hostel-broker/messages', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Analytics', to: '/hostel-broker/analytics', icon: <BarChart className="w-5 h-5" /> },
    { name: 'Settings', to: '/hostel-broker/settings', icon: <Settings className="w-5 h-5" /> },
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

export default BrokerSidebar;
