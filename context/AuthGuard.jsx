import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider";

const AuthGuard = ({ children }) => {
  const { user, loading, setRedirect } = useAuthContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || Object?.keys(user)?.length === 0) {
        setLoggedIn(false);
        setRedirect(router.route);
        router.push("/auth/login");
      } else if (!!user && Object?.keys(user)?.length > 0) {
        setLoggedIn(true);
      }
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loggedIn) {
    return <div>{children}</div>;
  }

  return null;
};

export default AuthGuard;
