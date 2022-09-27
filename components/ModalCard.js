import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const ModalCard = ({ isOpen, onClose, size, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size || "md"}>
      <ModalOverlay
        // bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(60deg)"
      />
      <ModalContent px="">
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalCard;
