import React from "react";
import Note from "../components/Note";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Archives(props) {
  const archives = useSelector((state) => state.archives);

  return (
    <Flex maxW="100vw" flexDir="column">
      <Header />
      <Flex>
        <Sidebar />
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
      </Flex>
    </Flex>
  );
}

export default Archives;
