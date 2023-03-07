// pages/_app.js
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import NavProvider from "context/NavProvider";
import MainLayout from "layout/MainLayout";
import theme from "theme";
import AuthProvider from "context/AuthProvider";
import AuthGuard from "context/AuthGuard";
import Interceptor from "api/Interceptor";

const { ToastContainer } = createStandaloneToast();

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          {Component?.requireAuth ? (
            <AuthGuard>
              <NavProvider>
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </NavProvider>
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
          <ToastContainer />
        </ChakraProvider>
        <Interceptor />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
