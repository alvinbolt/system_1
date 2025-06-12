import { NavLink } from 'react-router-dom';
import { Home, Building, Settings, Users } from 'lucide-react';

const OwnerSidebar = () => {
  const menuItems = [
    { name: 'Overview', to: '/dashboard/owner', icon: <Home className="w-5 h-5" /> },
    { name: 'Hostels', to: '/dashboard/owner/hostels', icon: <Building className="w-5 h-5" /> },
    { name: 'Clients', to: '/dashboard/owner/clients', icon: <Users className="w-5 h-5" /> },
    { name: 'Settings', to: '/dashboard/owner/settings', icon: <Settings className="w-5 h-5" /> },
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
