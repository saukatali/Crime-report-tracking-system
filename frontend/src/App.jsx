import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Pages
import Home from '@/pages/Home';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import Dashboard from '@/pages/Dashboard';
import FileComplaint from '@/pages/FileComplaint';
import ComplaintDetails from '@/pages/ComplaintDetails';
import Profile from '@/pages/Profile';
import Notifications from '@/pages/Notifications';
import Analytics from '@/pages/Analytics';
import TrackComplaint from '@/pages/TrackComplaint';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/track-complaint" element={<TrackComplaint />} />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/file-complaint" 
            element={
              <ProtectedRoute>
                <FileComplaint />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/complaint/:id" 
            element={
              <ProtectedRoute>
                <ComplaintDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
                  <a href="/" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Go back home
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
