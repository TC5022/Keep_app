import React, { useState } from "react";
import {
  MdHighlight,
  MdOutlineSearch,
} from "react-icons/md";
import {
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  InputRightElement,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { search } from "../actions/notes";
import { Link } from "react-router-dom";
import { NoteButton } from "./NoteButton";
import {AiOutlineClose} from "react-icons/ai";
import { ProfilePopover } from "./ProfilePopover";

function Header() {
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(false);
  const [searchText, setSearchText] = useState("");

  function handleSearch(e){
    setSearchText(e);
    if(searchText.length>0){
      dispatch(search(searchText));
    }
  }
  
  return (
    <Flex
      mx="-16px"
      py="8px"
      px="32px"
      bgColor="rgba(255,255,255,1)"
      alignItems="center"
      borderBottom="1px solid rgba(0,0,0,0.2)"
      justifyContent="space-between"
    >
      <Flex>
        <Box bgColor="#f5ba13" p="5px">
          <MdHighlight
            style={{ display: "inline" }}
            fontSize={"25px"}
            color="#fff"
          />
        </Box>
        <Text color="#5f6368" fontSize="1.5rem" ml={4}>
          Keeper
        </Text>
      </Flex>
      <Link to="/search" style={{ width: "50vw" }}>
        <InputGroup
          size="lg"
          // ml={32}
          variant="filled"
          _focus={{
            variant: "filled",
          }}
          background="transparent"
          _hover={{ background: "transparent" }}
          borderRadius="8px"
        >
          <InputLeftElement
            pointerEvents="none"
            children={<MdOutlineSearch fontSize={"24px"} />}
          />
          <Input
            placeholder="Search"
            background="#f1f3f4"
            onChange={(e) => handleSearch(e.target.value)}
            onClick={() => setIcon(true)}
            py="11px"
            fontSize="18px"
            size="lg"
            _hover={{ background: "#f1f3f4" }}
            _focus={{
              borderColor: "transparent",
              background: "transparent",
              boxShadow:
                "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
            }}
            w="100%"
            value={searchText}
          />
          <InputRightElement visibility={!icon && "hidden"}>
            <NoteButton
              onChange={() => {
                setSearchText("");
                setIcon(false);
              }}
              icon={<AiOutlineClose fontSize={"24px"} />}
            />
          </InputRightElement>
        </InputGroup>
      </Link>

      <Box mr={5}>
        <ProfilePopover />
      </Box>
    </Flex>
  );
}

export default Header;
