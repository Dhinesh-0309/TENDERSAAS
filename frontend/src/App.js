import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavbarComponent from "./components/NavbarComponent";
import PersonalDetails from "./pages/PersonalDetails";
import Dashboard from "./pages/Dashboard";
import Tenders from "./pages/Tenders";
import Forum from "./pages/Forum";
import TenderCard from "./pages/TenderCard";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/community" element={<Forum />} />
        <Route path="/tenders/:id" element={<TenderCard />} />
      </Routes>
    </Router>
  );
}

export default App;
