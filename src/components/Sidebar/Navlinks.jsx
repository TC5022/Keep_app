/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NavLinks = ({ link, icon, text, isActive, linkState }) => {
  // console.log(linkState);
  return (
    <>
      <Link
        to={{
          pathname: link,
        }}
        state={linkState}
      >
        <Button
          w="full"
          size="lg"
          fontSize="xl"
          justifyContent={"start"}
          variant="ghost"
          _hover={isActive ? { bgColor: "none" } : { bgColor: "#EDF2F7" }}
          _focus={{ outline: "none" }}
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
