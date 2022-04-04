import React from "react";
import { Flex } from "@chakra-ui/react";

import { LoginForm } from "../components/LoginForm";

export function Login() {
  return (
    <Flex
      maxW="100vw"
      h="100vh"
      flexDir="col"
      justifyContent="center"
      alignItems="center"
    >
      <LoginForm />
    </Flex>
  );
}
