import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import AddHostelForm from '../components/features/hostel/AddHostelForm';

const AddHostelPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== 'owner') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Add New Hostel</h1>
        <AddHostelForm />
      </div>
    </Layout>
  );
};

export default AddHostelPage; 