import { Text } from "@chakra-ui/react";
import React from "react";

const LargeHeading = (props) => {
  const { children } = props;
  return (
    <Text fontWeight="500" fontSize="24px" {...props}>
      {children}
    </Text>
  );
};

export default LargeHeading;
