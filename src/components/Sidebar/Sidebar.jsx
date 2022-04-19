import React from "react";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import { MdOutlineHighlight, MdLabelOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";

import { NavLinks } from "./Navlinks";
import { useSelector } from "react-redux";

import { AiOutlineEdit } from "react-icons/ai";
import { EditLabels } from "./EditLabels";

function Sidebar() {
  const labels = useSelector((state) => state.labels);
   const { onOpen, isOpen, onClose } = useDisclosure();

  const location = useLocation();
  const styles = {
    display: "inline",
    fontSize: "24px",
    marginBottom: "10px",
    marginLeft: "15px",
    marginRight: "10px"
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

      <Button
        w="full"
        h="48px"
        size="sm"
        justifyContent={"start"}
        variant="ghost"
        _focus={{ outline: "none" }}
        py={3}
        color="#202124"
        fontSize="1rem"
        fontFamily="'Google Sans',Roboto,Arial,sans-serif"
        fontWeight="500"
        borderRadius="full"
        _hover={{ bgColor: "#EDF2F7" }}
        bgColor={"transparent"}
        leftIcon={<AiOutlineEdit style={styles} />}
        onClick={onOpen}
      >
        Edit Labels
      </Button>

      <EditLabels isOpen={isOpen} onClose={onClose} labels={labels} />

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
