import React from "react";
import { Routes, Route } from "react-router";

import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Archives from "./pages/Archives";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { Flex } from "@chakra-ui/react";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Flex maxW="100vw" flexDir="column">
        <Header />
        <Flex>
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/archives" element={<Archives />} />
            <Route exact path="/search" element={<Search />} />
          </Routes>
        </Flex>
      </Flex>
    </BrowserRouter>
  );
}

export default connect()(App);
