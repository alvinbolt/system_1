import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { currentUser as mockUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginBroker: (password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);
  const isAuthenticated = !!user;

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    if (email && password) {
      setUser(mockUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Mock broker login function (password only)
  const loginBroker = async (password: string) => {
    // In a real app, this would call an API and verify password
    const brokerPassword = 'broker123'; // Example fixed password
    if (password === brokerPassword) {
      setUser({ ...mockUser, role: 'broker' });
    } else {
      throw new Error('Invalid password');
    }
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
  };

  // Mock register function
  const register = async (userData: Partial<User>, password: string) => {
    // In a real app, this would call an API
    if (userData.email && password) {
      setUser({ ...mockUser, ...userData });
    } else {
      throw new Error('Invalid user data');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, loginBroker, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};