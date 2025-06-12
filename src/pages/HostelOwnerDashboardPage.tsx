import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OwnerDashboard from '../components/features/dashboard/hostelOwner/OwnerDashboard';
import { useAuth } from '../contexts/AuthContext';

const HostelOwnerDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'owner') {
      navigate('/hostel-owner/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'owner') {
    return null; // or a loading spinner
  }

  return <OwnerDashboard />;
};

export default HostelOwnerDashboardPage;
