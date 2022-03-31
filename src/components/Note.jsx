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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Canvas } from "./Canvas/Canvas";

//icons
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineCopy,
} from "react-icons/ai";
import { BiImage } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import {
  MdOutlineArchive,
  MdOutlineUnarchive,
  MdOutlineDraw,
} from "react-icons/md";

//actions
import {
  archiveNote,
  copyArchive,
  copyNote,
  deleteArchive,
  deleteNote,
  editNote,
  unarchiveNote,
} from "../actions";
import { NoteButton } from "./NoteButton";

function Note(props) {
  const [state, setState] = useState({
    id: props.index,
    title: props.title,
    content: props.content,
    color: props.color,
    imagesrc: props.imagesrc,
    editMode: false,
  });

  useEffect(() => {
    if (state.id !== props.index) {
      setState({
        ...state,
        id: props.index,
        title: props.title,
        content: props.content,
        color: props.color,
        imagesrc: props.imagesrc,
      });
    }
  }, [state, props.title, props.content, props]);

  const dispatch = useDispatch();
  const archives = useSelector((state) => state.archives);
  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    const { title, content, color, id, imagesrc } = state;
    if (color !== props.color || imagesrc !== props.imagesrc) {
      const newNote = {
        id: id,
        title: title,
        content: content,
        color: color,
        imagesrc: imagesrc,
      };

      dispatch(editNote(newNote, state.id));
    }
  }, [state, dispatch, props.color, props.imagesrc]);

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

  function isArchive(note) {
    const index = archives.indexOf(note);
    if (index !== -1) {
      return true;
    }
    return false;
  }

  function handleChange(fieldname, val) {
    fieldname === "imagesrc"
      ? setState({
          ...state,
          imagesrc: [...state.imagesrc, val],
        })
      : setState({
          ...state,
          [fieldname]: val,
        });
  }

  function handleSave() {
    const { title, content, color, id, imagesrc } = state;
    const newNote = {
      id: id,
      title: title,
      content: content,
      color: color,
      imagesrc: imagesrc
    };
    dispatch(editNote(newNote, state.id));
    state.editMode === true && handleChange("editMode", false);
  }

  return (
    <Popover>
      <Box
        borderRadius="7px"
        p={5}
        m="16px"
        border="1px solid"
        // boxShadow="0 2px 5px #ccc"
        w="20vw"
        bg="#fff"
        float="left"
        style={{
          backgroundColor: state.color,
          borderColor: state.color || "#e0e0e0",
        }}
      >
        {state.imagesrc.length !== 0 && (
          <SimpleGrid minChildWidth="80px" spacing={2} mb={3}>
            {state.imagesrc.map((image, index) => (
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

        <Flex flexDir="row" ml="-15px">
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
          <NoteButton
            onChange={() => dispatch(deleteNote(props.id))}
            icon={<BiImage fontSize={"20px"} />}
          />

          <IconButton
            _hover={{ bg: "rgba(95,99,104,0.157)" }}
            _focus={{ bg: "none", outline: "none" }}
            bg="none"
            borderRadius="full"
            icon={<MdOutlineDraw fontSize={"20px"} />}
            onClick={onOpen}
          />
          <Canvas
            isOpen={isOpen}
            onClose={onClose}
            handleChange={handleChange}
          />

          {/* handles background change for the note */}
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
            borderRadius="xl"
            boxShadow="0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)"
          >
            <PopoverBody pl={2} py={1} pr={0}>
              <SimpleGrid columns={4} spacing={0}>
                {colors.map((color, index) => (
                  <Button
                    key={index}
                    _hover={{ border: "black solid 3px" }}
                    _focus={{ outline: "none" }}
                    style={{ backgroundColor: color }}
                    boxShadow="0 1px 4px rgb(0 0 0 / 20%)"
                    w="30px"
                    h="35px"
                    my={1}
                    borderRadius={"full"}
                    onClick={() => handleChange("color", color)}
                  ></Button>
                ))}
              </SimpleGrid>
            </PopoverBody>
          </PopoverContent>

          {isArchive(props.note) ? (
            <NoteButton
              onChange={() => dispatch(unarchiveNote(props.note, props.id))}
              icon={<MdOutlineUnarchive fontSize={"20px"} />}
            />
          ) : (
            <NoteButton
              onChange={() => dispatch(archiveNote(props.note, props.id))}
              icon={<MdOutlineArchive fontSize={"20px"} />}
            />
          )}

          {isArchive(props.note) ? (
            <NoteButton
              onChange={() => dispatch(copyArchive(props.note))}
              icon={<AiOutlineCopy fontSize={"20px"} />}
            />
          ) : (
            <NoteButton
              onChange={() => dispatch(copyNote(props.note))}
              icon={<AiOutlineCopy fontSize={"20px"} />}
            />
          )}

          {isArchive(props.note) ? (
            <NoteButton
              onChange={() => dispatch(deleteArchive(props.id))}
              icon={<AiOutlineDelete fontSize={"20px"} />}
            />
          ) : (
            <NoteButton
              onChange={() => dispatch(deleteNote(props.id))}
              icon={<AiOutlineDelete fontSize={"20px"} />}
            />
          )}
        </Flex>
      </Box>
    </Popover>
  );
}

export default Note;
