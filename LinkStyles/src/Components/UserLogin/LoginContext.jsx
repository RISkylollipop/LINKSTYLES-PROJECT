/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";
// 1. Create context
export const LoginContext = createContext();

// 2. Provider component
const LoginContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage when app starts
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : "Guest";
  });

  const [mainData, setMainData] = useState(() => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : {};
  });

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user && user !== "Guest") {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (mainData && mainData.length !== 0) {
      localStorage.setItem("data", JSON.stringify(mainData));
    } else {
      localStorage.removeItem("data");
    }
  }, [mainData]);


  const value = {
    user,
    setUser,
    mainData,
    setMainData,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContextProvider;
