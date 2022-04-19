import React, { useState } from "react";
import {
  Button,
  IconButton,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

import { MdOutlineAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../actions/auth";

export const ProfilePopover = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutUser());
  }

  
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          _hover={{ bg: "rgba(95,99,104,0.157)" }}
          _focus={{ bg: "none", outline: "none" }}
          bg="none"
          borderRadius="full"
          icon={<MdOutlineAccountCircle fontSize={"28px"} />}
          size="lg"
        />
      </PopoverTrigger>
      <PopoverContent
        _focus={{ outline: "none" }}
        borderRadius="2px"
        boxShadow="0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)"
        w="300px"
      >
        <PopoverBody>
          <Flex direction="column" alignItems="center">
            <Text> {user.name}</Text>
            <Text>{user.email}</Text>
          </Flex>
        </PopoverBody>
        <PopoverFooter d="flex" color="#00000">
          <Flex direction="column" alignItems="center">
            <Button onClick={() => logOut()}>Log Out</Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
