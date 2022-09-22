import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import { FaCopy } from "react-icons/fa";
import { MdOutlineQrCode2 } from "react-icons/md";

const ProfileCard = () => {
  return (
    <Flex
      flexDir="column"
      p="6"
      bg="white"
      rounded="md"
      justify="center"
      alignItems="center"
    >
      <Img src="/img/Profile_Picture.jpeg" w="100px" rounded="md" />

      <Text my="4" color="app.primary.900" fontWeight={700}>
        Adewale Adedamola
      </Text>

      <Flex aignItems="center" gap="2">
        <Text fontWeight="500" fontSize="12px">
          User ID: Kure7u3893
        </Text>
        <Flex aignItems="center" gap="1" color="app.primary.300">
          <FaCopy />
          <Text fontSize="12px">Copy</Text>
        </Flex>
      </Flex>

      <Box my="8">
        <MdOutlineQrCode2 size="90px" />
      </Box>

      <Button variant="link">Download</Button>
    </Flex>
  );
};

export default ProfileCard;
