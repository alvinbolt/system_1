import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  photoURL?: string;
  provider?: 'google' | 'email';
  hostelName?: string;
  university?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Here you would typically make an API call to your backend
      const userData: User = {
        id: '1',
        email,
        name: 'Hostel Owner',
        role: 'hostel_owner',
        provider: 'email',
        hostelName: 'Sample Hostel Name',
        university: 'Makerere University'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/hostel-owner/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      // Here you would implement Google OAuth
      // For now, we'll simulate a successful Google login
      const userData: User = {
        id: Date.now().toString(),
        email: 'user@gmail.com',
        name: 'Google User',
        role: 'hostel_owner',
        photoURL: 'https://ui-avatars.com/api/?name=Google+User',
        provider: 'google',
        hostelName: 'Google Hostel',
        university: 'Kyambogo University'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/hostel-owner/dashboard');
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, userData: Partial<User>) => {
    try {
      setLoading(true);
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: userData.name || '',
        role: 'hostel_owner',
        phone: userData.phone,
        provider: 'email',
        hostelName: userData.hostelName || '',
        university: userData.university || ''
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/hostel-owner/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setUser(null);
      localStorage.removeItem('user');
      navigate('/hostel-owner/login');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      loginWithGoogle, 
      logout,
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};