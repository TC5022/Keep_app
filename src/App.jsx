import React from "react";
import { Routes, Route } from "react-router";

import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Archives from "./pages/Archives";

import Search from "./pages/Search";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/archives" element={<Archives />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default connect()(App);
