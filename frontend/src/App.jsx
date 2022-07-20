import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "@pages/Home";

import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

import Connexion from "@pages/Connexion";
import AdminCreation from "@pages/AdminCreation";
import AdminClose from "@pages/AdminClose";
import MatchList from "@pages/MatchList";

import ExportContext from "./contexts/Context";

import "@styles/App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { infoUser } = useContext(ExportContext.Context);
  return (
    <div className="App">
      <NavBar />
      <p>{infoUser.pseudo}</p>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/liste_des_matchs" element={<MatchList />} />
        <Route path="/backoffice/creation" element={<AdminCreation />} />
        <Route path="/backoffice/finalisation" element={<AdminClose />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
