import React from "react";
import { MdHighlight } from "react-icons/md";
import { Heading } from "@chakra-ui/react";

function Header() {
  return (
    <header>
      <Heading color="#fff">
        <MdHighlight style={{display: "inline"}} /> Keeper
      </Heading>
    </header>
  );
}

export default Header;
