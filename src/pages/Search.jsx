import React, { useEffect } from "react";
import Note from "../components/Note";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Search(props) {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/search", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  const results = useSelector((state) => state.search);

  return (
    <Flex maxW="100vw" flexDir="column">
      <Header />
      <Flex>
        <Sidebar />
        <Box pl={10}>
          {results &&
            results.map((noteItem, index) => {
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
      </Flex>
    </Flex>
  );
}

export default Search;
