import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MakeRoom from "./pages/MakeRoom";
import RoomGame from "./pages/RoomGame";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/makeRoom" element={<MakeRoom />} />
        <Route path="/game/:roomId" element={<RoomGame />} />
      </Routes>
    </Router>
  );
};

export default App;
