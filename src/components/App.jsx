import React from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";

import {Box} from "@chakra-ui/react"
import { useSelector, connect } from "react-redux";

function App() {

  const notes = useSelector((state) => state.notes);
  console.log(notes);

  return (
    <Box maxW="100vw">
      <Header />
      <CreateArea />
      {notes &&
        notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
            />
          );
        })}

      {/* <Footer /> */}
    </Box>
  );
}

export default connect()(App);
