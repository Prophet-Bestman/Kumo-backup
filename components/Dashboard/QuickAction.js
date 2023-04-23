import { Box, Circle, Text } from "@chakra-ui/react";
import React from "react";

const QuickAction = ({ action }) => {
  const { title, icon } = action;
  return (
    <Box
      shadow=" rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;"
      cursor="pointer"
      rounded="md"
      px={["3", , "4"]}
      py="3"
    >
      <Circle
        size={["30px", , "38px"]}
        rounded="sm"
        bg="app.primaryTrans"
        color="app.primary.300"
        mb="3"
      >
        {icon}
      </Circle>

      <Text fontSize={["14px", "16px"]} fontWeight={500}>
        {title}
      </Text>
    </Box>
  );
};

export default QuickAction;
