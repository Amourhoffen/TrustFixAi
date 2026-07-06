import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Using mocked auth state if Firebase is not fully configured yet
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'member' or 'provider'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app with configured Firebase, we use onAuthStateChanged
    // For this prototype/hackathon without keys, we mock a session if found in localStorage
    const savedRole = localStorage.getItem('mockRole');
    if (savedRole) {
      setCurrentUser({ uid: 'mock-user-123', email: 'test@example.com' });
      setUserRole(savedRole);
    }
    setLoading(false);
  }, []);

  const login = (role) => {
    localStorage.setItem('mockRole', role);
    setCurrentUser({ uid: 'mock-user-123', email: 'test@example.com' });
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('mockRole');
    setCurrentUser(null);
    setUserRole(null);
  };

  const value = {
    currentUser,
    userRole,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
