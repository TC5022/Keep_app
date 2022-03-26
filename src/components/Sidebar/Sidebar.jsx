import React from 'react';
import { Flex } from "@chakra-ui/react";
import { MdOutlineHighlight, MdOutlineArchive } from "react-icons/md";
import { useLocation } from 'react-router-dom';

import { NavLinks } from './Navlinks';

function Sidebar(props) {

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

        <NavLinks
          link="/archives"
          icon={<MdOutlineArchive style={styles} />}
          text="Archives"
          isActive={location.pathname === "/archives"}
        />
      </Flex>
    );
}

export default Sidebar;