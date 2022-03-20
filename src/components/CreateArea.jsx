import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import { Textarea, Input, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createNote } from "../actions";

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "hi",
    content: "hello",
  });

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
      title: "hi",
      content: "hello",
    });
    event.preventDefault();
  }

  function expand() {
    setIsExpanded(true);
  }

  return (
    <Flex alignItems="center" flexDir="column" my={8}>
      <form className="create-note">
        {isExpanded ? (
          <Input
            _focus={{ outline: "none" }}
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <Textarea
          _focus={{ outline: "none" }}
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
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
