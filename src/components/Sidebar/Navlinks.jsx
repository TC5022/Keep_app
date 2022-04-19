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
          h="48px"
          size="sm"
          justifyContent={"start"}
          variant="ghost"
          _hover={isActive ? { bgColor: "none" } : { bgColor: "#feefc3" }}
          _focus={{ outline: "none" }}
          bgColor={isActive ? "rgba(245, 186, 19, 0.2)" : "transparent"}
          py={3}
          color="#202124"
          fontSize="1rem"
          fontFamily="'Google Sans',Roboto,Arial,sans-serif"
          fontWeight="500"
          borderRadius="full"
          leftIcon={icon}
        >
          {text}
        </Button>
      </Link>
    </>
  );
};
