import React, { useState } from "react";
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

import { AiOutlinePlus } from "react-icons/ai";
import { MdNewLabel, MdOutlineSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createLabel } from "../../actions/label";

export function LabelPopover(props) {
  const [labelInput, setLabelInput] = useState("");
  const dispatch = useDispatch();

  const handlecreate = () => {
    dispatch(createLabel(props.id, labelInput));
    setLabelInput("");
  }
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          _hover={{ bg: "rgba(95,99,104,0.157)" }}
          _focus={{ bg: "none", outline: "none" }}
          bg="none"
          borderRadius="full"
          icon={<MdNewLabel fontSize={"20px"} />}
        />
      </PopoverTrigger>
      <PopoverContent
        _focus={{ outline: "none" }}
        borderRadius="2px"
        boxShadow="0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)"
        w="300px"
      >
        <PopoverHeader fontWeight="bold" border="0" pt={4}>
          Label note
        </PopoverHeader>
        <PopoverBody>
          <InputGroup>
            <Input
              placeholder="Enter label name"
              border="none"
              px={0}
              _focus={{ border: "none", boxShadow: "none" }}
              onChange={(e) => setLabelInput(e.target.value)}
              value={labelInput}
            />
            <InputRightElement
              pointerEvents="none"
              children={
                <MdOutlineSearch color="#9e9e9e" fontSize={"1.25rem"} />
              }
            />
          </InputGroup>
        </PopoverBody>
        <PopoverFooter d="flex" _hover={{ bg: "#E2E8F0" }} color="#00000">
          <Flex
            role="button"
            width="100%"
            onClick={() => handlecreate()}
          >
            <AiOutlinePlus
              fontSize={"1.25rem"}
              style={{ marginRight: "12px" }}
            />
            Create
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
