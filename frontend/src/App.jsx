import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Explore from './pages/Explore';
import AiScanner from './pages/AiScanner';
import Work from './pages/Work';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/auth" />;
  return (
    <div className="relative w-full h-full pb-24">
      {children}
      <BottomNav />
    </div>
  );
}

function AppContent() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/auth" element={currentUser ? <Navigate to="/" /> : <Auth />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
      <Route path="/scanner" element={<ProtectedRoute><AiScanner /></ProtectedRoute>} />
      <Route path="/work" element={<ProtectedRoute><Work /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="bg-slate-900 min-h-screen sm:py-8 flex justify-center items-center">
        <div className="w-full max-w-[480px] min-h-screen sm:min-h-[800px] sm:h-[850px] bg-slate-50 relative sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <Router>
              <AppContent />
            </Router>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
