import React from "react";
import { Routes, Route } from "react-router";

import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Archives from "./pages/Archives";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/archives" element={<Archives />} />
      </Routes>
    </BrowserRouter>
  );
}

export default connect()(App);
