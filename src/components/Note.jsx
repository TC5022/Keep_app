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
} from "../actions";
import { NoteButton } from "./NoteButton";
import { LabelPopover } from "./LabelPopover";

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

  // const [visible, setVisible] = useState(false);

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

  function deleteLabel(deleteLabel) {
    const filteredLabels = state.labels.filter(
      (label) => label !== deleteLabel
    );

    setState({
      ...state,
      labels: filteredLabels,
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
      p={5}
      m="16px"
      border="1px solid"
      _hover={{ boxShadow: "0 2px 5px #ccc" }}
      w="20vw"
      bg="#fff"
      float="left"
      style={{
        backgroundColor: state.color,
        borderColor: state.color || "#e0e0e0",
      }}
      // onMouseEnter={() => setVisible(true)}
      // onMouseLeave={() => setVisible(false)}
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
        <Heading size="md" fontFamily="body" my={1}>
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
        <Text fontSize="2xl" mb={1}>
          {state.content}
        </Text>
      )}

      {props.labels?.length !== 0 &&
        props.labels?.map((label, index) => (
          <Tag
            borderRadius="full"
            size="md"
            variant="solid"
            key={index}
            background="rgba(0,0,0,0.08)"
            color="#00000"
          >
            <TagLabel>{label.name}</TagLabel>
            <TagCloseButton
              _focus={{ outline: "none" }}
              onClick={() => deleteLabel(label)}
            />
          </Tag>
        ))}

      <Flex
        flexDir="row"
        ml="-15px"
        // visibility={!visible && "hidden"}
        // style={{transition:"backgroundColor 0.218s ease-in-out,boxShadow 0.218s ease-in-out"}}
      >
        {state.editMode ? (
          <NoteButton
            onChange={() => handleSave()}
            icon={<AiOutlineSave fontSize={"20px"} />}
          />
        ) : (
          <NoteButton
            onChange={() => handleChange("editMode", true)}
            icon={<AiOutlineEdit fontSize={"20px"} />}
          />
        )}

        <IconButton
          _hover={{ bg: "rgba(95,99,104,0.157)" }}
          _focus={{ bg: "none", outline: "none" }}
          bg="none"
          borderRadius="full"
          icon={<MdOutlineDraw fontSize={"20px"} />}
          onClick={onOpen}
        />
        <Canvas isOpen={isOpen} onClose={onClose} handleChange={handleChange} />

        <LabelPopover id={props.id} />

        {/* handles background change for the note */}
        <Popover>
          <PopoverTrigger>
            <IconButton
              _hover={{ bg: "rgba(95,99,104,0.157)" }}
              _focus={{ bg: "none", outline: "none" }}
              bg="none"
              borderRadius="full"
              icon={<IoColorPaletteOutline fontSize={"20px"} />}
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
          icon={<AiOutlineCopy fontSize={"20px"} />}
        />

        <NoteButton
          onChange={() => dispatch(deleteNote(props.id))}
          icon={<AiOutlineDelete fontSize={"20px"} />}
        />
      </Flex>
    </Box>
  );
}

export default Note;
