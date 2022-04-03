import React from 'react';
import Note from "../components/Note";
import CreateArea from '../components/CreateArea';

import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Home() {
    const notes = useSelector((state) => state.notes);

    return (
      <Box w="full">
        <CreateArea />
        <Box pl={10}>
          {notes &&
            notes.map((noteItem, index) => {
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
      </Box>
    );
}

export default Home;