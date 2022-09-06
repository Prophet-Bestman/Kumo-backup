import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ConfirmModal = ({
  onClose,
  isOpen,
  primaryFunc,
  secondaryFunc,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box h="80vh">
            <Flex>
              <Text
                fontSize="18px"
                fontWeight="700"
                w="50%"
                mx="auto"
                mt="40"
                mb="12"
                textAlign="center"
              >
                {message}
              </Text>
            </Flex>
            <Flex justify="center" gap="2">
              <Button onClick={primaryFunc?.func} w="124px">
                {primaryFunc?.name}
              </Button>
              <Button variant="link" w="124px" onClick={onClose}>
                Cancel
              </Button>
            </Flex>

            <Button
              mt="32"
              variant="link"
              color="app.primary.500"
              textAlign="center"
            >
              Use other payment method
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
