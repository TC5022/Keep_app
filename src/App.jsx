import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import jwtDecode from "jwt-decode";

import { connect, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LabelPage from "./pages/LabelPage"
import Search from "./pages/Search";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { fetchNotes } from "./actions/notes";
import { fetchLabels } from "./actions/labels";
import { getAuthToken } from "./helpers/utils";
import { authenticateUser } from "./actions/auth";

function App() {

  const dispatch = useDispatch();
  const token = getAuthToken();

  useEffect(() => {
    if (token) {
      const user = jwtDecode(token);
      console.log(user);
      dispatch(
        authenticateUser({
          email: user.email,
          userId: user.userId,
          name: user.name,
        })
      );
      dispatch(fetchNotes());
      dispatch(fetchLabels());
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/labels/:labelName" element={<LabelPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default connect()(App);
