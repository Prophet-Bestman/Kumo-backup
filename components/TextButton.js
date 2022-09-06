import { Text } from "@chakra-ui/react";
import React from "react";

const TextButton = (props) => {
  const { onClick, children } = props;
  return (
    <Text
      mt="2"
      cursor="pointer"
      textAlign="center"
      fontWeight="bold"
      color="app.primary.300"
      onClick={onClick}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextButton;
