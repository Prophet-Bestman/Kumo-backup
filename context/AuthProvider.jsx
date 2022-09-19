import { getUserFromLocalStorage } from "api/config";
import React, { useState, useReducer, useEffect, useContext } from "react";
import config from "utils/config";

export const AuthContext = React.createContext({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const userActions = {
  LOGIN: "LOGIN",
  SAVE_SOCKET: "SAVE_SOCKET",
  LOGOUT: "LOGOUT",
  RESET_USER: "RESET_USER",
};

const initialUserState = {};

function setRedirect(redirect) {
  window.sessionStorage.setItem(config.key.redirect, redirect);
}

function getRedirect() {
  return window.sessionStorage.getItem(config.key.redirect);
}

function clearRedirect() {
  return window.sessionStorage.removeItem(config.key.redirect);
}

const reducer = (user, action) => {
  switch (action.type) {
    case userActions.LOGIN:
      return (user = action.payload);
    case userActions.LOGOUT:
      localStorage.clear();
      return (user = {});
    case userActions.RESET_USER:
      return (user = {});

    default:
      return user;
  }
};

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, dispatch] = useReducer(reducer, initialUserState);
  const [localUser, setLocalUser] = useState();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    setHasChecked(false);
    setTimeout(() => {
      const localUser = getUserFromLocalStorage();
      setLocalUser(localUser);
      setHasChecked(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (!hasChecked) {
      setLoading(true);
    } else {
      if (!localUser || Object.keys(localUser).length === 0) {
        localStorage.clear();
        dispatch({ type: userActions.LOGOUT });
        setLoading(false);
      } else if (!!localUser && Object.keys(localUser).length !== 0) {
        dispatch({ type: userActions.LOGIN, payload: localUser });
        setLoading(false);
      }
    }
  }, [localUser, hasChecked]);

  const value = {
    user,
    loading,
    setLoading,
    dispatch,
    setRedirect,
    getRedirect,
    clearRedirect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
