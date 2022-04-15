import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import { LoginForm } from "../components/LoginForm";
import { useNavigate, Outlet } from "react-router-dom";

export function Login() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  });
  return (
    <>
    <Flex
      maxW="100vw"
      h="100vh"
      flexDir="col"
      justifyContent="center"
      alignItems="center"
    >
      <LoginForm />
    </Flex>
    <Outlet />
    </>
  );
}
