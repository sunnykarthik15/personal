import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; full_name: string; phone?: string }) => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('vk_auth_token'));
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('vk_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (token && !user) {
      api.getMe()
        .then((userData) => {
          setUser(userData);
          localStorage.setItem('vk_auth_user', JSON.stringify(userData));
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);
    setToken(res.access_token);
    setUser(res.user);
    localStorage.setItem('vk_auth_token', res.access_token);
    localStorage.setItem('vk_auth_user', JSON.stringify(res.user));
    setIsAuthModalOpen(false);
  };

  const register = async (data: { email: string; password: string; full_name: string; phone?: string }) => {
    const res = await api.register(data);
    setToken(res.access_token);
    setUser(res.user);
    localStorage.setItem('vk_auth_token', res.access_token);
    localStorage.setItem('vk_auth_user', JSON.stringify(res.user));
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('vk_auth_token');
    localStorage.removeItem('vk_auth_user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
      }}
    >
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
