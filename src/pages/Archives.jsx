import React from "react";
import Note from "../components/Note";

import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Archives(props) {
  const archives = useSelector((state) => state.archives);

  return (
    <Box pl={10}>
      {archives &&
        archives.map((noteItem, index) => {
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
              labels={noteItem.labels}
            />
          );
        })}
    </Box>
  );
}

export default Archives;
