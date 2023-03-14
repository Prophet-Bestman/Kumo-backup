import { useGetAdmin } from "api/admin";
import { getUserFromLocalStorage } from "api/config";
import React, { useState, useEffect, useContext } from "react";
import config from "utils/config";

export const AuthContext = React.createContext({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

function setRedirect(redirect) {
  window.sessionStorage.setItem(config.key.redirect, redirect);
}

function getRedirect() {
  return window.sessionStorage.getItem(config.key.redirect);
}

function clearRedirect() {
  return window.sessionStorage.removeItem(config.key.redirect);
}

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localUser, setLocalUser] = useState();
  const [hasChecked, setHasChecked] = useState(false);

  const {
    data: adminResp,
    error,
    isLoading,
  } = useGetAdmin({
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (adminResp?.status === "success") {
      setUser(adminResp?.data);
    }
  }, [adminResp]);

  const signIn = (data) => {
    localStorage.setItem(config.key.user, JSON.stringify(data));
    localStorage.setItem(config.key.token, data.token);
    localStorage.setItem(config.key.userID, data.user_id);
    localStorage.setItem(config.key.isLoggedIn, JSON.stringify(true));
    setUser(data);
    setIsLoggedIn(true);
  };

  const signOut = () => {
    localStorage.setItem(config.key.isLoggedIn, JSON.stringify(false));
    localStorage.removeItem(config.key.token);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setHasChecked(false);
    setTimeout(() => {
      // const localUser = getUserFromLocalStorage();
      // setLocalUser(localUser);
      setIsLoggedIn(JSON.parse(localStorage.getItem(config.key.isLoggedIn)));
      setHasChecked(true);
      setUser(JSON.parse(localStorage.getItem(config.key.user)));
    }, 100);
  }, []);

  useEffect(() => {
    if (!hasChecked || isLoading) {
      setLoading(true);
    } else {
      if (!isLoggedIn) signOut();
      setLoading(false);
    }
  }, [hasChecked, isLoggedIn, isLoading]);

  const value = {
    user,
    signIn,
    signOut,
    isLoggedIn,
    loading,
    setLoading,
    setRedirect,
    getRedirect,
    clearRedirect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
