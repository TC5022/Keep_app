import React, { useEffect } from "react";
import { Routes, Route } from "react-router";

import { connect, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Archives from "./pages/Archives";
import LabelPage from "./pages/LabelPage"
import Search from "./pages/Search";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { fetchNotes } from "./actions";
import { fetchLabels } from "./actions/label";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchNotes());
      dispatch(fetchLabels());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/archives" element={<Archives />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/labels/:labelName" element={<LabelPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default connect()(App);
