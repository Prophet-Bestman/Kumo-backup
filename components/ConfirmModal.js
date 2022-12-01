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
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box py="20">
            <Flex>
              <Text
                fontSize="18px"
                fontWeight="700"
                w="70%"
                mx="auto"
                mb="8"
                textAlign="center"
              >
                {message}
              </Text>
            </Flex>
            <Flex justify="center" gap="2">
              <Button variant="link" w="148px" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={primaryFunc?.func}
                w="148px"
                isLoading={isLoading}
              >
                {primaryFunc?.name}
              </Button>
            </Flex>

            {!!secondaryFunc && (
              <Button
                mt="32"
                variant="link"
                color="app.primary.500"
                textAlign="center"
                onClick={secondaryFunc?.func}
              >
                {secondaryFunc?.name}
              </Button>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
