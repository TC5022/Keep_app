import React, { useEffect, useState } from "react";
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
  Input,
  useDisclosure,
  Image,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Canvas } from "./Canvas/Canvas";

//icons
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineCopy,
} from "react-icons/ai";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineDraw } from "react-icons/md";

//actions
import {
  addImage,
  changeColor,
  copyNote,
  deleteNote,
  editNote,
} from "../actions/notes";
import { NoteButton } from "./NoteButton";
import { LabelPopover } from "./LabelPopover";
import { removeLabelFromNote } from "../actions/labels";

function Note(props) {
  const [state, setState] = useState({
    id: props.id,
    title: props.title,
    content: props.content,
    color: props.color,
    imagesrc: props.imagesrc,
    labels: props.labels,
    editMode: false,
    currImage: "",
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (state.id !== props.id) {
      setState({
        ...state,
        id: props.id,
        title: props.title,
        content: props.content,
        color: props.color,
        imagesrc: props.imagesrc,
        labels: props.labels,
      });
    }
  }, [state, props]);

  const dispatch = useDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    const color = state.color;
    const imagesrc = state.imagesrc;

    if (state.id === props.id) {
      if (color !== props.color) {
        dispatch(changeColor(color, props.id));
      }

      if (imagesrc?.length !== props.imagesrc?.length) {
        dispatch(addImage(state.currImage, props.id));
      }
    }
  }, [
    state.color,
    state.imagesrc,
    state.currImage,
    dispatch,
    props.color,
    props.imagesrc,
    // props.labels,
    props.id,
    state.id,
  ]);

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
    fieldname === "imagesrc"
      ? setState({
          ...state,
          imagesrc: [...state.imagesrc, val],
          currImage: val,
        })
      : setState({
          ...state,
          [fieldname]: val,
        });
  }

  function handleSave() {
    const { title, content, id } = state;
    dispatch(editNote(title, content, id));
    state.editMode === true && handleChange("editMode", false);
  }

  return (
    <Box
      borderRadius="10px"
      p=".5rem 0"
      my="0"
      mx="0.7rem"
      border="1px solid"
      _hover={{
        boxShadow:
          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      }}
      w="18vw"
      bg="#fff"
      float="left"
      style={{
        backgroundColor: state.color,
        borderColor: state.color || "#e0e0e0",
        transition: "all 300ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {state.imagesrc?.length !== 0 && (
        <SimpleGrid minChildWidth="80px" spacing={2} mb={3}>
          {state.imagesrc?.map((image, index) => (
            <Image key={index} src={image} />
          ))}
        </SimpleGrid>
      )}
      {state.editMode ? (
        <Input
          type="text"
          onChange={(e) => handleChange("title", e.target.value)}
          value={state.title}
        ></Input>
      ) : (
        <Heading
          as="h6"
          color="rgba(0, 0, 0, 0.87)"
          size="md"
          fontFamily="Metropolis,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'"
          p="12px 16px 0px 16px"
          fontSize="1.25rem"
          flex-wrap="wrap"
          letterSpacing="0.015rem"
          lineHeight="1.44"
        >
          {state.title}
        </Heading>
      )}

      {state.editMode ? (
        <Input
          type="text"
          onChange={(e) => handleChange("content", e.target.value)}
          value={state.content}
        ></Input>
      ) : (
        <Text
          fontSize="1rem"
          color="rgba(0, 0, 0, 0.87)"
          p="4px 16px 12px 16px"
          letterSpacing="0.015rem"
          lineHeight="1.44"
          fontFamily="Roboto,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'"
        >
          {state.content}
        </Text>
      )}

      <Flex flexWrap="wrap" p="0 10px">
        {props.labels?.length !== 0 &&
          props.labels?.map((label, index) => (
            <Box p="2.88px 4px" key={index}>
              <Tag
                borderRadius="full"
                size="md"
                variant="solid"
                background="rgba(0,0,0,0.08)"
                color="#00000"
              >
                <TagLabel>{label.name}</TagLabel>
                <TagCloseButton
                  _focus={{ outline: "none" }}
                  onClick={() =>
                    dispatch(removeLabelFromNote(props.id, label._id))
                  }
                />
              </Tag>
            </Box>
          ))}
      </Flex>

      <Flex
        flexDir="row"
        p="8px 3px"
        justifyContent="space-between"
        transition="opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"
        opacity={visible ? 1 : 0}
      >
        {state.editMode ? (
          <NoteButton
            onChange={() => handleSave()}
            icon={<AiOutlineSave fontSize={"18px"} />}
          />
        ) : (
          <NoteButton
            onChange={() => handleChange("editMode", true)}
            icon={<AiOutlineEdit fontSize={"18px"} />}
          />
        )}

        <IconButton
          _hover={{ bg: "rgba(95,99,104,0.157)" }}
          _focus={{ bg: "none", outline: "none" }}
          bg="none"
          borderRadius="full"
          icon={<MdOutlineDraw fontSize={"18px"} />}
          onClick={onOpen}
        />
        <Canvas isOpen={isOpen} onClose={onClose} handleChange={handleChange} />

        <LabelPopover id={props.id} note={props.note} />

        {/* handles background change for the note */}
        <Popover>
          <PopoverTrigger>
            <IconButton
              _hover={{ bg: "rgba(95,99,104,0.157)" }}
              _focus={{ bg: "none", outline: "none" }}
              bg="none"
              borderRadius="full"
              icon={<IoColorPaletteOutline fontSize={"18px"} />}
            />
          </PopoverTrigger>
          <PopoverContent
            _focus={{ outline: "none" }}
            borderRadius="none"
            width="auto"
            boxShadow="0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)"
          >
            <PopoverBody m={1} p={0}>
              <SimpleGrid
                templateRows="repeat(3, 34px)"
                templateColumns="repeat(4, 30px)"
                spacing="5px"
              >
                {colors.map((color, index) => (
                  <Button
                    key={index}
                    _hover={{ border: "black solid 3px" }}
                    _focus={{ outline: "none" }}
                    style={{ backgroundColor: color }}
                    boxShadow="0 1px 4px rgb(0 0 0 / 20%)"
                    size="xs"
                    h={7}
                    my={1}
                    borderRadius={"full"}
                    onClick={() => handleChange("color", color)}
                  ></Button>
                ))}
              </SimpleGrid>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <NoteButton
          onChange={() => dispatch(copyNote(props.id))}
          icon={<AiOutlineCopy fontSize={"18px"} />}
        />

        <NoteButton
          onChange={() => dispatch(deleteNote(props.id))}
          icon={<AiOutlineDelete fontSize={"18px"} />}
        />
      </Flex>
    </Box>
  );
}

export default Note;
