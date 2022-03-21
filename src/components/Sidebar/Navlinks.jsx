/* eslint-disable react/prop-types */
import React from "react";
import { Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NavLinks = ({ link, icon, text, isActive }) => {
  return (
    <>
      <Link
        to={link}
        //   color={isActive ? "#4318FF" : "#000"}
      >
      <Button
      w="full"
        size="lg"
        fontSize="xl"
        justifyContent={"start"}
        variant="ghost"
        _hover={isActive ? { bgColor: "none" } : { bgColor: "#EDF2F7" }}
        bgColor={isActive ? "rgba(245, 186, 19, 0.2)" : "transparent"}
        py={8}
        borderRadius="full"
        leftIcon={icon}
      >
        {text}
      </Button>
      </Link>
    </>
  );
};
