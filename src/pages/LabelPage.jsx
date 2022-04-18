import React, { useEffect } from "react";
import Note from "../components/Note";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
// import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function LabelPage() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, location.pathname]);
  
  const labelNotes = location.state;

  return (
    <Flex maxW="100vw" flexDir="column">
      <Header />
      <Flex>
        <Sidebar />
        <Box pl={10}>
          {labelNotes &&
            labelNotes.map((noteItem, index) => {
              return (
                <Note
                  key={index}
                  id={noteItem._id}
                  note={noteItem}
                  title={noteItem.title}
                  content={noteItem.content}
                  color={noteItem.color}
                  imagesrc={noteItem.imageSrc}
                  labels={noteItem.labels}
                />
              );
            })}
        </Box>
      </Flex>
    </Flex>
  );
}

export default LabelPage;
