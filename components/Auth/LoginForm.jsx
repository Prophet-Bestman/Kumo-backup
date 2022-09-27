import {
  Box,
  Button,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "components";

import { loginSchema } from "utils/schema";
import { useLogin } from "api/auth";
import { handleRequestError } from "utils/helpers";
import { useRouter } from "next/router";
import { useAuthContext, userActions } from "context/AuthProvider";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { dispatch } = useAuthContext();

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Login Successful",
      description: "Redirecting...",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  // ======= FORM VALIDATION ======
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const {
    mutate: login,
    data: loginResp,
    error: loginError,
    isLoading,
    reset,
  } = useLogin();

  const submitLogin = (data) => {
    login(data);
  };

  useEffect(() => {
    handleRequestError(loginError);
    reset();
  }, [loginError]);

  useEffect(() => {
    if (!!loginResp && loginResp?.status === "success") {
      dispatch({ type: userActions.LOGIN, payload: loginResp?.data });
      successToast();
      router.push("/");
    }
  }, [loginResp]);

  return (
    <Box
      bg="white"
      p="8"
      rounded="md"
      shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      w="full"
      maxW="400px"
    >
      <Text
        textAlign="center"
        fontSize="2xl"
        fontWeight={500}
        color="app.primary.500"
      >
        Login
      </Text>
      <form onSubmit={handleSubmit(submitLogin)}>
        <Grid my="5" color="app.greyText" rowGap="7">
          <Stack>
            <Text fontSize="xs">Email/Phone No./Username</Text>
            <Input
              placeholder="Enter Email, Phone No. or Username"
              {...register("name_field")}
            />
            <InputError msg={errors?.name_field?.message} />
          </Stack>
          <Stack>
            <Text fontSize="xs">Password</Text>
            <InputGroup>
              <Input
                placeholder="Enter Password"
                type={show ? "text" : "password"}
                {...register("password")}
              />
              <InputRightElement
                onClick={() => setShow(!show)}
                cursor="pointer"
                color="app.primary.500"
                fontSize="20px"
                children={show ? <AiFillEyeInvisible /> : <AiFillEye />}
              />
            </InputGroup>
            <InputError msg={errors?.password?.message} />
          </Stack>

          <Button isLoading={isLoading} type="submit" my={5}>
            Login
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginForm;
