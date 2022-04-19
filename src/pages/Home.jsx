import React, { useEffect } from "react";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function Home() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const notes = useSelector((state) => state.notes.notes);
  return (
    <>
      <Flex maxW="100vw" flexDir="column">
        <Header />
        <Flex>
          <Sidebar />
          <Box w="full">
            <CreateArea />
            <Box pl={10}>
              {notes &&
                notes?.map((noteItem, index) => {
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
          </Box>
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
}

export default Home;
