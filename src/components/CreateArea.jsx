import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import { Textarea, Input, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../actions/notes";

function CreateArea(props) {
  const notes = useSelector((state) => state.notes);
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    imagesrc: [],
    color: "#fffff",
    labels: [] 
  });

  useEffect(() => {
    let index = notes.length;
    setNote((prevNote) => {
      return {
        ...prevNote,
        id: index,
      };
    });
  }, [notes.length]);

  const dispatch = useDispatch();

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    dispatch(createNote(note));
    setNote({
      ...note,
      title: "",
      content: "",
      imagesrc: [],
      color: "",
      labels: []
    });
    event.preventDefault();
  }

  function expand() {
    setIsExpanded(true);
  }

  return (
    <Flex alignItems="center" flexDir="column" my={8} w="full">
      <form className="create-note">
        {isExpanded ? (
          <Input
            _focus={{ outline: "none" }}
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            _placeholder={{ color: "#202124", opacity: 0.8 }}
            w="100%"
          />
        ) : null}
        <Textarea
          _focus={{ outline: "none" }}
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          _placeholder={{ color: "#202124", opacity: 0.8 }}
          rows={isExpanded ? 3 : 1}
          w="100%"
        />

        <Flex>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Flex>
      </form>
    </Flex>
  );
}

export default CreateArea;
