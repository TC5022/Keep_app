import React from "react";
import { MdHighlight, MdOutlineSearch } from "react-icons/md";
import { Heading, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { search } from "../actions";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();

  function handleSearch(e){
    const searchText = e.target.value;
    if(searchText.length>0){
      dispatch(search(searchText));
    }
  }
  
  return (
    <Flex
      mx="-16px"
      py="16px"
      px="32px"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.3)"
      bgColor="#f5ba13"
    >
      <Heading color="#fff">
        <MdHighlight style={{ display: "inline" }} /> Keeper
      </Heading>
      <Link to="/search" style={{ width: "50vw" }}>
        <InputGroup
          ml={32}
          size="lg"
          variant="filled"
          _focus={{ variant: "filled" }}
        >
          <InputLeftElement children={<MdOutlineSearch />} />
          <Input
            placeholder="Search"
            background="#fffff"
            _focus={{ background: "#fffff" }}
            onChange={(e) => handleSearch(e)}
          />
        </InputGroup>
      </Link>
    </Flex>
  );
}

export default Header;
