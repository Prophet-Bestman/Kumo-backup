import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useResetUsersPin } from "api/users";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect } from "react";

const NewPin = ({ isOpen, onClose, user_id }) => {
  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "User's pin has been reset",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: resetPin,
    data: resetResp,
    isLoading,
    reset,
  } = useResetUsersPin();

  const handleReset = () => {
    resetPin({ user_id });
  };

  useEffect(() => {
    if (!!resetResp && resetResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [resetResp]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box bg="white" py="20" px="6">
        <Text textAlign="center" fontWeight={500} mb="7" fontSize="24px">
          {`Are you sure you want to initiate Reset User's Pin`}
        </Text>

        <Flex alignItems="center" gap={8}>
          <Button variant="ghost" onClick={onClose}>
            No
          </Button>

          <Button mt="4" h="48px" isLoading={isLoading} onClick={handleReset}>
            Yes
          </Button>
        </Flex>
      </Box>
    </ModalCard>
  );
};

export default NewPin;
