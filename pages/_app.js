// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "layout/MainLayout";
import theme from "theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
