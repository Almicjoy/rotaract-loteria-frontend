import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardPage from "./components/CardPage";
import QRCodePage from "./components/QRCodePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodePage />} />
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
