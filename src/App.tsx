import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/features/splash/SplashScreen';
import Home from './pages/Home';
import HostelsPage from './pages/HostelsPage';
import HostelDetailPage from './pages/HostelDetailPage';
import { HostelProvider } from './contexts/HostelContext';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Check if splash screen has been shown before
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      // Set flag in session storage
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <HostelProvider>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hostels" element={<HostelsPage />} />
            <Route path="/hostels/:id" element={<HostelDetailPage />} />
          </Routes>
        </Router>
      )}
    </HostelProvider>
  );
}

export default App;