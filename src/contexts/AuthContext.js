import { createContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  const login = () => {};
  const register = () => {};
  const logout = () => {};
  const signInWithFirebase = () => {};

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, register, logout, signInWithFirebase }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
