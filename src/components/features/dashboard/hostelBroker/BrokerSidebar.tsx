import { NavLink } from 'react-router-dom';
import { Home, Users, Building, Settings } from 'lucide-react';

const BrokerSidebar = () => {
  const menuItems = [
    { name: 'Overview', to: '/dashboard/broker', icon: <Home className="w-5 h-5" /> },
    { name: 'Clients', to: '/dashboard/broker/clients', icon: <Users className="w-5 h-5" /> },
    { name: 'Partner Hostels', to: '/dashboard/broker/partners', icon: <Building className="w-5 h-5" /> },
    { name: 'Settings', to: '/dashboard/broker/settings', icon: <Settings className="w-5 h-5" /> },
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
