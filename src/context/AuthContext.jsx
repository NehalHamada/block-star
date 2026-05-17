import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./createContextRef.js";
import authService from "../api/services/authService.jsx";

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [userData, setUserData] = useState(null);

  const login = useCallback((authToken) => {
    if (!authToken) return;
    
    // Ensure token is in localStorage immediately for subsequent API calls
    localStorage.setItem("userToken", authToken);
    setToken(authToken);

    // Fetch user data immediately to update UI
    authService
      .getUser()
      .then((response) => {
        setUserData(response.data?.user);
      })
      .catch((error) => {
        console.error("Failed to fetch user data after login:", error);
      });
  }, []);

  // Auto-consume token from URL (fallback for direct redirects to home)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Check for common token parameter names
    const urlToken = params.get("token") || params.get("access_token") || params.get("user_token");
    
    if (urlToken) {
      console.log("Token detected in URL, logging in...");
      login(urlToken);
      
      // Clean up URL without reload to keep it clean for the user
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("token");
      newUrl.searchParams.delete("access_token");
      newUrl.searchParams.delete("user_token");
      window.history.replaceState({}, document.title, newUrl.pathname + newUrl.search);
    }
  }, [login]);

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
