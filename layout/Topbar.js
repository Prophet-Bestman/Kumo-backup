import { Box, Circle, Flex, Img, Text } from "@chakra-ui/react";
import { useNavContext } from "context/NavProvider";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";

const Topbar = () => {
  const { activeNav } = useNavContext();
  const router = useRouter();

  return (
    <Box>
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

        <Img
          src="img/Profile_Picture.jpeg"
          width="48px"
          rounded="md"
          h="48px"
        />
      </Flex>
      {activeNav !== "Dashboard" && (
        <Flex my="6" px="12" alignItems="center" gap="4">
          <Box color="app.primary.900">
            <AiOutlineArrowLeft
              onClick={() => router?.back()}
              cursor="pointer"
              size="24px"
            />
          </Box>

          {activeNav}
        </Flex>
      )}
    </Box>
  );
};

export default Topbar;
