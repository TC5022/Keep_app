import React from "react";
import { Flex } from "@chakra-ui/react";
import { MdOutlineHighlight, MdLabelOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";

import { NavLinks } from "./Navlinks";
import { useSelector } from "react-redux";

function Sidebar() {
  const labels = useSelector((state) => state.labels);

  const location = useLocation();
  const styles = {
    display: "inline",
    fontSize: "30px",
    marginBottom: "10px",
    marginRight: "15px",
  };

  return (
    <Flex
      flexDir="column"
      // h="100vh"
      pos={{ lg: "sticky" }}
      left="0px"
      top="0px"
      maxW="300px"
      // w={{ base: "100%", md: "100%", lg: "900px" }}
      w="full"
      mt={4}
    >
      <NavLinks
        link="/"
        icon={<MdOutlineHighlight style={styles} />}
        text="Notes"
        isActive={location.pathname === "/"}
      />

      {labels &&
        labels.map((label, index) => {
          return (
            <NavLinks
              key={index}
              link={`/labels/${label.name}`}
              text={label.name}
              linkState={label._id}
              icon={<MdLabelOutline style={styles} />}
              isActive={location.pathname === `/labels/${label.name}`}
            />
          );
        })}
    </Flex>
  );
}

export default Sidebar;
