import React, { createContext, useState, useContext } from 'react';
import api from '@/utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });
      
      if (response.success) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        return { success: true };
      }
      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed. Please try again.' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      
      if (response.success) {
        const { user: registeredUser, token } = response.data;
        setUser(registeredUser);
        localStorage.setItem('user', JSON.stringify(registeredUser));
        localStorage.setItem('token', token);
        return { success: true };
      }
      return { success: false, error: response.message || 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateProfile = async (updatedData) => {
    try {
      const response = await api.updateUserProfile(user.id, updatedData);
      
      if (response.success) {
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: error.message || 'Update failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
