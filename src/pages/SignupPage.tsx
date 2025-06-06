import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SignupForm from '../components/features/auth/SignupForm';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary-900">Hostel Owner Registration</h1>
          <p className="text-gray-600 mt-2">Create an account to list your hostel</p>
        </div>
        <SignupForm />
      </div>
    </Layout>
  );
};

export default SignupPage;