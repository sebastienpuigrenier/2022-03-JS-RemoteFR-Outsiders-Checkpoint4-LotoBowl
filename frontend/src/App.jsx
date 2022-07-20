import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "@pages/Home";

import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

import Connexion from "@components/Connexion";

import "@styles/App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const { ??? } = useContext(ExportContext.Context);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
