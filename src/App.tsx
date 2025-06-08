import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import HostelOwnerPortal from './pages/HostelOwnerPortal';
import HostelOwnerDashboard from './pages/HostelOwnerDashboard';
import TestPortal from './pages/TestPortal';
import SplashScreen from './components/features/splash/SplashScreen';
import { useState, useEffect } from 'react';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
        <Router>
      <AuthProvider>
          <Routes>
          {/* Public Routes */}
            <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestPortal />} />
          
          {/* Hostel Owner Routes */}
          <Route path="/hostel-owner" element={<Navigate to="/hostel-owner/login" replace />} />
          <Route path="/hostel-owner/login" element={<HostelOwnerPortal />} />
          <Route path="/hostel-owner/signup" element={<HostelOwnerPortal />} />

          {/* Protected Hostel Owner Routes */}
          <Route
            path="/hostel-owner/dashboard"
            element={
              <ProtectedRoute requiredRole="hostel_owner">
                <HostelOwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hostel-owner/hostels"
            element={
              <ProtectedRoute requiredRole="hostel_owner">
                <HostelOwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hostel-owner/bookings"
            element={
              <ProtectedRoute requiredRole="hostel_owner">
                <HostelOwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hostel-owner/settings"
            element={
              <ProtectedRoute requiredRole="hostel_owner">
                <HostelOwnerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </AuthProvider>
        </Router>
  );
}

export default App;