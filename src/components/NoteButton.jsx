import React from "react";
import { IconButton } from "@chakra-ui/react";

export const NoteButton = ({ onChange, icon }) => {
  return (
    <>
      <IconButton
        _hover={{ bg: "rgba(95,99,104,0.157)" }}
        _focus={{ bg: "none", outline: "none" }}
        onClick={() => onChange()}
        bg="none"
        borderRadius="full"
        icon={icon}
      />
    </>
  );
};
