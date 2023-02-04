import React from "react";
import { Route, Routes } from "react-router-dom";
import Add from "./containers/Add/Add";
import Comment from "./containers/Comment/Comment";
import Main from "./containers/Main/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/add" element={<Add></Add>}></Route>
        <Route path="/comment/:id" element={<Comment></Comment>}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
