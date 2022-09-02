import { Box, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import CustomRadioInput from "components/CustomRadioInput";
import SuccessModal from "components/SuccessModal";
import TextButton from "components/TextButton";

const ConfirmCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Text mb="3" fontWeight={700} fontSize="20px">
        Enter Transaction PIN
      </Text>
      <Text fontSize="11px" mb="12" w="85%">
        A 6 digts code was sent to 090 8956 ****
      </Text>

      <HStack my="8">
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>

      <Flex gap="2" alignItems="center">
        <CustomRadioInput color="#51CBCD" size="32px" />
        <Text color="#51CBCD"> Use this card as dafault</Text>
      </Flex>

      <TextButton onClick={onOpen}>+ Save this card</TextButton>

      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        message="Your New Card has been added and ready for use"
      />
    </Box>
  );
};

export default ConfirmCard;
