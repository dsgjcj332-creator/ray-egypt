
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'merchant' | 'customer' | 'admin';
  avatar?: string;
  businessName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role?: 'merchant' | 'customer') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('ray_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data', e);
        localStorage.removeItem('ray_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: 'merchant' | 'customer' = 'merchant') => {
    setIsLoading(true);
    // Simulate API Delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: 'u-' + Date.now(),
      name: role === 'merchant' ? 'أحمد محمد' : 'عميل راي',
      email: email,
      role: role,
      avatar: role === 'merchant' ? 'AM' : 'RC',
      businessName: role === 'merchant' ? 'مطعم النور' : undefined
    };

    setUser(mockUser);
    localStorage.setItem('ray_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ray_user');
    // Optional: Redirect logic can be handled by consumers or a router wrapper
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
