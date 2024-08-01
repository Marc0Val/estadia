import React, { createContext, useContext, useState } from "react";
import { loginRequest, logoutRequest } from "../api/auth.api";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password_) => {
    try {
      const response = await loginRequest({ email, password_ });
      setIsAuthenticated(true);
      setUser(response.data.user);
      return response;
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    try {
      await logoutRequest();
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
