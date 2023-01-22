import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

const CustomRadioInput = (props) => {
  const { color, size, handleCheck } = props;
  const [checked, setChecked] = useState(false);

  const check = () => {
    setChecked(!checked);
    handleCheck && handleCheck();
  };

  return (
    <Box
      onClick={check}
      p="1"
      borderColor={color || "#51CBCD"}
      rounded="lg"
      borderWidth="2px"
      cursor="pointer"
      h={size || "36px"}
      w={size || "36px"}
    >
      {checked && (
        <Box h="full" w="full" bg={color || "#51CBCD"} rounded="md"></Box>
      )}
    </Box>
  );
};

export default CustomRadioInput;
