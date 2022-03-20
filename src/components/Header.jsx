import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { Heading } from "@chakra-ui/react";

function Header() {
  return (
    <header>
      <Heading color="#fff">
        <HighlightIcon /> Keeper
      </Heading>
    </header>
  );
}

export default Header;
