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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "components";

import { loginSchema } from "utils/schema";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const submitLogin = (data) => {
    console.log(data);
  };

  const [show, setShow] = useState(false);
  return (
    <Box
      bg="white"
      p="8"
      rounded="md"
      shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      w="full"
      maxW="400px"
    >
      <Text textAlign="center" fontSize="2xl" color="app.primary.500">
        Login
      </Text>
      <form onSubmit={handleSubmit(submitLogin)}>
        <Grid my="5" color="app.greyText" rowGap="7">
          <Stack>
            <Text fontSize="xs">Email/Username</Text>
            <Input
              placeholder="Enter email or username"
              {...register("email")}
            />
            <InputError msg={errors?.email?.message} />
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

          <Button type="submit" my={5}>
            Login
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginForm;
