import React from "react";
import Note from "../components/Note";

import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Archives(props) {
  const archives = useSelector((state) => state.archives);

  return (
    <Box>
      <Box pl={10}>
        {archives &&
          archives.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={index}
                note={noteItem}
                title={noteItem.title}
                content={noteItem.content}
              />
            );
          })}
      </Box>
    </Box>
  );
}

export default Archives;
