import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/common/SplashScreen';
import Home from './pages/Home';
import HostelsPage from './pages/HostelsPage';
import HostelDetailPage from './pages/HostelDetailPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import BrokerLoginPage from './pages/BrokerLoginPage';
import OwnerLoginPage from './pages/OwnerLoginPage';
import OwnerSignupPage from './pages/OwnerSignupPage';
import HostelOwnerDashboardPage from './pages/HostelOwnerDashboardPage';
import HostelBrokerDashboardPage from './pages/HostelBrokerDashboardPage';
import Universities from './pages/Universities';
import { AuthProvider } from './contexts/AuthContext';
import { HostelProvider } from './contexts/HostelContext';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <AuthProvider>
      <HostelProvider>
        {showSplash ? (
          <SplashScreen onComplete={handleSplashComplete} />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hostels" element={<HostelsPage />} />
              <Route path="/hostels/:id" element={<HostelDetailPage />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/hostel-owner/login" element={<OwnerLoginPage />} />
              <Route path="/hostel-owner/signup" element={<OwnerSignupPage />} />
              <Route path="/hostel-owner" element={<HostelOwnerDashboardPage />} />
              <Route path="/hostel-broker/login" element={<BrokerLoginPage />} />
              <Route path="/hostel-broker" element={<HostelBrokerDashboardPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        )}
      </HostelProvider>
    </AuthProvider>
  );
}

export default App;
