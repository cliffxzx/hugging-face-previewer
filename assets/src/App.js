// import logo from './logo.svg';
import "./App.css";
import Navi from "./Navi";
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Content from "./Content";
import Reference from "./Reference";

function App() {
  return (
    <>
      <Navi />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content" element={<Content />} />
          <Route path="/reference" element={<Reference />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
