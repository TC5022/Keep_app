import React, { useState } from "react";

import {
  Box,
  Heading,
  Text,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  SimpleGrid,
  Button,
  Input
} from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { BiImage } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteNote, editNode } from "../actions";

function Note(props) {
  const [color, setColor] = useState("");

  const [state, setState] = useState({
    title: props.title,
    content: props.content,
    editMode: false,
  });

  const dispatch = useDispatch();

  const colors = [
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
    "#e6c9a8",
    "#e8eaed",
  ];

  function handleChange(fieldname, val) {
    setState({
      ...state,
      [fieldname]: val,
    });
  };

  function handleDelete() {
    dispatch(deleteNote(props.id));
  }

  function applyColor(event) {
    setColor(event.target.name);
  }

  function handleSave(){
    const {title, content} = state;
    const newNote = {
      title: title,
      content: content
    }
    dispatch(editNode(newNote, props.id));

    handleChange("editMode", false);
  }

  return (
    <Popover>
      <Box
        borderRadius="7px"
        p={5}
        m="16px"
        boxShadow="0 2px 5px #ccc"
        w="20vw"
        bg="#fff"
        float="left"
        style={{ backgroundColor: color }}
      >
        {state.editMode ? (
          <Input
            type="text"
            onChange={(e) => handleChange("title", e.target.value)}
            value={state.title}
          ></Input>
        ) : (
          <Heading size="md" fontFamily="body" my={1}>
            {props.title}
          </Heading>
        )}

        {state.editMode ? (
          <Input
            type="text"
            onChange={(e) => handleChange("content", e.target.value)}
            value={state.content}
          ></Input>
        ) : (
          <Text fontSize="2xl" mb={1}>
            {props.content}
          </Text>
        )}

        <Flex flexDir="row">
          {state.editMode ? (
            <IconButton
              _hover={{ bg: "rgba(95,99,104,0.157)" }}
              _focus={{ bg: "none", outline: "none" }}
              onClick={() => handleSave()}
              bg="none"
              borderRadius="full"
              icon={<AiOutlineSave fontSize={"20px"} />}
            />
          ) : (
            <IconButton
              _hover={{ bg: "rgba(95,99,104,0.157)" }}
              _focus={{ bg: "none", outline: "none" }}
              onClick={() => handleChange("editMode", true)}
              bg="none"
              borderRadius="full"
              icon={<AiOutlineEdit fontSize={"20px"} />}
            />
          )}
          <IconButton
            _hover={{ bg: "rgba(95,99,104,0.157)" }}
            _focus={{ bg: "none", outline: "none" }}
            onClick={handleDelete}
            bg="none"
            borderRadius="full"
            icon={<BiImage fontSize={"20px"} />}
          />
          <PopoverTrigger>
            <IconButton
              _hover={{ bg: "rgba(95,99,104,0.157)" }}
              _focus={{ bg: "none", outline: "none" }}
              bg="none"
              borderRadius="full"
              icon={<IoColorPaletteOutline fontSize={"20px"} />}
            />
          </PopoverTrigger>
          <IconButton
            _hover={{ bg: "rgba(95,99,104,0.157)" }}
            _focus={{ bg: "none", outline: "none" }}
            onClick={handleDelete}
            bg="none"
            borderRadius="full"
            icon={<AiOutlineDelete fontSize={"20px"} />}
          />
        </Flex>
        <PopoverContent
          _focus={{ outline: "none" }}
          borderRadius="xl"
          boxShadow="0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)"
        >
          <PopoverBody pl={2} py={1} pr={0}>
            <SimpleGrid columns={4} spacing={0}>
              {colors.map((colors, index) => (
                <Button
                  key={index}
                  _hover={{ border: "black solid 3px" }}
                  _focus={{ outline: "none" }}
                  style={{ backgroundColor: colors }}
                  boxShadow="0 1px 4px rgb(0 0 0 / 20%)"
                  w="30px"
                  h="35px"
                  my={1}
                  borderRadius={"full"}
                  name={colors}
                  onClick={applyColor}
                ></Button>
              ))}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Box>
    </Popover>
  );
}

export default Note;
