import { extendTheme } from "@chakra-ui/react";
import { foundations } from "./foundations";
import styles from "./styles";
import components from "./components";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  cssVarPrefix: "kumo",
};

const overrides = {
  config,
  styles,
  ...foundations,
  components,
};

const theme = extendTheme(overrides);

export default theme;
