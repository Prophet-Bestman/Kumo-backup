// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import NavProvider from "context/NavProvider";
import MainLayout from "layout/MainLayout";
import theme from "theme";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        {Component?.requireAuth ? (
          <NavProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </NavProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
