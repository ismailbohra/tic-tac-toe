import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MakeRoom from "./pages/MakeRoom";
import RoomGame from "./pages/RoomGame";
import MainPage from "./pages/MainPage";
import UserForm from "./pages/UserForm";
import QuickMatch from "./pages/QuickMatch";
import AiMatch from "./pages/AiMatch";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/userform/:redirectto" element={<UserForm />} />
        <Route path="/aimatch" element={<AiMatch />} />
        <Route path="/quickmatch" element={<QuickMatch />} />
        <Route path="/makeRoom" element={<MakeRoom />} />
        <Route path="/game" element={<RoomGame />} />
      </Routes>
    </Router>
  );
};

export default App;
