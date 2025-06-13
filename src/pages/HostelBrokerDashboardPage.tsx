import { useEffect } from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import BrokerDashboard from '../components/features/dashboard/hostelBroker/BrokerDashboard';
import { useAuth } from '../contexts/AuthContext';

const HostelBrokerDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  // If not authenticated or not a broker, redirect to broker login
  if (!isAuthenticated || user?.role !== 'broker') {
    return <Navigate to="/hostel-broker/login" replace />;
  }

  // If authenticated and broker, render the dashboard
  return (
    <BrokerDashboard>
      <Outlet />
    </BrokerDashboard>
  );
};

export default HostelBrokerDashboardPage;
