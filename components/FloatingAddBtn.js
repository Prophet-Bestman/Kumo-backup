import { Box, Circle } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const FloatingAddBtn = ({ onClick }) => {
  return (
    <Circle
      onClick={onClick}
      size="12"
      bg="app.primary.900"
      shadow="xl"
      pos="fixed"
      bottom={8}
      right={8}
      cursor={"pointer"}
      color="white"
      transition="all ease-in-out 300ms"
      fontSize="20px"
      _hover={{
        transform: "scale(115%)",
      }}
    >
      <AiOutlinePlus />
    </Circle>
  );
};

export default FloatingAddBtn;
