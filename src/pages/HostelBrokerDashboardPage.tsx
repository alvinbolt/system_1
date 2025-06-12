import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrokerDashboard from '../components/features/dashboard/hostelBroker/BrokerDashboard';
import { useAuth } from '../contexts/AuthContext';

const HostelBrokerDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'broker') {
      navigate('/hostel-broker/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'broker') {
    return null; // or a loading spinner
  }

  return <BrokerDashboard />;
};

export default HostelBrokerDashboardPage;
