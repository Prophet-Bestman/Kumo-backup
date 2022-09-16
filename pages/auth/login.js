import { Box, Flex } from "@chakra-ui/react";
import { LoginForm } from "components/Auth";
import AuthLayout from "layout/AuthLayout";
import React from "react";

const Login = () => {
  return (
    <AuthLayout>
      <Flex h="full" bg="gray.100" justify="center" alignItems="center">
        <LoginForm />
      </Flex>
    </AuthLayout>
  );
};

export default Login;
