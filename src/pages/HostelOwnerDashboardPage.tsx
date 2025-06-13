import { useEffect } from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import OwnerDashboard from '../components/features/dashboard/hostelOwner/OwnerDashboard';
import { useAuth } from '../contexts/AuthContext';

const HostelOwnerDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  // If not authenticated or not an owner, redirect to owner login
  if (!isAuthenticated || user?.role !== 'owner') {
    return <Navigate to="/hostel-owner/login" replace />;
  }

  // If authenticated and owner, render the dashboard
  return (
    <OwnerDashboard>
      <Outlet />
    </OwnerDashboard>
  );
};

export default HostelOwnerDashboardPage;
