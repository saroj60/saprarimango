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

  const [allUsers, setAllUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('saptarimango_all_users');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing allUsers from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('saptarimango_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('saptarimango_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  const signup = (userData) => {
    const newUser = { ...userData, id: Date.now().toString(), role: 'customer' };
    setAllUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return newUser;
  };

  const login = (email, password) => {
    // Admin Check
    if (email === 'admin@saptarimango.com' && password === 'admin123') {
      const adminUser = { id: 'admin', email, name: 'Admin', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('isAdminAuthenticated', 'true');
      return adminUser;
    }

    const foundUser = allUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return foundUser;
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAdminAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, allUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
