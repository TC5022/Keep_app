import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import { RegisterForm } from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function Register() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.name) {
      navigate("/", { replace: true });
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
