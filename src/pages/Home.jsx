import React from 'react';
import Note from "../components/Note";
import CreateArea from '../components/CreateArea';

import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/Sidebar';

function Home() {
    const notes = useSelector((state) => state.notes);

    return (
      <Flex maxW="100vw" flexDir="column">
        <Header />
        <Flex>
          <Sidebar />
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
                    />
                  );
                })}
            </Box>
          </Box>
        </Flex>

        {/* <Footer /> */}
      </Flex>
    );
}

export default Home;