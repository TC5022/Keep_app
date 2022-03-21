import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router";

import {Flex, Box} from "@chakra-ui/react"
import { useSelector, connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import Archives from "./pages/Archives";

function App() {

  const notes = useSelector((state) => state.notes);
  const archives = useSelector((state) => state.archives);
  console.log("notes", notes);
  console.log(archives);

  return (
    <BrowserRouter>
      <Flex maxW="100vw" flexDir="column">
        <Header />
        <Flex>
          <Sidebar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                // <Suspense fallback={<div>Loading...</div>}>
                <Home />
                // </Suspense>
              }
            />
            <Route
              exact
              path="/archives"
              element={
                // <Suspense fallback={<div>Loading...</div>}>
                <Archives />
                // </Suspense>
              }
            />
          </Routes>
        </Flex>

        {/* <Footer /> */}
      </Flex>
    </BrowserRouter>
  );
}

export default connect()(App);
