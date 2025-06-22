import { NavLink } from 'react-router-dom';
import { Home, Users, Building, Settings, FileText, MessageSquare, Shield, BarChart, LogOut } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const BrokerSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
    <div className="flex flex-col h-full bg-white">
      {/* Logo/Brand Section */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-center">
        <img src="/images/logo2.png" alt="HostelConnect Logo" className="h-12" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
        {menuItems.map(({ name, to, icon }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-secondary-100 text-secondary-900 font-semibold shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <span className="mr-3">{icon}</span>
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default BrokerSidebar;
