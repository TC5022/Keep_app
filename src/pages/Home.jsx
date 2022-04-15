import React, { useEffect } from 'react';
import Note from "../components/Note";
import CreateArea from '../components/CreateArea';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchNotes } from '../actions';

function Home() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
      dispatch(fetchNotes());
    } else {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, dispatch]);
    const notes = useSelector((state) => state.notes);

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
          </Flex>
        </Flex>
        <Outlet />
      </>
    );
}

export default Home;