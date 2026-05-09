import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('saptarimango_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('saptarimango_user', JSON.stringify(user));
  }, [user]);

  const login = (email, password) => {
    // Admin Check
    if (email === 'admin@saptarimango.com' && password === 'admin123') {
      const adminUser = { id: 'admin', email, name: 'Admin', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('isAdminAuthenticated', 'true');
      return adminUser;
    }
    
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAdminAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
