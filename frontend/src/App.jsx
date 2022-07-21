import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "@pages/Home";

import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

import Connexion from "@pages/Connexion";
import AdminCreation from "@pages/AdminCreation";
import AdminClose from "@pages/AdminClose";
import Recap from "@pages/Recap";
import MatchList from "@pages/MatchList";

import "@styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import ExportContext from "./contexts/Context";
import PrivateRoute from "./contexts/PrivateRoute";

function App() {
  const { infoUser, isVisible } = useContext(ExportContext.Context);
  const [style, setStyle] = useState("main-container");

  useEffect(() => {
    switch (true) {
      case isVisible && window.innerWidth < 950:
        setStyle("main-container-with-menu");
        break;
      default:
        setStyle("main-container");
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className={style}>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/liste_des_matchs" element={<MatchList />} />
          <Route path="/recapitulatif" element={<Recap />} />
          <Route
            path="/backoffice/creation"
            element={
              <PrivateRoute isAllowed={infoUser.isadmin === 1}>
                <AdminCreation />
              </PrivateRoute>
            }
          />
          <Route
            path="/backoffice/finalisation"
            element={
              <PrivateRoute isAllowed={infoUser.isadmin === 1}>
                <AdminClose />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
