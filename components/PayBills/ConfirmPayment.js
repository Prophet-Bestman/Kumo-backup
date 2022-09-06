import {
  Box,
  HStack,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ConfirmModal, SuccessModal } from "components";

import TextButton from "components/TextButton";
import React from "react";

const ConfirmPayment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();

  const closeSuccess = () => {
    onSuccessClose();
    onClose();
  };
  const openSuccess = () => {
    onSuccessOpen();
    onClose();
  };
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

      <TextButton onClick={onOpen}>Pay</TextButton>

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={closeSuccess}
        message="Your transaction has been successfully created"
      />

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        primaryFunc={{ name: "Yes", func: openSuccess }}
        secondaryFunc={{
          name: "Use other payment method",
          func: onClose,
        }}
        message="NGN 40,000 will be removed from your Kurepay Wallet. Continue with this transaction?"
      />
    </Box>
  );
};

export default ConfirmPayment;
