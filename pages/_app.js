// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import NavProvider from "context/NavProvider";
import MainLayout from "layout/MainLayout";
import theme from "theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NavProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </NavProvider>
    </ChakraProvider>
  );
}

export default MyApp;
