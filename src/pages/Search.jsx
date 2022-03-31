import React from "react";
import Note from "../components/Note";

import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Search(props) {

  const results = useSelector((state) => state.search);

  return (
    <Box pl={10}>
      {results &&
        results.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              note={noteItem}
              index={noteItem.id}
              title={noteItem.title}
              content={noteItem.content}
              color={noteItem.color}
              imagesrc={noteItem.imagesrc}
            />
          );
        })}
    </Box>
  );
}

export default Search;
