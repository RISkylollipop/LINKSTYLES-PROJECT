/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect, } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// 1. Create context
export const LoginContext = createContext();

// 2. Provider component
const LoginContextProvider = ({ children }) => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const URL = `https://linkstyles-project-production.up.railway.app`
  const [user, setUser] = useState(() => {
    // Load user from localStorage when app starts
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : [];
  });
  const [productlenght, setProductlenght] = useState(null)
  const [mainData, setMainData] = useState(() => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : [];
  });




  const isVerify = () => {
    useEffect(() => {
      const interval = setInterval(async () => {
        const token = localStorage.getItem(`token`)
        const isAdminRoute = pathname.includes("/admin");

        if (!token && isAdminRoute) {
          // window.location.href = "/login";
          navigate("/login", { replace: true });
          return;
        }

        try {
          const res = await fetch(`${URL}/verifyadmin`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = await res.json();

          const dataErrors = ["login as admin", "no access", "session expired, please login", "invalid"]

          if (data?.error && dataErrors.some(err => data.error.toLowerCase().includes(err))) {

            alert(data.error)
            localStorage.removeItem(`user`);
            localStorage.removeItem(`data`);
            localStorage.removeItem(`token`);
            window.location.href = `/login`

          }



        } catch (error) {
          console.log(error);
          console.error("Session check failed:", error);
        }
      }, 300000);

      return () => clearInterval(interval)
    }, [])
  }













  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user && user !== "") {
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
    productlenght,
    setProductlenght,
    isVerify
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContextProvider;
