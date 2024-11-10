// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { createUser, getUsers } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (email, password) => {
    const newUser = { email, password };
    await createUser(newUser);
    setCurrentUser(newUser);
  };

  const login = async (email, password) => {
    const response = await getUsers();
    const user = response.data.find((user) => user.email === email && user.password === password);
    if (user) setCurrentUser(user);
    else throw new Error("Invalid credentials");
  };

  const logout = () => setCurrentUser(null);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
