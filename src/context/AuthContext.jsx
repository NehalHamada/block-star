import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./createContextRef.js";
import authService from "../api/services/authService.jsx";

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("userToken") || null);

  const [userData, setUserData] = useState(null);
  async function logOut() {
    await authService.logout();
    setToken(null);
    setUserData(null); // Clear user data on logout
    localStorage.removeItem("userToken");
    navigate("/");
  }
  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("userToken", token);
    } else {
      localStorage.removeItem("userToken");
    }
  }, [token]);

  // Fetch user data when token is available
  useEffect(() => {
    if (token) {
      // Async operation - setState in callback is fine
      authService
        .getUser()
        .then((response) => {
          setUserData(response.data?.user);
        })
        .catch((error) => {
          // If token is invalid, clear it
          if (error.response?.status === 401) {
            setToken(null);
            setUserData(null);
          }
        });
    }

    // Note: userData is cleared in logOut() function when token is removed
  }, [token]);

  // Listen for manual localStorage changes (e.g., token deletion in DevTools)
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Check if token was removed from localStorage
      if (e.key === "userToken" && e.newValue === null && token) {
        setToken(null);
      }
      // Check if token was added/changed in localStorage
      else if (e.key === "userToken" && e.newValue && e.newValue !== token) {
        setToken(e.newValue);
      }
    };

    // Also check periodically for manual changes in the same tab
    const checkTokenSync = () => {
      const storedToken = localStorage.getItem("userToken");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    };

    // Listen to storage events (works across tabs)
    window.addEventListener("storage", handleStorageChange);

    // Check every 1 second for manual changes in the same tab
    const intervalId = setInterval(checkTokenSync, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, [token]);

  const login = (authToken) => {
    setToken(authToken);
    authService.getUser().then((response) => {
      setUserData(response.data?.user);
    });
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        setToken,
        login,
        logOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
