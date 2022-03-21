import React from 'react';
import Note from "../components/Note";
import CreateArea from '../components/CreateArea';

import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Home(props) {
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
                    title={noteItem.title}
                    content={noteItem.content}
                  />
                );
              })}
          </Box>
        </Box>
      
    );
}

export default Home;