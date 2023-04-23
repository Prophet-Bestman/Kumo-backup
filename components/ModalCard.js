import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ModalCard = ({ isOpen, onClose, size, children, isCentered }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size || "md"}
      isCentered={typeof isCentered !== "undefined" ? isCentered : true}
    >
      <ModalOverlay
        // bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(60deg)"
      />
      <ModalContent px="" pos="relative">
        <Box pos="absolute" right={8} top={8} onClick={onClose}>
          <AiOutlineClose cursor="pointer" />
        </Box>

        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalCard;
