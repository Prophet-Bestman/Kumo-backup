import { Box, Circle, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import { MdNotifications } from "react-icons/md";

const Topbar = () => {
  return (
    <Flex
      px="42px"
      py="32px"
      justify="end"
      alignItems="center"
      color="app.primary.900"
      gap="24px"
    >
      <Box pos="relative">
        <Circle
          size="12px"
          borderColor="white"
          borderWidth="2px"
          pos="absolute"
          top="3px"
          right="3px"
          bg="app.primary.900"
        />
        <MdNotifications size="30px" />
      </Box>

      <Text fontSize="12px" fontWeight={700}>
        Adewale Adedamola
      </Text>

      <Img src="img/Profile_Picture.jpeg" width="48px" rounded="md" h="48px" />
    </Flex>
  );
};

export default Topbar;
