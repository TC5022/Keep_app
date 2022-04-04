import React from "react";
import { Flex } from "@chakra-ui/react";

import { RegisterForm } from "../components/RegisterForm";

export function Register() {
  return (
    <Flex
      maxW="100vw"
      h="100vh"
      flexDir="col"
      justifyContent="center"
      alignItems="center"
    >
      <RegisterForm />
    </Flex>
  );
}
