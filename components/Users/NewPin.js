import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetUsersPin } from "api/users";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineReload } from "react-icons/ai";
import { handleRequestError } from "utils/helpers";
import { resetPinSchema } from "utils/schema";

const NewPin = ({ isOpen, onClose, user_id }) => {
  const [randomPin, setRandomPin] = useState(1);

  const generateRandomPin = () => {
    setRandomPin(Math.ceil(Math.random() * 10000));
  };

  useEffect(() => {
    generateRandomPin();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPinSchema) });

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
    error,
    isLoading,
    reset,
  } = useResetUsersPin();

  const handleReset = (data) => {
    const payload = {
      id: user_id,
      data: { ...data },
    };
    resetPin(payload);
  };

  useEffect(() => {
    if (!!resetResp && resetResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [resetResp]);

  useEffect(() => {
    handleRequestError(error);
    reset();
  }, [error]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box bg="white" py="12" px="6">
        <LargeHeading color="app.primary.700" fontSize="20px">
          Enter New Pin
        </LargeHeading>

        <form onSubmit={handleSubmit(handleReset)}>
          <Stack mt="4">
            <Text fontSize="14px">
              New Pin (This default Pin Will be sent to the user)
            </Text>

            <Input
              {...register("pin")}
              placeholder=""
              type="number"
              value={randomPin}
            />
            <Flex justify="flex-end" px="8" mb="'200px" color="app.primary">
              <AiOutlineReload
                fontSize="20px"
                onClick={generateRandomPin}
                cursor="pointer"
              />
            </Flex>
            <InputError msg={errors?.pin?.message} />
          </Stack>

          <Button mt="4" h="48px" type="submit" isLoading={isLoading}>
            Initiate Reset Pin
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default NewPin;
