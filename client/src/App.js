import React, { useState } from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
import { Container } from "@material-ui/core";
import { Navbar } from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Auth from "./components/Auth/Auth";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(null);
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar setCurrentId={setCurrentId} />
        <Routes>
          <Route path="/" exact element={<Navigate replace to="/posts" />} />
          <Route
            path="/posts"
            exact
            element={<Home currentId={currentId} setCurrentId={setCurrentId} />}
          />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
          <Route
            path="/auth"
            exact
            element={!user?.result ? <Auth /> : <Navigate replace to="/posts" />}
          />
          <Route
            path="/post/add"
            exact
            element={<Form currentId={currentId} setCurrentId={setCurrentId} />}
          />
          <Route
            path="/post/edit"
            exact
            element={<Form currentId={currentId} setCurrentId={setCurrentId} />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
