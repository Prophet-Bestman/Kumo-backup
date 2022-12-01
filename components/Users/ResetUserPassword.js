import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetUserPassword } from "api/users";
import InputError from "components/InputError";
import LargeHeading from "components/LargeHeading";
import ModalCard from "components/ModalCard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { handleRequestError } from "utils/helpers";
import { resetPasswordSchema } from "utils/schema";

const ResetUserPassword = ({ isOpen, onClose, user_id }) => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "User's password has been reset",
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
  } = useResetUserPassword();

  const handleReset = (data) => {
    const payload = {
      user_id,
      data: { password: data?.password },
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
          Reset User Password
        </LargeHeading>

        <form onSubmit={handleSubmit(handleReset)}>
          <Stack mt="8" mb="6">
            <Text fontSize="xs">Password</Text>
            <InputGroup>
              <Input
                placeholder="Enter New Password"
                type={show ? "text" : "password"}
                {...register("password")}
              />
              <InputRightElement
                onClick={() => setShow(!show)}
                cursor="pointer"
                color="app.primary.500"
                fontSize="20px"
              >
                {show ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputRightElement>
            </InputGroup>
            <InputError msg={errors?.password?.message} />
          </Stack>
          <Stack mb="8">
            <Text fontSize="xs">Password</Text>
            <InputGroup>
              <Input
                placeholder="Re-Enter New Password"
                type={showConfirm ? "text" : "password"}
                {...register("confirm_password")}
              />
              <InputRightElement
                onClick={() => setShowConfirm(!showConfirm)}
                cursor="pointer"
                color="app.primary.500"
                fontSize="20px"
              >
                {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputRightElement>
            </InputGroup>
            <InputError msg={errors?.confirm_password?.message} />
          </Stack>
          <Button h="48px" type="submit" isLoading={isLoading}>
            Reset Password
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default ResetUserPassword;
