import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import { RegisterForm } from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

export function Register() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    } else {
      navigate("/register", { replace: true });
    }
  });
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
