// Add this near the top of your main entry file where Axios is used, or in a central config.
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Dashboard / Pages
import StatisticsPage from './pages/StatisticsPage';
import ActivityPage from './pages/ActivityPage';
import CustomersPage from './pages/CustomersPage';
import MessagesPage from './pages/MessagesPage';
import VehiclesPage from './pages/VehiclesPage';
import SettingsPage from './pages/SettingsPage';
import DashboardOverview from './pages/DashboardOverview'; // Move existing dash logic here

// In production, talk to Render. In development, use local.
axios.defaults.baseURL = import.meta.env.PROD
  ? 'https://inventory-management-system-zqms.onrender.com' // <-- Replace with your Render URL
  : '';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-accent/60 rounded-full" />
        <div className="w-2 h-2 bg-accent/30 rounded-full" />
      </div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-primary">
      <Sidebar />
      <main className="flex-grow p-8 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />
        <Route path="/statistics" element={<ProtectedRoute><StatisticsPage /></ProtectedRoute>} />
        <Route path="/activity" element={<ProtectedRoute><ActivityPage /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><CustomersPage /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/vehicles" element={<ProtectedRoute><VehiclesPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
