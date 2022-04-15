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
  PopoverHeader,
  PopoverFooter,
  InputRightElement,
  InputGroup,
  Tag,
  TagLabel,
  TagCloseButton
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Canvas } from "./Canvas/Canvas";

//icons
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineCopy,
  AiOutlinePlus,
} from "react-icons/ai";
import { IoColorPaletteOutline } from "react-icons/io5";
import {
  MdOutlineArchive,
  MdOutlineUnarchive,
  MdOutlineDraw,
  MdNewLabel,
  MdOutlineSearch,
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
    id: props.id,
    title: props.title,
    content: props.content,
    color: props.color,
    imagesrc: props.imagesrc,
    labels: props.labels,
    editMode: false,
  });

  // const [visible, setVisible] = useState(false);
  const [labelInput, setLabelInput] = useState("");

  // useEffect(() => {
  //   if (state.id !== props.index) {
  //     setState({
  //       ...state,
  //       id: props.index,
  //       title: props.title,
  //       content: props.content,
  //       color: props.color,
  //       imagesrc: props.imagesrc,
  //       labels: props.labels
  //     });
  //   }
  // }, [state, props.title, props.content, props]);

  const dispatch = useDispatch();
  const archives = useSelector((state) => state.archives);
  const { onOpen, isOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   const { title, content, color, id, imagesrc, labels } = state;
  //   if (color !== props.color || imagesrc !== props.imagesrc || labels !== props.labels) {
  //     const newNote = {
  //       id: id,
  //       title: title,
  //       content: content,
  //       color: color,
  //       imagesrc: imagesrc,
  //       labels: labels
  //     };
  //     console.log("called");

  //     dispatch(editNote(newNote, state.id));
  //   }
  // }, [state, dispatch, props.color, props.imagesrc, props.labels]);

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

  function saveLabel(){
    setState({
      ...state,
      labels: [...state.labels, labelInput]
    });

    setLabelInput("");
  }

  function deleteLabel(deleteLabel){
    const filteredLabels = state.labels.filter(
      (label) => label !== deleteLabel
    );

    setState({
      ...state,
      labels: filteredLabels
    })
  }

  function handleSave() {
    const { title, content, color, id, imagesrc, labels } = state;
    const newNote = {
      id: id,
      title: title,
      content: content,
      color: color,
      imagesrc: imagesrc,
      labels: labels
    };
    dispatch(editNote(newNote, state.id));
    state.editMode === true && handleChange("editMode", false);
  }

  return (
    <Box
      borderRadius="10px"
      p={5}
      m="16px"
      border="1px solid"
      _hover={{boxShadow: "0 2px 5px #ccc"}}
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
      {props.imagesrc?.length !== 0 && (
        <SimpleGrid minChildWidth="80px" spacing={2} mb={3}>
          {props.imagesrc?.map((image, index) => (
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
            <TagLabel>{label}</TagLabel>
            <TagCloseButton _focus={{outline: "none"}} onClick={() => deleteLabel(label)} />
          </Tag>
        ))}
      {/* <Badge
            key={index}
            borderRadius="12px"
            textTransform="none"
            py={1}
            px={2}
            minW={14}
            textAlign="center"
            
            fontSize="sm"
            my={3}
          >
            {label}
          </Badge> */}

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
              <Flex role="button" width="100%" onClick={() => saveLabel()}>
                <AiOutlinePlus
                  fontSize={"1.25rem"}
                  style={{ marginRight: "12px" }}
                />
                Create
              </Flex>
            </PopoverFooter>
          </PopoverContent>
        </Popover>

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
            onChange={() => dispatch(copyNote(props.id))}
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
  );
}

export default Note;
