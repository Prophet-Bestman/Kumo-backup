import {
  Box,
  Circle,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsCheckLg } from "react-icons/bs";

const SuccessModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent h="80vh" bg="app.primary.900">
        <Flex h="full" w="full" justify="center" alignItems="center">
          <Box bg="white" rounded="xl" w="50%" p="32px">
            <Flex mb="20px" mt="30px" justify="center">
              <Circle bg="app.primary.900" size="56px">
                <BsCheckLg color="white" size="40px" />
              </Circle>
            </Flex>
            <Text
              fontSize="24px"
              fontWeight={700}
              textAlign="center"
              color="app.primary.900"
              mb="24px"
            >
              Successful
            </Text>

            <Text color="#818181" textAlign="center">
              {message}
            </Text>
          </Box>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
