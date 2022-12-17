// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { useAuthContext } from "./AuthProvider";

// const AuthGuard = ({ children }) => {
//   const { user, loading, setRedirect } = useAuthContext();
//   const [loggedIn, setLoggedIn] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (!user || Object?.keys(user)?.length === 0) {
//         setLoggedIn(false);
//         setRedirect(router.route);
//         router.push("/auth/login");
//       } else if (!!user && Object?.keys(user)?.length > 0) {
//         setLoggedIn(true);
//       }
//     }
//   }, [user, loading]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (loggedIn) {
//     return <div>{children}</div>;
//   }

//   return null;
// };

// export default AuthGuard;

import { Box, Button, Text } from "@chakra-ui/react";
import { useGetOverallStats } from "api/stats";
import { useSingleGetUser } from "api/users";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider";

const AuthGuard = ({ children }) => {
  const { user, loading, setRedirect } = useAuthContext();
  const [authError, setAuthError] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const router = useRouter();

  const {
    data: statsResp,
    error,
    isLoading,
    isFetchedAfterMount,
  } = useGetOverallStats({
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!!statsResp && statsResp?.status === "success") {
      setAuthError(false);
    }
  }, [statsResp]);

  useEffect(() => {
    if (!!error) {
      if (error?.response?.status === 401) {
        setRedirect(router.route);
        router.push("/auth/signin");
        setAuthError(true);
      } else if (error?.code === "ERR_NETWORK") {
        setNetworkError(true);
      }
    } else if (!loading && !isLoading) {
      //auth is initialized and there is no user
      if (!user || Object.keys(user).length === 0) {
        // remember the page that user tried to access
        setRedirect(router.route);
        // redirect
        router.push("/auth/login");
      }
    }
  }, [loading, router, user, setRedirect, error]);

  /* show loading indicator while the auth provider is still loading */
  if (loading || isLoading) {
    return (
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <div className="animate-pulse">
          {/* <img
            src="/images/kipati_gradient.png"
            className="h-[80px] md:h-[120px] mb-4"
            alt=""
          /> */}
          <Text textAlign="center" fontSize="18px" fontWeight="medium">
            LOADING...
          </Text>
        </div>
      </Box>
    );
  }

  if (
    !loading &&
    !isLoading &&
    isFetchedAfterMount &&
    !authError &&
    Object.keys(user).length !== 0
  ) {
    return <>{children}</>;
  }

  if (!loading && !isLoading && networkError) {
    return (
      <Box
        h="100vh"
        display="flex"
        flexDir="column"
        gap="3"
        justifyContent="center"
        alignItems="center"
      >
        <Text textAlign="center" fontSize="24px" fontWeight="medium">
          {" "}
          We are sorry
        </Text>
        <Text textAlign="center" fontSize="18px" fontWeight="medium">
          Cannot Connect to server
        </Text>
        <Button
          size="sm"
          h="38px"
          onClick={() => window.location.reload()}
          w="160px"
        >
          Refresh
        </Button>
      </Box>
    );
  }

  // SUBJECT TO CHANGE
  if (!loading && networkError)
    return (
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text textAlign="center" fontSize="24px" fontWeight="medium">
          {" "}
          We are sorry
        </Text>
        <Text textAlign="center" fontSize="18px" fontWeight="medium">
          Cannot Connect to server
        </Text>
        <Button
          size="sm"
          h="38px"
          onClick={() => window.location.reload()}
          w="160px"
        >
          Refresh
        </Button>
      </Box>
    );

  /* otherwise don't return anything, will do a redirect from useEffect */

  return null;
};

export default AuthGuard;
