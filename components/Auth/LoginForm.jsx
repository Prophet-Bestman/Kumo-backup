import {
  Box,
  Button,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

import { InputError } from "components";
import { loginSchema } from "utils/schema";
import { useLogin } from "api/auth";
import { useAuthContext } from "context/AuthProvider";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  // ======= FORM VALIDATION ======
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const { mutate: login, isLoading } = useLogin();

  const submitLogin = (data) => {
    login(data);
  };

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
              >
                {show ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputRightElement>
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
