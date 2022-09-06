import {
  Box,
  HStack,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import SuccessModal from "components/SuccessModal";
import TextButton from "components/TextButton";
import React from "react";

const CompleteTransaction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg="white" px="6" py="9" rounded="md">
      <Text mb="3" fontWeight={700} fontSize="20px">
        Enter Transaction PIN
      </Text>
      <Text fontSize="11px" mb="12" w="85%">
        To ensure you are the one making this transaction, please insert your
        registered transaction PIN
      </Text>

      <HStack my="8">
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>

      <TextButton onClick={onOpen}>Make Payment</TextButton>

      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        message="Your transaction has been successfully created"
      />
    </Box>
  );
};

export default CompleteTransaction;
